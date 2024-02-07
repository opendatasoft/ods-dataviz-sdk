import type { ExpressionInputType } from 'maplibre-gl';
import type { ComponentProps } from 'svelte';
import type Chart from './Chart';
// import type { ChartOptions } from 'chart.js';
// import type { Async } from '../types';

export type ChartProps = ComponentProps<Chart>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DataFrame = Record<string, any>[];

export type Color = string;

export interface Source {
    href: string;
    label?: string;
    style?: string;
}

export interface DataBounds {
    min: number;
    max: number;
}

export enum ColorScaleTypes {
    Gradient = 'gradient',
    Palette = 'palette',
}

export type GradientScale = {
    type: ColorScaleTypes.Gradient;
    colors: {
        start: Color;
        end: Color;
    };
};

export type PaletteScale = {
    type: ColorScaleTypes.Palette;
    colors: Color[];
};

export type ColorScale = GradientScale | PaletteScale;

// We expect an array with couples of values and ExpressionInput and for the last element a default ExpressionInput
export function isGroupByForMatchExpression(
    value: ExpressionInputType[]
): value is [
    ExpressionInputType,
    ExpressionInputType,
    ExpressionInputType,
    ...ExpressionInputType[],
    ExpressionInputType
] {
    return value.length >= 3 && value.length % 2 === 1;
}
