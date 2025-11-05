import type {
    CircleLayerSpecification,
    FillLayerSpecification,
    GeoJSONFeature,
    GestureOptions,
    LngLatLike,
    MapGeoJSONFeature,
    RequestTransformFunction,
    StyleImageMetadata,
    StyleSpecification,
    SymbolLayerSpecification,
    LineLayerSpecification,
} from 'maplibre-gl';
import type { BBox, GeoJsonProperties } from 'geojson';
import type { Color } from 'types';

import type { POPUP_DISPLAY } from './constants';

export type WebGlMapData = Partial<{
    sources: StyleSpecification['sources'];
    layers: Layer[];
}>;

export type FeatureClickHandler = (f: MapGeoJSONFeature[]) => void;
export type OnFeatureClick = {
    callback: FeatureClickHandler;
    layers: string[];
};
export interface WebGlMapOptions {
    /*
     * To render a basemap. Could be:
     * - A MapLibre style URL; See https://maplibre.org/maplibre-gl-js/docs/API/types/maplibregl.MapOptions.
     * - Or an object with a 'sources' and a 'layers' keys. Useful when using a Raster or WMS basemap.
     */
    style?: string | WebGlMapStyleOption;
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
    cooperativeGestures?: boolean | GestureOptions;
    /** If true, the map's canvas can be exported to an image using toDataURL. This is false by default as a performance optimization. */
    preserveDrawingBuffer?: boolean;
    /** Images to load by the Map. keys are image ids  */
    images?: Images;
    /** An addiational callback to be triggered when clicking a feature */
    onFeatureClick?: OnFeatureClick;
}

export type WebGlMapStyleOption = Partial<Pick<StyleSpecification, 'sources' | 'layers'>>;

// Supported layers
export type LayerSpecification =
    | CircleLayerSpecification
    | SymbolLayerSpecification
    | FillLayerSpecification
    | LineLayerSpecification;

type BaseLayer = {
    id: string;
    source: string;
    sourceLayer?: string;
    /**
     * A feature for which a popup is defined will update the cursor style in pointer mode
     */
    popup?: PopupLayer;
};

/** Color-category match (with optional border colors) */
export type CategoricalColorMatch = {
    key: string;
    colors: Record<string, Color>;
    borderColors?: Record<string, Color>;
};

/** Numeric-category match (width, opacity) */
export type CategoricalNumberMatch = {
    key: string;
    values: Record<string, number>;
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
    colorMatch?: CategoricalColorMatch;
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

export type FillLayer = BaseLayer & {
    type: FillLayerSpecification['type'];
    color: Color;
    borderColor?: Color;
    opacity?: number;
    colorMatch?: CategoricalColorMatch;
    opacityMatch?: CategoricalNumberMatch; // values are 0..1
};

export type LineLayer = BaseLayer & {
    type: LineLayerSpecification['type'];
    color: Color;
    width?: number;
    opacity?: number;
    colorMatch?: CategoricalColorMatch;
    widthMatch?: CategoricalNumberMatch;
    opacityMatch?: CategoricalNumberMatch;
};

export type Layer = CircleLayer | SymbolLayer | FillLayer | LineLayer;

export type GeoPoint = {
    lat: number;
    lon: number;
};

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

export type PopupDisplayTypes = keyof typeof POPUP_DISPLAY;

/** A configuration map for popups where keys are layer ids and values are PopupLayer object. */
export type PopupConfigurationByLayers = { [key: string]: PopupLayer };

export type CenterZoomOptions = { zoom?: number; center?: LngLatLike };

export type Images = Record<
    string,
    { id: string; url: string; options?: Partial<StyleImageMetadata> }
>;

export type WebGlMapProps = {
    data: WebGlMapData;
    options: WebGlMapOptions;
};

export type SupportedGeometry =
    | GeoJSON.Point
    | GeoJSON.MultiPoint
    | GeoJSON.LineString
    | GeoJSON.MultiLineString
    | GeoJSON.Polygon
    | GeoJSON.MultiPolygon;
