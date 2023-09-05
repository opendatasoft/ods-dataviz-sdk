import type { CircleLayerSpecification, GeoJSONFeature, StyleSpecification } from 'maplibre-gl';
import type { BBox, GeoJsonProperties } from 'geojson';
import type { Color } from '../types';

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
    bbox?: BBox | undefined;
    // Aspect ratio used to draw the map. The map will take he width available to it, and decide its height based on that ratio.
    aspectRatio?: number;
    // Is the map interactive for the user (zoom, move, tooltips...)
    interactive?: boolean;
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
    popup?: PopupLayer;
    /**
     * Set a marker color based on a value.
     * If no match, default color comes from `color`
     */
    colorMatch?: {
        key: string;
        colors: { [key: string]: Color };
    };
};

export type PopupLayer = {
    /**
     * Control where to display the popup
     * - `sidebar`: As a side element (on the left)
     * - `tooltip`: Above the feature that has been clicked
     */
    display: 'sidebar' | 'tooltip';
    getContent: (id: GeoJSONFeature['id'], properties?: GeoJsonProperties) => string;
};

export type GeoPoint = {
    lat: number;
    lon: number;
};

export type PopupsConfiguration = { [key: string]: PopupLayer };
