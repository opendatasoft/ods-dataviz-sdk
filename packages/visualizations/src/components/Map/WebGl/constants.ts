import type {
    DataDrivenPropertyValueSpecification,
    StyleSpecification,
    ControlPosition,
    PopupOptions,
} from 'maplibre-gl';
import type { Color } from 'components/types';

import type { PopupDisplayTypes } from './types';

export const DEFAULT_BASEMAP_STYLE: StyleSpecification = {
    version: 8,
    name: 'Opendatasoft default basemap style',
    sources: {},
    layers: [],
};
export const DEFAULT_DARK_GREY: Color = '#515457';

export const DEFAULT_SORT_KEY_VALUE: DataDrivenPropertyValueSpecification<number> = [
    'case',
    ['==', ['id'], ''],
    0,
    0,
];

export const POPUP_DISPLAY = {
    tooltip: 'tooltip',
    sidebar: 'sidebar',
    modal: 'modal',
} as const;

export const POPUP_WIDTH = 300;

export const CONTROL_POSITION: ControlPosition = 'top-right';

// Update styles in ./MapRender.svelte if one of these classnames must change.
const POPUP_CLASSNAME = 'ods-visualization__map-popup';
export const POPUP_FEATURE_CONTENT = 'ods-visualization__map-popup-feature-content';
export const POPUP_FEATURE_CONTENT_LOADING =
    'ods-visualization__map-popup-feature-content--loading';
export const POPUP_NAVIGATION_CONTROLS_CLASSNAME =
    'ods-visualization__map-popup-navigation-controls';
export const POPUP_NAVIGATION_CONTROLS_OFFSET_CLASSNAME =
    'ods-visualization__map-popup-navigation-controls-offset';
export const POPUP_NAVIGATION_ARROWS_WRAPPER_CLASSNAME =
    'ods-visualization__map-popup-arrows-wrapper';
export const POPUP_NAVIGATION_ARROW_BUTTON_CLASSNAME =
    'ods-visualization__map-popup-navigation-arrow-button';
export const POPUP_NAVIGATION_ARROW_BUTTON_ICON_CLASSNAME =
    'ods-visualization__map-popup-navigation-arrow-button-icon';
export const POPUP_NAVIGATION_CLOSE_BUTTON_CLASSNAME =
    'ods-visualization__map-popup-navigation-close-button';
export const POPUP_NAVIGATION_CLOSE_BUTTON_ICON_CLASSNAME =
    'ods-visualization__map-popup-navigation-close-button-icon';

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
