import type { PopupOptions, StyleSpecification } from 'maplibre-gl';
import type { Color } from '../types';
import { POPUP_DISPLAY, PopupDisplayTypes } from './types';

export const DEFAULT_BASEMAP_STYLE: StyleSpecification = {
    version: 8,
    name: 'Opendatasoft default basemap style',
    sources: {},
    layers: [],
};

export const DEFAULT_ASPECT_RATIO = 1;

export const DEFAULT_DARK_GREY: Color = '#515457';

export const POPUP_WIDTH = 300;

// Update styles in ./MapRender.svelte if this classname changes
export const POPUP_CLASSNAME = 'poi-map__popup';

export const POPUP_DISPLAY_CLASSNAME_MODIFIER: Record<PopupDisplayTypes, string> = {
    [POPUP_DISPLAY.tooltip]: `${POPUP_CLASSNAME}--as-tooltip`,
    [POPUP_DISPLAY.sidebar]: `${POPUP_CLASSNAME}--as-sidebar`,
    [POPUP_DISPLAY.modal]: `${POPUP_CLASSNAME}--as-modal`,
};

export const POPUP_OPTIONS: PopupOptions = {
    className: POPUP_CLASSNAME,
    closeButton: true,
    closeOnClick: false,
};
