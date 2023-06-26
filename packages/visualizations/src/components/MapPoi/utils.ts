import type { BBox, Feature } from 'geojson';
import type { PoiMapLayer, ComputeTooltipFunction } from './types';
import type { Color } from '../types';
import { DEFAULT_COLORS } from './constants';

export const computeBaseRoundMarkerLayer = (
    colors: Color[],
    matchValues: string[],
    matchKey: string,
    noMatchColor?: Color
): PoiMapLayer => {
    const matchExpression = ['match', ['get', matchKey]];
    matchValues.forEach((key, i) => {
        matchExpression.push(key);
        matchExpression.push(colors[i]);
    });
    matchExpression.push(noMatchColor || DEFAULT_COLORS.Blue); // Default fallback color

    return {
        type: 'circle',
        layout: {},
        paint: {
            'circle-radius': 6,
            'circle-color': matchExpression,
        },
        filter: ['==', ['geometry-type'], 'Point'],
    };
};

// This is a default bound that will be extended
export const VOID_BOUNDS: BBox = [180, 90, -180, -90];

export const defaultTooltipFormat = (feature: Feature): string =>
    feature?.properties?.label ? `${feature.properties?.label}` : '';

export const computeTooltip: ComputeTooltipFunction = (hoveredFeature, options) => {
    const format = options?.tooltip?.formatter;
    return format ? format(hoveredFeature) : defaultTooltipFormat(hoveredFeature);
};
