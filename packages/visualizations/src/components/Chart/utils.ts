import type { Color } from '../types';

export const DEFAULT_GREY_COLOR = '#F0F0F0';

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
