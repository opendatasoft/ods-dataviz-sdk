import type { Color } from '../types';

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

type ItemVariant = 'box' | 'circle' | 'line';

export type CategoryItem = {
    color?: Color;
    variant?: ItemVariant;
    borderColor?: Color;
    borderDashed?: boolean;
    label: LegendLabelsConfiguration | string | undefined;
    onClick?: (index: number) => void;
    onHover?(index: number, isVisible: boolean): void;
    onLeave?(): void;
};

export type CategoryLegend = {
    type: 'category';
    items: CategoryItem[];
    title?: string;
    alignement?: 'start' | 'center' | 'end';
};
