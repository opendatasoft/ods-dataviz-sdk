import type { CircleLayerSpecification, StyleSpecification } from 'maplibre-gl';
import type { BBox } from 'geojson';
import type { Color } from '../types';

export type PoiMapData = {
    // A style URL; See https://maplibre.org/maplibre-gl-js/docs/API/types/maplibregl.MapOptions
    style: string;
    // All kind of sources supported by MapLibre; See https://maplibre.org/maplibre-style-spec/sources
    sources?: StyleSpecification['sources'];
};

export interface PoiMapOptions {
    layers?: Layer[];
    /** Maximum boundaries of the map, outside of which the user cannot zoom/move
     * Also set the position of the map when rendering.
     */
    bbox?: BBox | undefined;
    // Aspect ratio used to draw the map. The map will take he width available to it, and decide its height based on that ratio.
    aspectRatio?: number;
    // Is the map interactive for the user (zoom, move, tooltips...)
    interactive?: boolean;
}

// Supported layers
export type LayerSpecification = CircleLayerSpecification;

/**
 * Base on Maplibre layers https://maplibre.org/maplibre-style-spec/layers/
 * Use only part of the configuration to build layers with consistent styles.
 */
export type Layer = {
    source: string;
    sourceLayer?: string;
    type: LayerSpecification['type'];
    color: Color;
    groupBy?: {
        key: string;
        colorMap: { [key: string]: Color };
    };
};

export type GeoPoint = {
    lat: number;
    lon: number;
};
