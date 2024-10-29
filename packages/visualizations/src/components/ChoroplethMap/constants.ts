import type { FeatureCollection } from 'geojson';
import type { Color, ColorScale } from 'types';
import { ColorScaleTypes } from 'types';

export const DEFAULT_COLORS: Record<string, Color> = {
    Default: '#CCCCCC',
    ShapeOutline: '#FFFFFF',
    LightGrey: '#CBD2DB',
    DarkGrey: '#515457',
} as const;

export const DEFAULT_COLORSCALE: ColorScale = {
    type: ColorScaleTypes.Gradient,
    colors: {
        start: DEFAULT_COLORS.LightGrey,
        end: DEFAULT_COLORS.DarkGrey,
    },
};

export const EMPTY_FC: FeatureCollection = {
    type: 'FeatureCollection',
    features: [],
};
