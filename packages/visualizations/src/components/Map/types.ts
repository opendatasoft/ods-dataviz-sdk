import type { Feature, FeatureCollection, Position, BBox } from 'geojson';
import type { FillLayerSpecification, Popup } from 'maplibre-gl';
import type { DebouncedFunc } from 'lodash';
import type { ColorScale, Color } from '../types';

export interface ChoroplethOptions {
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
}

export interface MapFilter {
    key: string;
    value: string | string[];
}

export interface ChoroplethGeoJsonOptions extends ChoroplethOptions {
    /** Configuration for the shapes used as a visual support for the Choropleth rendering, which will be colored using the data. */
    shapes: FeatureCollection;
}

export interface ChoroplethVectorTilesOptions extends ChoroplethOptions {
    /** Configuration for the shapes used as a visual support for the Choropleth rendering, which will be colored using the data. */
    shapesTiles: ChoroplethShapeVectorTilesValue;
    /** Only draw shapes that match the given filter */
    filter?: MapFilter;
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

export interface ChoroplethShapeVectorTilesValue {
    url: string;
    layer: string;
    key: string;
    label?: string;
}

export interface ChoroplethFixedTooltipDescription {
    center: Position;
    description: string;
    popup: Popup;
}

export type MapRenderTooltipFunction = DebouncedFunc<(feature: Feature) => string>;

export type ComputeTooltipFunction = (
    feature: Feature,
    dataValues: ChoroplethDataValue[],
    options: ChoroplethOptions,
    matchKey: string
) => string;

export type ChoroplethLayer = Omit<FillLayerSpecification, 'id' | 'source'>;

export type MapLayer = ChoroplethLayer;
