import type { CircleLayerSpecification, StyleSpecification } from 'maplibre-gl';
import type { FeatureCollection, BBox, Feature } from 'geojson';
import type { DebouncedFunc } from 'lodash';
import type { Color } from '../types';

export interface POIMapOptions {
    /** Configuration for the shapes used to display markers */
    shapes: FeatureCollection;
    /** Configuration of map style */
    style?: StyleSpecification | string;
    /** Configuration for the layers to display POIs */
    layerParams?: LayersParams[];
    /** Maximum boundaries of the map, outside of which the user cannot zoom/move
     * Also set the position of the map when rendering.
     * If undefined, will default, in order to:
     * - Fit the content if the source is GeoJSON
     * - The world
     */
    bbox?: BBox | undefined;
    /** Configuration for the content of the tooltips that are displayed on hover/touch. */
    tooltip?: {
        formatter?: POIMapTooltipFormatter;
        /** Custom configuration to define how to get a label for each shapes.
         *
         * By default, the label will be taken from a `label` property in the shapes if it exists, or fallback to the key used to map the data and shapes. */
        labelMatcher?: POIMapTooltipMatchers;
    };
    /** Aspect ratio used to draw the map. The map will take he width available to it, and decide its height based on that ratio. */
    aspectRatio?: number;
}
/** Structure containing the numerical data used by the Choropleth to compute
 * the legend and the color of the shapes it renders.
 */
export interface POIMapDataValue {
    x: string;
    y: number;
    label?: string;
}

export type CircleLayer = Omit<CircleLayerSpecification, 'id' | 'source'>;

export type LayersParams = {
    color: Color;
    matchKey: string;
    matchProperty: string;
};

export type POIMapLayer = CircleLayer;

export type ComputeTooltipFunctionPOI = (
    feature: Feature,
    dataValues: POIMapDataValue[],
    options: POIMapOptions,
    matchKey: string
) => string;

export type TooltipParamsPOI = {
    /** Numeric value of the shape */
    value?: number;
    /** Label of the shape */
    label: string;
    /** Value of the key used to match shapes and numeric data */
    key?: string;
};

export type POIMapTooltipFormatter = ({ value, label, key }: TooltipParamsPOI) => string;

export enum POIMapTooltipMatcherTypes {
    KeyProperty = 'keyProperty',
    KeyMap = 'keyMap',
}

/** `POIMapTooltipMatcher` based on a target feature property */
export interface POIMapTooltipMatcherKeyProperty {
    type: POIMapTooltipMatcherTypes.KeyProperty;
    key: string;
}

/** `POIMapTooltipMatcher` based on an key-value object mapping  */
export interface POIMapTooltipMatcherKeyMap {
    type: POIMapTooltipMatcherTypes.KeyMap;
    mapping: {
        [key: string]: string;
    };
}

export type POIMapTooltipMatchers = POIMapTooltipMatcherKeyProperty | POIMapTooltipMatcherKeyMap;

export type MapRenderTooltipFunctionPOI = DebouncedFunc<(feature: Feature) => string>;
