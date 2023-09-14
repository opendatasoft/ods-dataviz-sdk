import type { BBox } from 'geojson';
import type { StyleSpecification } from 'maplibre-gl';
import type { Color } from '../types';

export const DEFAULT_BASEMAP_STYLE: StyleSpecification = {
    version: 8,
    name: 'Opendatasoft default basemap style',
    sources: {},
    layers: [],
};

export const DEFAULT_BBOX: BBox = [180, 90, -180, -90];

export const DEFAULT_ASPECT_RATIO = 1;

export const DEFAULT_DARK_GREY: Color = '#515457';
