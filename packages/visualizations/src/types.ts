import type { ExpressionInputType } from 'maplibre-gl';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DataFrame = Record<string, any>[];

export type Color = string;

/**
 * Represents a link in the LinksMenu component.
 * Can be extended in the future to support other link types (e.g., callbacks, exports).
 */
export interface Link {
    /** The URL to navigate to when the link is clicked */
    href: string;
    /** The label displayed for this link */
    label: string;
    /** Optional SVG string to display as an icon next to the label */
    icon?: string;
}

/**
 * Props for the LinksMenu component.
 */
export interface LinksMenuProps extends Record<string, unknown> {
    /** Array of links to display in the menu */
    links: Link[];
    /** Optional inline styles for the menu container */
    style?: string | null;
}

export interface CardProps extends Record<string, unknown> {
    title?: string;
    subtitle?: string;
    defaultStyle?: boolean;
    links?: Link[];
    style?: string | null;
    className?: string | null;
    clientWidth?: number;
    tag?: 'div' | 'figure';
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
export interface Async<T> {
    value?: T;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error?: any; // unknown is more safe, but Typescript doesn't allow catching error as unknown yet, see https://github.com/microsoft/TypeScript/issues/26174
    loading?: boolean;
}
