import type {
    CircleLayerSpecification,
    StyleSpecification,
    GeoJSONFeature,
    LngLatLike,
} from 'maplibre-gl';
import type { BBox, GeoJsonProperties } from 'geojson';

import type { Color, Source } from '../types';
import type { CategoryLegendType } from '../Legend/types';

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
     * Maximum boundaries of the map, outside of which the user cannot zoom/move
     * Also set the position of the map when rendering.
     */
    bbox?: BBox;
    center?: LngLatLike;
    zoom?: number;
    // Aspect ratio used to draw the map. The map will take he width available to it, and decide its height based on that ratio.
    aspectRatio?: number;
    // Is the map interactive for the user (zoom, move, tooltips...)
    interactive?: boolean;
    title?: string;
    subtitle?: string;
    description?: string;
    legend?: CategoryLegendType;
    /** Link button to source */
    sourceLink?: Source;
}

export type PoiMapStyleOption = Partial<Pick<StyleSpecification, 'sources' | 'layers'>>;

// Supported layers
export type LayerSpecification = CircleLayerSpecification;

/**
 * Base on Maplibre layers https://maplibre.org/maplibre-style-spec/layers/
 * Use only part of the configuration to build layers with consistent styles.
 */
export type Layer = {
    id: string;
    source: string;
    sourceLayer?: string;
    type: LayerSpecification['type'];
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
    /**
     * A feature for which a popup is defined will update the cursor style in pointer mode
     */
    popup?: PopupLayer;
};

export enum PopupDisplayTypes {
    Tooltip = 'tooltip',
    Sidebar = 'sidebar',
}

export type PopupLayer = {
    /**
     * Control where to display the popup
     * - `sidebar`: As a side element (on the left)
     * - `tooltip`: Above the feature that has been clicked
     */
    display: PopupDisplayTypes;
    getContent: (id?: GeoJSONFeature['id'], properties?: GeoJsonProperties) => Promise<string>;
    getLoadingContent: () => string;
};

export type GeoPoint = {
    lat: number;
    lon: number;
};

export type PopupsConfiguration = { [key: string]: PopupLayer };

export type CenterZoomOptions = { zoom?: number; center?: LngLatLike };
