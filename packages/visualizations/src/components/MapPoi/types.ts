import type { CircleLayerSpecification, StyleSpecification } from 'maplibre-gl';
import type { FeatureCollection, BBox, Feature } from 'geojson';
import type { DebouncedFunc } from 'lodash';
import type { Color } from '../types';

export interface PoiMapOptions {
    /** Configuration for the shapes used to display markers */
    shapes: FeatureCollection;
    /** Configuration of map style */
    style?: StyleSpecification | string;
    /** Configuration for the layers to display Pois */
    layerParams?: LayerParams;
    /** Maximum boundaries of the map, outside of which the user cannot zoom/move
     * Also set the position of the map when rendering.
     * If undefined, will default, in order to:
     * - Fit the content if the source is GeoJSON
     * - The world
     */
    bbox?: BBox | undefined;
    /** Configuration for the content of the tooltips that are displayed on hover/touch. */
    tooltip?: {
        formatter?: PoiMapTooltipFormatter;
        /** Custom configuration to define how to get a label for each shapes.
         *
         * By default, the label will be taken from a `label` property in the shapes if it exists, or fallback to the key used to map the data and shapes. */
        labelMatcher?: PoiMapTooltipMatchers;
    };
    /** Aspect ratio used to draw the map. The map will take he width available to it, and decide its height based on that ratio. */
    aspectRatio?: number;
    /** Is the map interactive for the user (zoom, move, tooltips...)? */
    interactive?: boolean;
}
/** Structure containing the numerical data used by the Choropleth to compute
 * the legend and the color of the shapes it renders.
 */
export interface PoiMapDataValue {
    x: string;
    y: number;
    label?: string;
}

export type CircleLayer = Omit<CircleLayerSpecification, 'id' | 'source'>;

export type LayerParams = {
    colors: Color[]; // Array of colors to match the array of values
    matchValues: string[]; // Array of values to apply colors
    matchKey: string; // The features key on which apply colors and values mapping
    noMatchColor?: Color;
};

export type PoiMapLayer = CircleLayer;

export type ComputeTooltipFunctionPoi = (
    feature: Feature,
    dataValues: PoiMapDataValue[],
    options: PoiMapOptions,
    matchKey: string
) => string;

export type TooltipParamsPoi = {
    /** Numeric value of the shape */
    value?: number;
    /** Label of the shape */
    label: string;
    /** Value of the key used to match shapes and numeric data */
    key?: string;
};

export type PoiMapTooltipFormatter = ({ value, label, key }: TooltipParamsPoi) => string;

export enum PoiMapTooltipMatcherTypes {
    KeyProperty = 'keyProperty',
    KeyMap = 'keyMap',
}

/** `PoiMapTooltipMatcher` based on a target feature property */
export interface PoiMapTooltipMatcherKeyProperty {
    type: PoiMapTooltipMatcherTypes.KeyProperty;
    key: string;
}

/** `PoiMapTooltipMatcher` based on an key-value object mapping  */
export interface PoiMapTooltipMatcherKeyMap {
    type: PoiMapTooltipMatcherTypes.KeyMap;
    mapping: {
        [key: string]: string;
    };
}

export type PoiMapTooltipMatchers = PoiMapTooltipMatcherKeyProperty | PoiMapTooltipMatcherKeyMap;

export type MapRenderTooltipFunctionPoi = DebouncedFunc<(feature: Feature) => string>;
