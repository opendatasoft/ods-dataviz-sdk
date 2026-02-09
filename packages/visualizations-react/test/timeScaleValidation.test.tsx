// @jest-environment jsdom
import React from 'react';
import { render, screen } from '@testing-library/react';
import type { ChartOptions, DataFrame, TimeUnit } from '@opendatasoft/visualizations';
import { ChartSeriesType, isTimeUnitCompatible } from '@opendatasoft/visualizations';
import { Chart } from 'src';

// ============================================================================
// Test utilities
// ============================================================================

function generateYearlyData(startYear: number, endYear: number): DataFrame {
    const data: DataFrame = [];
    for (let year = startYear; year <= endYear; year += 1) {
        data.push({ x: `${year}-01-01`, y: Math.random() * 100 });
    }
    return data;
}

function generateDailyData(startDate: string, days: number): DataFrame {
    const data: DataFrame = [];
    const start = new Date(startDate);
    for (let i = 0; i < days; i += 1) {
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        data.push({ x: date.toISOString().split('T')[0], y: Math.random() * 100 });
    }
    return data;
}

function createTimeChartOptions(timeUnit: TimeUnit): ChartOptions {
    return {
        labelColumn: 'x',
        series: [{ type: ChartSeriesType.Line, valueColumn: 'y', borderColor: '#000' }],
        axis: {
            x: { display: true, type: 'time', timeUnit },
            y: { display: true },
        },
        title: { text: `Chart with ${timeUnit} unit` },
        description: `Test chart with ${timeUnit} time unit`,
    };
}

// ============================================================================
// isTimeUnitCompatible tests
// ============================================================================

describe('isTimeUnitCompatible', () => {
    describe('with valid/short ranges', () => {
        it('returns true for 1 year range with "day" unit', () => {
            expect(isTimeUnitCompatible('2024-01-01', '2024-12-31', 'day')).toBe(true);
        });

        it('returns true for 10 years range with "month" unit', () => {
            expect(isTimeUnitCompatible('2014-01-01', '2024-01-01', 'month')).toBe(true);
        });

        it('returns true for 500 years range with "year" unit', () => {
            expect(isTimeUnitCompatible('1500-01-01', '2024-01-01', 'year')).toBe(true);
        });

        it('returns true for 1 hour range with "minute" unit', () => {
            expect(
                isTimeUnitCompatible('2024-01-01T10:00:00', '2024-01-01T11:00:00', 'minute')
            ).toBe(true);
        });

        it('returns true for 1 day range with "hour" unit', () => {
            expect(isTimeUnitCompatible('2024-01-01T00:00:00', '2024-01-02T00:00:00', 'hour')).toBe(
                true
            );
        });
    });

    describe('with invalid/long ranges (would cause ChartJS crash)', () => {
        it('returns false for 424 years range with "day" unit', () => {
            // This is the classic bug case: 1600-2024 with day unit = ~154,790 ticks
            expect(isTimeUnitCompatible('1600-01-01', '2024-01-01', 'day')).toBe(false);
        });

        it('returns true for 200 years range with "day" unit', () => {
            // 200 years × 365 days = 73,000 days < 100k threshold
            expect(isTimeUnitCompatible('1824-01-01', '2024-01-01', 'day')).toBe(true);
        });

        it('returns true for 100 years range with "week" unit', () => {
            // 100 years = ~5,200 weeks, well under 100k
            expect(isTimeUnitCompatible('1924-01-01', '2024-01-01', 'week')).toBe(true);
        });

        it('returns true for 1000 years range with "month" unit', () => {
            // 1000 years = 12,000 months, under 100k
            expect(isTimeUnitCompatible('1024-01-01', '2024-01-01', 'month')).toBe(true);
        });

        it('returns false for 8500+ years range with "month" unit', () => {
            // ~8500 years = ~102,000 months, over 100k threshold
            // Using a valid date range that Luxon can parse
            expect(isTimeUnitCompatible('0500-01-01', '9024-01-01', 'month')).toBe(false);
        });

        it('returns false for 300 years range with "day" unit', () => {
            // 300 years × 365 days = ~109,500 days > 100k
            expect(isTimeUnitCompatible('1724-01-01', '2024-01-01', 'day')).toBe(false);
        });
    });

    describe('with different date formats', () => {
        it('handles ISO date strings', () => {
            expect(
                isTimeUnitCompatible('2024-01-01T00:00:00Z', '2024-12-31T23:59:59Z', 'day')
            ).toBe(true);
        });

        it('handles year-only strings', () => {
            expect(isTimeUnitCompatible('2000', '2024', 'year')).toBe(true);
        });

        it('handles year-month strings', () => {
            expect(isTimeUnitCompatible('2020-01', '2024-12', 'month')).toBe(true);
        });

        it('handles SQL format dates', () => {
            expect(
                isTimeUnitCompatible('2024-01-01 10:30:00', '2024-01-01 11:30:00', 'minute')
            ).toBe(true);
        });
    });

    describe('with timestamps (numbers)', () => {
        it('handles millisecond timestamps', () => {
            const start = new Date('2024-01-01').getTime(); // ~1704067200000
            const end = new Date('2024-12-31').getTime();
            expect(isTimeUnitCompatible(start, end, 'day')).toBe(true);
        });

        it('handles second timestamps', () => {
            const start = Math.floor(new Date('2024-01-01').getTime() / 1000); // ~1704067200
            const end = Math.floor(new Date('2024-12-31').getTime() / 1000);
            expect(isTimeUnitCompatible(start, end, 'day')).toBe(true);
        });
    });

    describe('with dates before 1970 (negative timestamps)', () => {
        // This was a bug we fixed: negative timestamps were incorrectly multiplied by 1000

        it('returns true for 1800-1900 with "year" unit', () => {
            expect(isTimeUnitCompatible('1800-01-01', '1900-01-01', 'year')).toBe(true);
        });

        it('returns false for 1600-2024 with "day" unit (classic bug case)', () => {
            expect(isTimeUnitCompatible('1600-01-01', '2024-01-01', 'day')).toBe(false);
        });

        it('returns true for 1600-2024 with "year" unit', () => {
            expect(isTimeUnitCompatible('1600-01-01', '2024-01-01', 'year')).toBe(true);
        });

        it('handles mixed pre/post 1970 dates correctly', () => {
            // 1950 to 2000 = 50 years, should be fine with month
            expect(isTimeUnitCompatible('1950-01-01', '2000-01-01', 'month')).toBe(true);
        });
    });

    describe('with edge cases', () => {
        it('returns true when min and max are the same', () => {
            expect(isTimeUnitCompatible('2024-01-01', '2024-01-01', 'day')).toBe(true);
        });

        it('returns true when min > max (swapped dates)', () => {
            // Should still work because we use Math.abs
            expect(isTimeUnitCompatible('2024-12-31', '2024-01-01', 'day')).toBe(true);
        });

        it('returns true when dates are invalid (fail-open)', () => {
            expect(isTimeUnitCompatible('invalid-date', '2024-01-01', 'day')).toBe(true);
            expect(isTimeUnitCompatible('2024-01-01', 'invalid-date', 'day')).toBe(true);
            expect(isTimeUnitCompatible(null, '2024-01-01', 'day')).toBe(true);
            expect(isTimeUnitCompatible('2024-01-01', undefined, 'day')).toBe(true);
        });
    });
});

