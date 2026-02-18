/**
 * Time Scale Validation
 *
 * Prevents ChartJS from crashing when a time unit is incompatible with the data range.
 * Example: timeUnit="day" with data spanning 1600-2020 (420 years) would generate
 * ~153,000 ticks, exceeding ChartJS's 100,000 limit and causing a hard crash.
 */

import { DateTime } from 'luxon';
import type { DataFrame } from 'types';
import type { TimeCartesianAxisConfiguration } from './types';

export type TimeUnit = NonNullable<TimeCartesianAxisConfiguration['timeUnit']>;

/**
 * ChartJS crashes if ticks count exceeds 100,000 (see chart.js scale.time.js).
 * We use 90,000 as safety margin to account for differences between our
 * approximate unit durations and Luxon's calendar-based computations.
 */
const CHARTJS_MAX_TICKS = 90_000;

/** Duration of each time unit in milliseconds. */
const TIME_UNIT_MS: Record<TimeUnit, number> = {
    millisecond: 1,
    second: 1_000,
    minute: 60 * 1_000,
    hour: 60 * 60 * 1_000,
    day: 24 * 60 * 60 * 1_000,
    week: 7 * 24 * 60 * 60 * 1_000,
    month: 30 * 24 * 60 * 60 * 1_000,
    quarter: 90 * 24 * 60 * 60 * 1_000,
    year: 365 * 24 * 60 * 60 * 1_000,
};

/** Time units ordered from most precise to least precise. */
const TIME_UNITS_BY_PRECISION: TimeUnit[] = [
    'millisecond',
    'second',
    'minute',
    'hour',
    'day',
    'week',
    'month',
    'quarter',
    'year',
];

// ============================================================================
// Parsing
// ============================================================================

/** Parses date strings using Luxon (ISO, SQL, HTTP, RFC2822). */
function tryParseLuxonFormats(value: string): number | null {
    const parsers = [
        () => DateTime.fromISO(value),
        () => DateTime.fromSQL(value),
        () => DateTime.fromHTTP(value),
        () => DateTime.fromRFC2822(value),
    ];

    let result: number | null = null;
    parsers.some((parse) => {
        const dt = parse();
        if (dt.isValid) {
            result = dt.toMillis();
            return true;
        }
        return false;
    });
    return result;
}

/** Parses "2024" or "2024-06" format (common in aggregated data). */
function tryParseYearMonth(value: string): number | null {
    const match = value.match(/^(\d{4})(?:-(\d{2}))?$/);
    if (!match) return null;

    const dt = DateTime.fromObject({
        year: parseInt(match[1], 10),
        month: match[2] ? parseInt(match[2], 10) : 1,
    });
    return dt.isValid ? dt.toMillis() : null;
}

/** Converts any date-like value to Unix timestamp in milliseconds. */
function parseToTimestamp(value: unknown): number | null {
    if (value == null) return null;

    if (typeof value === 'number') {
        // Heuristic: |value| < 1e10 means seconds, otherwise milliseconds.
        // 1e10 seconds ≈ year 2286, 1e10 ms ≈ April 1970.
        return Math.abs(value) < 1e10 ? value * 1000 : value;
    }

    if (value instanceof Date) {
        const ts = value.getTime();
        return Number.isNaN(ts) ? null : ts;
    }

    if (typeof value === 'string') {
        return tryParseLuxonFormats(value) ?? tryParseYearMonth(value);
    }

    return null;
}

// ============================================================================
// Core validation
// ============================================================================

/** Returns max safe range (in ms) for a time unit before ChartJS crashes. */
function getMaxSafeRange(unit: TimeUnit): number {
    return CHARTJS_MAX_TICKS * TIME_UNIT_MS[unit];
}

/** Checks if a range (in ms) is safe for a given time unit. */
function isRangeSafe(rangeMs: number, unit: TimeUnit): boolean {
    return rangeMs <= getMaxSafeRange(unit);
}

/** Finds the most precise unit that won't crash for the given range. */
function findSafeUnit(rangeMs: number): TimeUnit | undefined {
    return TIME_UNITS_BY_PRECISION.find((unit) => isRangeSafe(rangeMs, unit));
}

/** Extracts min/max timestamps from a DataFrame column. */
function getRange(dataFrame: DataFrame, column: string): { min: number; max: number } | null {
    const result = dataFrame.reduce<{ min: number; max: number }>(
        (acc, row) => {
            const ts = parseToTimestamp(row[column]);
            if (ts !== null) {
                return { min: Math.min(acc.min, ts), max: Math.max(acc.max, ts) };
            }
            return acc;
        },
        { min: Infinity, max: -Infinity }
    );

    return result.min === Infinity ? null : result;
}

// ============================================================================
// Public API
// ============================================================================

/**
 * Checks if a time unit is safe to use with the given min/max values.
 * Used by the Platform to filter available timescale options in the UI.
 *
 * @example
 * isTimeUnitCompatible("1600-01-01", "2024-01-01", "day")   // false (424 years!)
 * isTimeUnitCompatible("1600-01-01", "2024-01-01", "year")  // true
 * isTimeUnitCompatible("2024-01-01", "2024-12-31", "day")   // true
 */
export function isTimeUnitCompatible(min: unknown, max: unknown, unit: TimeUnit): boolean {
    const minTs = parseToTimestamp(min);
    const maxTs = parseToTimestamp(max);

    if (minTs === null || maxTs === null) return true; // Can't validate, allow

    return isRangeSafe(Math.abs(maxTs - minTs), unit);
}

/**
 * Returns a safe time unit for ChartJS, or undefined to let it auto-detect.
 * Used internally by scales.ts to prevent crashes.
 *
 * @param dataFrame - The chart data
 * @param requestedUnit - The user-configured time unit (may be undefined)
 * @param labelColumn - The column containing date values (default: 'x')
 */
export function getSafeTimeUnit(
    dataFrame: DataFrame,
    requestedUnit: TimeUnit | undefined,
    labelColumn = 'x'
): TimeUnit | undefined {
    // No unit requested -> let ChartJS auto-detect
    if (!requestedUnit) return undefined;

    const range = getRange(dataFrame, labelColumn);

    // Can't determine range from data — pass through the requested unit.
    // ChartJS may still parse the dates via its own adapter.
    if (!range) return requestedUnit;

    const rangeMs = range.max - range.min;

    // Requested unit is safe -> use it
    if (isRangeSafe(rangeMs, requestedUnit)) return requestedUnit;

    // Requested unit would crash -> find a safe alternative, default to 'year'
    return findSafeUnit(rangeMs) ?? 'year';
}
