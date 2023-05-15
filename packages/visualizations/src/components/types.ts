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

export type LegendVariant = 'fluid' | 'fixed';

export enum LegendPositions {
    Right = 'right',
    Left = 'left',
}

export interface LegendLabelsConfiguration {
    text?: (legendIndex: number) => string;
}

type CategoryItem = {
    color?: Color;
    borderColor?: Color;
    borderDashed?: boolean;
    label: LegendLabelsConfiguration | string | undefined;
    onClick: (index: number) => void;
    onHover?(index: number): void;
    onLeave?(): void;
};

export type CategoryLegend = {
    type: 'category';
    items: CategoryItem[];
};

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
