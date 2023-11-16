import type {
    CircleLayerSpecification,
    SymbolLayerSpecification,
    StyleSpecification,
    GeoJSONFeature,
    LngLatLike,
    RequestTransformFunction,
    GestureOptions,
} from 'maplibre-gl';
import type { BBox, GeoJsonProperties } from 'geojson';

import type { Color, Source } from '../types';
import type { CategoryLegend } from '../Legend/types';

// To render data layers on the map
export type PoiMapData = Partial<{
    sources: StyleSpecification['sources'];
    layers: Layer[];
}>;

export interface PoiMapOptions {
    /*
     * To render a basemap. Could be:
     * - A MapLibre style URL; See https://maplibre.org/maplibre-gl-js/docs/API/types/maplibregl.MapOptions.
     * - Or an object with a 'sources' and a 'layers' keys. Useful when using a Raster or WMS basemap.
     */
    style?: string | PoiMapStyleOption;
    /**
     * A callback run before the Map makes a request for an external URL.
     * The callback can be used to modify the url, set headers, or set the credentials property for cross-origin requests.
     * Expected to return an object with a url property and optionally headers and credentials properties.
     *
     * Especially useful for mapbox://
     */
    transformRequest?: RequestTransformFunction;
    /**
     * Maximum boundaries of the map, outside of which the user cannot zoom/move
     * Also set the position of the map when rendering.
     */
    bbox?: BBox;
    center?: LngLatLike;
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    // Aspect ratio used to draw the map. The map will take he width available to it, and decide its height based on that ratio.
    aspectRatio?: number;
    // Is the map interactive for the user (zoom, move, tooltips...)
    interactive?: boolean;
    title?: string;
    subtitle?: string;
    description?: string;
    legend?: CategoryLegend;
    /** Link button to source */
    sourceLink?: Source;
    cooperativeGestures?: boolean | GestureOptions;
    /** Images to load by the Map. keys are image ids  */
    images?: Record<string, string>;
}

export type PoiMapStyleOption = Partial<Pick<StyleSpecification, 'sources' | 'layers'>>;

// Supported layers
export type LayerSpecification = CircleLayerSpecification | SymbolLayerSpecification;

type BaseLayer = {
    id: string;
    source: string;
    sourceLayer?: string;
    /**
     * A feature for which a popup is defined will update the cursor style in pointer mode
     */
    popup?: PopupLayer;
};
/**
 * Base on Maplibre layers https://maplibre.org/maplibre-style-spec/layers/
 * Use only part of the configuration to build layers with consistent styles.
 */
export type CircleLayer = BaseLayer & {
    type: CircleLayerSpecification['type'];
    color: Color;
    borderColor?: Color;
    circleRadius?: number;
    circleStrokeWidth?: number;
    /**
     * Set a marker color based on a value.
     * If no match, default color comes from `color`
     */
    colorMatch?: {
        key: string;
        colors: { [key: string]: Color };
        borderColors?: { [key: string]: Color };
    };
};

export type SymbolLayer = BaseLayer & {
    type: SymbolLayerSpecification['type'];
    /** id of the image to use as icon-image */
    iconImageId: string;
    /**
     * Set a icon image based on a value.
     * If no match, default icon image comes from `iconImageId`
     */
    iconImageMatch?: {
        key: string;
        /** Keys must match from the options.images keys  */
        imageIds: Record<string, string>;
    };
};

export type Layer = CircleLayer | SymbolLayer;

export const POPUP_DISPLAY = {
    tooltip: 'tooltip',
    sidebar: 'sidebar',
    modal: 'modal',
} as const;

export type PopupDisplayTypes = keyof typeof POPUP_DISPLAY;

export type PopupLayer = {
    /**
     * Control where to display the popup
     * - `sidebar`: As a side element (on the left)
     * - `tooltip`: Above the feature that has been clicked
     * - `modal`: As a modal (takes all width)
     */
    display: PopupDisplayTypes;
    getContent: (id?: GeoJSONFeature['id'], properties?: GeoJsonProperties) => Promise<string>;
    getLoadingContent: () => string;
};

export type GeoPoint = {
    lat: number;
    lon: number;
};
/** A configuration map for popups where keys are layer ids and values are PopupLayer object. */
export type PopupConfigurationByLayers = { [key: string]: PopupLayer };

export type CenterZoomOptions = { zoom?: number; center?: LngLatLike };
