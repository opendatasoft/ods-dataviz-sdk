import type { Color } from '../types';
import type { CircleLayer } from './types';

export const DEFAULT_COLORS: Record<string, Color> = {
    Default: '#CCCCCC',
    ShapeOutline: '#FFFFFF',
    LightGrey: '#CBD2DB',
    DarkGrey: '#515457',
    Blue: '#142E7B',
    LightBlue: '#5571c2',
} as const;

export const DEFAULT_LAYERS_PARAMS = {
    type: 'circle',
    layout: {},
    paint: {
        'circle-radius': 6,
        'circle-color': ['case', ['boolean', ['feature-state', 'active'], false], DEFAULT_COLORS.Blue, DEFAULT_COLORS.LightBlue],
        'circle-stroke-width': [
            'interpolate',
            ['linear'],
            ['zoom'],
            1,
            ['case', ['boolean', ['feature-state', 'active'], false], 4, 0.25],
            7.5,
            ['case', ['boolean', ['feature-state', 'active'], false], 6, 1.25],
        ],
        'circle-stroke-color': DEFAULT_COLORS.LightGrey,
    },
    filter: ['==', ['geometry-type'], 'Point'],
} as CircleLayer;

export const TOOLTIP_WIDTH_PADDING = {
    top: 0,
    bottom: 0,
    left: 240,
    right: 0,
};

export const NULL_PADDING = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
};

