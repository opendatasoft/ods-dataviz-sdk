import type { CircleLayerSpecification, StyleSpecification } from 'maplibre-gl';
import type { BBox, Feature, FeatureCollection } from 'geojson';
import type { DebouncedFunc } from 'lodash';
import type { Color } from '../types';

export interface PoiMapOptions {
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
    /** Aspect ratio used to draw the map. The map will take he width available to it, and decide its height based on that ratio. */
    aspectRatio?: number;
    /** Is the map interactive for the user (zoom, move, tooltips...)? */
    interactive?: boolean;
}
/** Structure containing the shapes data used by the POI map
*/
export type PoiMapDataValue = {
    value: FeatureCollection
};

export type CircleLayer = Omit<CircleLayerSpecification, 'id' | 'source'>;

export type LayerParams = {
    colors: Color[]; // Array of colors to match the array of values
    matchValues: string[]; // Array of values to apply colors
    matchKey: string; // The features key on which apply colors and values mapping
    noMatchColor?: Color;
};

export type PoiMapLayer = CircleLayer;
