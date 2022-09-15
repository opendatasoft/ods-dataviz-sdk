import type { Feature, FeatureCollection, Position, BBox } from 'geojson';
import type { FillLayerSpecification, Popup } from 'maplibre-gl';
import type { DebouncedFunc } from 'lodash';
import type { ColorScales, Color } from '../types';

export interface ChoroplethOptions {
    shapes: ChoroplethShapeValues;
    colorsScale?: ColorScales;
    legend?: MapLegend;
    aspectRatio: number;
    activeShapes?: string[];
    interactive?: boolean;
    emptyValueColor?: Color;
    tooltip?: {
        labelFormatter?: ChoroplethTooltipFormatter;
        labelMatcher?: ChoroplethTooltipMatchers;
    };
    bbox?: BBox | undefined;
    filter?: string[] | number[] | undefined;
}

export interface MapLegend {
    title?: string;
}

/** Function used to render an HTML Tooltip depending on the shape the user
 * interacted with.
 */
export type ChoroplethTooltipFormatter = ({
    value,
    label,
    key,
}: {
    /** Numeric value of the shape */
    value?: number;
    /** Label of the shape */
    label: string;
    /** Value of the key used to match shapes and numeric data */
    key?: string;
}) => string;

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
