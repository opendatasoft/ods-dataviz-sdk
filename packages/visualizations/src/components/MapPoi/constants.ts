import type { BBox } from 'geojson';
import type { LngLatLike, PopupOptions, StyleSpecification } from 'maplibre-gl';

export const DEFAULT_BASEMAP_STYLE: StyleSpecification = {
    version: 8,
    name: 'Opendatasoft default basemap style',
    sources: {},
    layers: [],
};

export const DEFAULT_BBOX: BBox = [180, 90, -180, -90];

export const DEFAULT_ASPECT_RATIO = 1;

export const DEFAULT_MAP_CENTER: LngLatLike = [0, 0];

export const POPUP_OPTIONS: PopupOptions = {
    className: 'poi-map__popup',
    closeButton: false,
    maxWidth: '300px',
};
