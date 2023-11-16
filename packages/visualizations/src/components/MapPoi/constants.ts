import type { PopupOptions, StyleSpecification } from 'maplibre-gl';
import type { Color } from '../types';

export const DEFAULT_BASEMAP_STYLE: StyleSpecification = {
    version: 8,
    name: 'Opendatasoft default basemap style',
    sources: {},
    layers: [],
};

export const DEFAULT_ASPECT_RATIO = 1;

export const DEFAULT_DARK_GREY: Color = '#515457';

export const POPUP_WIDTH = 300;

export const POPUP_CLASSNAME = 'poi-map__popup';

export const POPUP_OPTIONS: PopupOptions = {
    className: POPUP_CLASSNAME,
    closeButton: true,
    closeOnClick: false,
};
