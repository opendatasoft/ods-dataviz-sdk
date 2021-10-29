import type { Color } from '../types';

export function defaultValue<T>(value: T | undefined, fallback: T): T {
    if (value === undefined) return fallback;
    return value;
}

export function singleChartJsColor(color?: Color) {
    if (color === undefined) return undefined;
    if (typeof color === 'string') return color;
    return color[0];
}

export function multipleChartJsColors(color?: Color) {
    return color;
}
