import type { Feature, FeatureCollection, Position, BBox } from 'geojson';
import type { FillLayerSpecification, Popup } from 'maplibre-gl';
import type { DebouncedFunc } from 'lodash';
import type { ColorScale, Color } from '../types';

export interface ChoroplethOptions {
    /** Configuration for the shapes used as a visual support for the Choropleth rendering, which will be colored using the data. */
    shapes: ChoroplethShapeValues;
    /** Configuration for the color scale used to color the choropleth shapes. */
    colorScale?: ColorScale;
    /** Configuration for the legend displayed for the choropleth */
    legend?: MapLegend;
    /** Aspect ratio used to draw the map. The map will take he width available to it, and decide its height based on that ratio. */
    aspectRatio?: number;
    /** List of keys for which the map will have tooltip displayed from the start. May not work in some situation for VTiles maps (small or out of viewport shapes). */
    activeShapes?: string[];
    /** Is the map interactive for the user (zoom, move, tooltips...)? */
    interactive?: boolean;
    /** Color used to fill shapes that don't have any matching value in the data */
    emptyValueColor?: Color;
    /** Configuration for the content of the tooltips that are displayed on hover/touch. */
    tooltip?: {
        labelFormatter?: ChoroplethTooltipFormatter;
        /** Custom configuration to define how to get a label for each shapes.
         *
         * By default, the label will be taken from a `label` property in the shapes if it exists, or fallback to the key used to map the data and shapes. */
        labelMatcher?: ChoroplethTooltipMatchers;
    };
    /** Initial position of the map when rendering. If undefined, with GeoJSON shapes the map will automatically zoom to fit all content, and on VTiles map, it will display the world. */
    bbox?: BBox | undefined;
    /** Only draw shapes that match the given filter */
    filter?: MapFilter;
}

export interface MapFilter {
    key: string;
    value: string | string[];
}

export interface GeoJsonChoroplethOptions extends ChoroplethOptions {
    shapes: ChoroplethShapeGeoJsonValue;
}

export interface VectorChoroplethOptions extends ChoroplethOptions {
    shapes: ChoroplethShapeVectorTilesValue;
}

export interface MapLegend {
    title?: string;
}

/** Function used to render an HTML Tooltip depending on the shape the user
 * interacted with.
 */
export type TooltipParams = {
    /** Numeric value of the shape */
    value?: number;
    /** Label of the shape */
    label: string;
    /** Value of the key used to match shapes and numeric data */
    key?: string;
};

export type ChoroplethTooltipFormatter = ({ value, label, key }: TooltipParams) => string;

export enum ChoroplethTooltipMatcherTypes {
    KeyProperty = 'keyProperty',
    KeyMap = 'keyMap',
}

/** `ChoroplethTooltipMatcher` based on a target feature property */
export interface ChoroplethTooltipMatcherKeyProperty {
    type: ChoroplethTooltipMatcherTypes.KeyProperty;
    key: string;
}

/** `ChoroplethTooltipMatcher` based on an key-value object mapping  */
export interface ChoroplethTooltipMatcherKeyMap {
    type: ChoroplethTooltipMatcherTypes.KeyMap;
    mapping: {
        [key: string]: string;
    };
}

export type ChoroplethTooltipMatchers =
    | ChoroplethTooltipMatcherKeyProperty
    | ChoroplethTooltipMatcherKeyMap;

/** Structure containing the numerical data used by the Choropleth to compute
 * the legend and the color of the shapes it renders.
 */
export interface ChoroplethDataValue {
    x: string;
    y: number;
    label?: string;
}

export enum ChoroplethShapeTypes {
    GeoJson = 'geojson',
    VectorTiles = 'vtiles',
}

/** `ChoroplethShapeValue` implementation based on a GeoJSON FeatureCollection.  */
export interface ChoroplethShapeGeoJsonValue {
    type: ChoroplethShapeTypes.GeoJson;
    geoJson: FeatureCollection | null;
}

/** `ChoroplethShapeValue` implementation based on a Vector Tiles source URL.  */
export interface ChoroplethShapeVectorTilesValue {
    type: ChoroplethShapeTypes.VectorTiles;
    url: string;
    layer: string;
    key: string;
    label?: string;
}

/** Structure containing everything necessary for a Choropleth to render shapes visually.
 * Supports different types of structures, such as GeoJSON features, or a Vector Tiles source.
 */
export type ChoroplethShapeValues = ChoroplethShapeGeoJsonValue | ChoroplethShapeVectorTilesValue;

export interface ChoroplethFixedTooltipDescription {
    center: Position;
    description: string;
    popup: Popup;
}

export type MapRenderTooltipFunction = DebouncedFunc<(f: Feature) => string>;

export type ChoroplethLayer = Omit<FillLayerSpecification, 'id' | 'source'>;

export type MapLayer = ChoroplethLayer;
