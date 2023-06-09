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
    },
    filter: ['==', ['geometry-type'], 'Point'],
} as CircleLayer;
