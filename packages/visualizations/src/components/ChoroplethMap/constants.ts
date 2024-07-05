import type { FeatureCollection } from 'geojson';
import { ColorScaleTypes } from '../types';
import type { ColorScale, Color } from '../types';

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
