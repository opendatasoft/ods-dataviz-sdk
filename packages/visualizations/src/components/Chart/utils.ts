import type { Color } from '../types';
import type { TimeCartesianAxisConfiguration } from './types';

export function defaultValue<T>(value: T | undefined, fallback: T): T {
    if (value === undefined) return fallback;
    return value;
}

export function singleChartJsColor(color?: Color | Color[]) {
    if (color === undefined) return undefined;
    if (typeof color === 'string') return color;
    return color[0];
}

export function multipleChartJsColors(color?: Color | Color[]) {
    return color;
}

const MILLISECOND_TIMESTAMP = 1000;
const MINUTE_TIMESTAMP = 60 * MILLISECOND_TIMESTAMP;
const HOUR_TIMESTAMP = 60 * MINUTE_TIMESTAMP;
const DAY_TIMESTAMP = 24 * HOUR_TIMESTAMP;
const MONTH_TIMESTAMP = 30 * DAY_TIMESTAMP;
const YEAR_TIMESTAMP = 12 * MONTH_TIMESTAMP;

// This function provides a check to prevent chartJS crashing when trying to render a time unit where
// the min and max are too far apart from each other for the given step size
// dataFrame must came sorted starting index on min and ending on max
// and always in the following format for different time units:
// minute: YYYY-MM-DDTHH:mm
// hour: YYYY-MM-DDTHH:mm
// day: YYYY-MM-DD
// month: YYYY-MM
// year: YYYY
export function isRangeTimeUnitCompatible(
    min: string,
    max: string,
    unit: TimeCartesianAxisConfiguration['timeUnit']
) {
    let stepSize;
    let minTimestamp;
    let splittedMin;
    let maxTimestamp;
    let splittedMax;
    if (min && max && unit) {
        switch (unit) {
            case 'minute':
                stepSize = MINUTE_TIMESTAMP;
                minTimestamp = new Date(min).getTime();
                maxTimestamp = new Date(max).getTime();
                break;
            case 'hour':
                stepSize = HOUR_TIMESTAMP;
                minTimestamp = new Date(min).getTime();
                maxTimestamp = new Date(max).getTime();
                break;
            case 'day':
                stepSize = DAY_TIMESTAMP;
                splittedMin = min.split('-');
                minTimestamp = new Date(
                    Number(splittedMin[0]),
                    Number(splittedMin[1]) - 1,
                    Number(splittedMin[2])
                ).getTime();
                splittedMax = max.split('-');
                maxTimestamp = new Date(
                    Number(splittedMax[0]),
                    Number(splittedMax[1]) - 1,
                    Number(splittedMax[2])
                ).getTime();
                break;
            case 'month':
                stepSize = MONTH_TIMESTAMP;
                splittedMin = min.split('-');
                minTimestamp = new Date(
                    Number(splittedMin[0]),
                    Number(splittedMin[1]) - 1
                ).getTime();
                splittedMax = max.split('-');
                maxTimestamp = new Date(
                    Number(splittedMax[0]),
                    Number(splittedMax[1]) - 1
                ).getTime();
                break;
            case 'year':
                stepSize = YEAR_TIMESTAMP;
                minTimestamp = new Date(Number(min)).getTime();
                maxTimestamp = new Date(Number(max)).getTime();
                break;
            default:
                return false;
        }
        /*
        We base the check here on the chartjs check and what seems to make the crash
        Code and comment from chartjs source (src/scales/scale.time.js) :
        // Prevent browser from freezing in case user options request millions of milliseconds
        if (adapter.diff(max, min, minor) > 100000 * stepSize) {
            throw new Error(min + ' and ' + max + ' are too far apart with stepSize of ' + stepSize + ' ' + minor);
        }
        */
        if (maxTimestamp - minTimestamp > 100000 * stepSize) {
            return false;
        }
        return true;
    }
    return true;
}
