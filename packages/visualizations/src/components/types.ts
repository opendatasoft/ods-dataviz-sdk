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
