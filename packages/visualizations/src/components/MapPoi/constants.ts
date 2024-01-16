import type { ControlPosition, PopupOptions, StyleSpecification } from 'maplibre-gl';
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

export const CONTROL_POSITION: ControlPosition = 'top-right';


// Update styles in ./MapRender.svelte if one of these classnames must change.
const POPUP_CLASSNAME = 'poi-map__popup';
export const POPUP_FEATURE_CONTENT = 'poi-map__popup-feature-content';
export const POPUP_FEATURE_CONTENT_LOADING = 'poi-map__popup-feature-content--loading';
export const POPUP_NAVIGATION_CONTROLS_CLASSNAME = 'poi-map__popup-navigation-controls';
export const POPUP_NAVIGATION_CONTROLS_OFFSET_CLASSNAME =
    'poi-map__popup-navigation-controls-offset';
export const POPUP_NAVIGATION_ARROWS_WRAPPER_CLASSNAME = 'poi-map__popup-arrows-wrapper';
export const POPUP_NAVIGATION_ARROW_BUTTON_CLASSNAME = 'poi-map__popup-navigation-arrow-button';
export const POPUP_NAVIGATION_ARROW_BUTTON_ICON_CLASSNAME =
    'poi-map__popup-navigation-arrow-button-icon';
export const POPUP_NAVIGATION_CLOSE_BUTTON_CLASSNAME = 'poi-map__popup-navigation-close-button';
export const POPUP_NAVIGATION_CLOSE_BUTTON_ICON_CLASSNAME =
    'poi-map__popup-navigation-close-button-icon';

export const POPUP_DISPLAY_CLASSNAME_MODIFIER: Record<PopupDisplayTypes, string> = {
    [POPUP_DISPLAY.tooltip]: `${POPUP_CLASSNAME}--as-tooltip`,
    [POPUP_DISPLAY.sidebar]: `${POPUP_CLASSNAME}--as-sidebar`,
    [POPUP_DISPLAY.modal]: `${POPUP_CLASSNAME}--as-modal`,
};

export const POPUP_OPTIONS: PopupOptions = {
    className: POPUP_CLASSNAME,
    closeButton: false,
    closeOnClick: false,
};
