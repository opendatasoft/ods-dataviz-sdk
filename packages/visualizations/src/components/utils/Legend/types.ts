import type { Color } from '../../types';

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
}

export type LegendVariant = 'fluid' | 'fixed';

export const CATEGORY_ITEM_VARIANT = {
    Circle: 'circle',
    Line: 'line',
    Box: 'box',
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

export type CategoryItem = CircleCategoryItem | BoxCategoryItem | LineCategoryItem;

export type CategoryLegendType = {
    type: 'category';
    items: CategoryItem[];
    title?: string;
    align?: 'start' | 'center' | 'end';
};
