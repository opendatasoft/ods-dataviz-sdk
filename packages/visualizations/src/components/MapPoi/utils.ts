import type { BBox, Feature } from 'geojson';
import type { Map } from 'maplibre-gl';
import type { PoiMapLayer, ComputePOITooltipFunction } from './types';
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
            'circle-stroke-width': [
                'interpolate',
                ['linear'],
                ['zoom'],
                1,
                ['case', ['boolean', ['feature-state', 'active'], false], 4, 0.25],
                7.5,
                ['case', ['boolean', ['feature-state', 'active'], false], 6, 1.25],
            ],
            'circle-stroke-color': DEFAULT_COLORS.LightGrey,
        },
        filter: ['==', ['geometry-type'], 'Point'],
    };
};

// This is a default bound that will be extended
export const VOID_BOUNDS: BBox = [180, 90, -180, -90];

export const defaultTooltipFormat = (feature: Feature): string =>
    feature?.properties?.label ? `${feature.properties?.label}` : '';

export const computeTooltip: ComputePOITooltipFunction = (hoveredFeature, options) => {
    const format = options?.tooltip?.formatter;
    return format ? format(hoveredFeature) : defaultTooltipFormat(hoveredFeature);
};

export const clearActiveFeature = (
    mapInstance: Map | undefined | null,
    source: string | undefined | null,
    activeId: string | number | undefined | null
) => {
    if (mapInstance && source && activeId) {
        mapInstance.setFeatureState(
            {
                source,
                id: activeId,
            },
            {
                active: false,
            }
        );
    }
};

export const setActiveFeature = (
    mapInstance: Map | undefined | null,
    source: string | undefined | null,
    activeId: string | number | undefined | null
) => {
    if (mapInstance && source && activeId) {
        mapInstance.setFeatureState(
            {
                source,
                id: activeId,
            },
            {
                active: true,
            }
        );
    }
};
