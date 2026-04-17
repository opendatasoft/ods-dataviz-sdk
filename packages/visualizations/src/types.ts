import type { ExpressionInputType } from 'maplibre-gl';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DataFrame = Record<string, any>[];

export type Color = string;

/**
 * Opens in a new tab when clicked (standard anchor behaviour).
 */
export interface LinkHref {
    href: string;
    label: string;
    /** Optional SVG string to display as an icon next to the label */
    icon?: string;
    /** Optional click callback invoked before opening the href. */
    onClick?: () => void;
}

/**
 * Runs a client-side callback. Renders as a menu button, not an anchor.
 */
export interface LinkAction {
    onClick: () => void;
    label: string;
    icon?: string;
}

/**
 * Menu item in LinksMenu: either a navigational link or an action.
 */
export type Link = LinkHref | LinkAction;

export function isLinkHref(link: Link): link is LinkHref {
    return 'href' in link;
}

/** Root CSS class of the LinksMenu wrapper. Consumers can use this to filter the menu from DOM clones (e.g. image export). */
export const LINKS_MENU_CLASS = 'links-menu';

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
