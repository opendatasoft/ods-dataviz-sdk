import type { Color } from 'types';

export const CATEGORY_LEGEND_VARIANT = {
    /** Title above, items grouped by symbol (circles, lines, boxes...), one row per group. */
    Grouped: 'grouped',
    /**
     * Title then items on the same line(s), in a frame that scrolls past `maxHeight` (e.g. the
     * series of a segmented chart). When narrow: the title on top, then the items in columns.
     */
    Inline: 'inline',
} as const;
export type CategoryLegendVariant =
    typeof CATEGORY_LEGEND_VARIANT[keyof typeof CATEGORY_LEGEND_VARIANT];

export const LEGEND_POSITIONS = {
    bottom: 'bottom',
    left: 'left',
    right: 'right',
} as const;
export type LegendPositions = typeof LEGEND_POSITIONS[keyof typeof LEGEND_POSITIONS];

export interface LegendLabelsConfiguration {
    text?: (legendIndex: number) => string;
}

export interface LegendConfiguration {
    display?: boolean;
    position?: LegendPositions;
    align?: 'start' | 'center' | 'end';
    labels?: LegendLabelsConfiguration;
    boxStyle?: 'rect' | 'line' | 'dash';
    /** Wether to use ChartJS legend or homemade one
    NOTE: temporary API for backward compatibility
     */
    custom?: boolean;
    /** Custom legend only: title shown with the items (e.g. the field the series are split by). */
    title?: string;
    /** Custom legend only: see `CATEGORY_LEGEND_VARIANT`. Defaults to `'grouped'`. */
    variant?: CategoryLegendVariant;
    /**
     * Custom legend, `'inline'` variant only: max height of the legend (CSS length); past it,
     * the legend scrolls.
     */
    maxHeight?: string;
}

export type LegendVariant = 'fluid' | 'fixed';

export const CATEGORY_ITEM_VARIANT = {
    Circle: 'circle',
    Line: 'line',
    Box: 'box',
    Image: 'image',
} as const;

type BaseCategoryItem = {
    label: LegendLabelsConfiguration | string | undefined;
    onClick?: (index: number) => void;
    onHover?(index: number, isVisible: boolean): void;
    onLeave?(): void;
};

export type CircleCategoryItem = BaseCategoryItem & {
    variant: typeof CATEGORY_ITEM_VARIANT.Circle;
    color: Color;
    borderColor?: Color;
};

export type BoxCategoryItem = BaseCategoryItem & {
    variant: typeof CATEGORY_ITEM_VARIANT.Box;
    color: Color;
    borderColor?: Color;
};

export type LineCategoryItem = BaseCategoryItem & {
    variant: typeof CATEGORY_ITEM_VARIANT.Line;
    borderColor: Color;
    dashed?: boolean;
};

export type ImageCategoryItem = BaseCategoryItem & {
    variant: typeof CATEGORY_ITEM_VARIANT.Image;
    src: string;
};

export type CategoryItem =
    | CircleCategoryItem
    | BoxCategoryItem
    | LineCategoryItem
    | ImageCategoryItem;

export const CATEGORY_LEGEND_POSITION = {
    /** Below the map (default, legacy behaviour). */
    bottom: 'bottom',
    /** Floating overlay in the map's top inline-start corner (mirrors in RTL). */
    topLeft: 'top-left',
} as const;

// Includes the legacy chart legend positions (bottom/left/right) so the shared
// CategoryLegend type stays compatible with the chart's custom legend. The map
// only acts on 'top-left' (overlay); other values fall back to the default
// below-the-map rendering.
export type CategoryLegendPosition = LegendPositions | typeof CATEGORY_LEGEND_POSITION.topLeft;

export type CategoryLegend = {
    type: 'category';
    items: CategoryItem[];
    title?: string;
    align?: 'start' | 'center' | 'end';
    /**
     * Where the legend renders relative to the map. Defaults to `'bottom'`
     * (below the map). `'top-left'` renders it as a floating overlay in the
     * map's top corner. Positioning is logical (inline-start), so it
     * automatically mirrors to the top-right corner in RTL layouts.
     */
    position?: CategoryLegendPosition;
    /** See `CATEGORY_LEGEND_VARIANT`. Defaults to `'grouped'`. */
    variant?: CategoryLegendVariant;
    /** `'inline'` variant only: max height (CSS length); past it, the legend scrolls. */
    maxHeight?: string;
    /**
     * `'inline'` variant only: style of the title, e.g. to match the chart axis titles.
     * Defaults to bold, inherited color.
     */
    titleStyle?: {
        color?: string;
        /** In px */
        fontSize?: number;
        fontWeight?: string | number;
    };
};
