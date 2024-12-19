import type { ExpressionInputType } from 'maplibre-gl';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DataFrame = Record<string, any>[];

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
		start: string;
		end: string;
	};
};

export type PaletteScale = {
	type: ColorScaleTypes.Palette;
	colors: string[];
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
export interface Async<T> {
    value?: T;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error?: any; // unknown is more safe, but Typescript doesn't allow catching error as unknown yet, see https://github.com/microsoft/TypeScript/issues/26174
    loading?: boolean;
}