// ============================================================================
// Chart integration tests (time scale validation in action)
// ============================================================================

describe('Chart with time scale validation', () => {
    describe('renders without crashing for problematic data ranges', () => {
        it('renders chart with 400+ years of data and "year" unit', () => {
            const data = {
                loading: false,
                value: generateYearlyData(1600, 2024),
            };
            const options = createTimeChartOptions('year');

            render(<Chart data={data} options={options} />);

            const chartCanvas = screen.getByRole('img', {
                description: options.description,
            });
            expect(chartCanvas).toBeInTheDocument();
        });

        it('renders chart with 10 years of data and "month" unit', () => {
            const data = {
                loading: false,
                value: generateYearlyData(2014, 2024),
            };
            const options = createTimeChartOptions('month');

            render(<Chart data={data} options={options} />);

            const chartCanvas = screen.getByRole('img', {
                description: options.description,
            });
            expect(chartCanvas).toBeInTheDocument();
        });

        it('renders chart with 1 year of daily data and "day" unit', () => {
            const data = {
                loading: false,
                value: generateDailyData('2024-01-01', 365),
            };
            const options = createTimeChartOptions('day');

            render(<Chart data={data} options={options} />);

            const chartCanvas = screen.getByRole('img', {
                description: options.description,
            });
            expect(chartCanvas).toBeInTheDocument();
        });
    });

    describe('handles incompatible time unit gracefully (fallback)', () => {
        it('renders chart with 400+ years data even with "day" unit configured', () => {
            // This would crash without validation - getSafeTimeUnit should fallback
            const data = {
                loading: false,
                value: generateYearlyData(1600, 2024),
            };
            const options = createTimeChartOptions('day'); // Incompatible!

            // Should NOT throw, the SDK should fallback to a safe unit
            render(<Chart data={data} options={options} />);

            const chartCanvas = screen.getByRole('img', {
                description: options.description,
            });
            expect(chartCanvas).toBeInTheDocument();
        });

        it('renders chart with 200 years data even with "week" unit configured', () => {
            const data = {
                loading: false,
                value: generateYearlyData(1824, 2024),
            };
            const options = createTimeChartOptions('week'); // Potentially incompatible

            render(<Chart data={data} options={options} />);

            const chartCanvas = screen.getByRole('img', {
                description: options.description,
            });
            expect(chartCanvas).toBeInTheDocument();
        });
    });

    describe('handles pre-1970 dates (negative timestamps)', () => {
        it('renders chart with 1600-1800 data', () => {
            const data = {
                loading: false,
                value: generateYearlyData(1600, 1800),
            };
            const options = createTimeChartOptions('year');

            render(<Chart data={data} options={options} />);

            const chartCanvas = screen.getByRole('img', {
                description: options.description,
            });
            expect(chartCanvas).toBeInTheDocument();
        });

        it('renders chart spanning 1900-2024 with "month" unit', () => {
            const data = {
                loading: false,
                value: generateYearlyData(1900, 2024),
            };
            const options = createTimeChartOptions('month');

            render(<Chart data={data} options={options} />);

            const chartCanvas = screen.getByRole('img', {
                description: options.description,
            });
            expect(chartCanvas).toBeInTheDocument();
        });
    });

    describe('handles empty or missing data gracefully', () => {
        it('renders chart with empty data array', () => {
            const data = {
                loading: false,
                value: [],
            };
            const options = createTimeChartOptions('day');

            render(<Chart data={data} options={options} />);

            // Chart should still render (empty state)
            const chartCanvas = screen.getByRole('img', {
                description: options.description,
            });
            expect(chartCanvas).toBeInTheDocument();
        });

        it('renders chart in loading state without crashing', () => {
            const data = {
                loading: true,
                value: undefined,
            };
            const options = createTimeChartOptions('day');

            // Should not throw when rendering in loading state
            expect(() => render(<Chart data={data} options={options} />)).not.toThrow();
        });
    });
});
