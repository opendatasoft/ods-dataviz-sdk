import type { BBox } from 'geojson';
import type { Color } from '../types';

export const DEFAULT_COLORS: Record<string, Color> = {
    Default: '#CCCCCC',
    ShapeOutline: '#FFFFFF',
    LightGrey: '#CBD2DB',
    DarkGrey: '#515457',
    Blue: '#142E7B',
} as const;

export const DEFAULT_BBOX: BBox = [180, 90, -180, -90];

export const DEFAULT_ASPECT_RATIO = 1;
