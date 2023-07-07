import type { Color } from '../types';
import type { CircleLayer } from './types';

export const DEFAULT_COLORS: Record<string, Color> = {
    Default: '#CCCCCC',
    ShapeOutline: '#FFFFFF',
    LightGrey: '#CBD2DB',
    DarkGrey: '#515457',
    Blue: '#142E7B',
} as const;

export const DEFAULT_LAYERS_PARAMS = {
    type: 'circle',
    layout: {},
    paint: {
        'circle-radius': 6,
        'circle-color': DEFAULT_COLORS.Blue,
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
