import type {
    CircleLayerSpecification,
    StyleSpecification,
    DataDrivenPropertyValueSpecification,
} from 'maplibre-gl';

import type { Layer, PoiMapOptions } from './types';
import { DEFAULT_ASPECT_RATIO, DEFAULT_BBOX } from './constants';

export const getJsonStyle = async (style?: string) => {
    if (!style) return undefined;
    const response = await fetch(style);
    return (await response.json()) as StyleSpecification;
};

// TO DO: add tests to check that optional layers are at the end of the array
export const getMapStyle = (
    style: StyleSpecification | undefined,
    options: {
        sources?: StyleSpecification['sources'];
        layers?: StyleSpecification['layers'];
    }
): StyleSpecification | undefined => {
    if (!style) return undefined;
    const { sources, layers } = options;
    return {
        ...style,
        sources: { ...style.sources, ...sources },
        layers: [...style.layers, ...(layers || [])],
    };
};

// Only circle layers are supported
export const getMapLayers = (layers?: Layer[]): CircleLayerSpecification[] => {
    if (!layers) return [];

    return layers.map((layer) => {
        const { source, sourceLayer, type, color, groupBy } = layer;
        let cirleColor: unknown = color;

        if (groupBy) {
            const groupByColors = ['match', ['get', groupBy?.key]];
            Object.keys(groupBy.colorMap).forEach((key) => {
                groupByColors.push(key, groupBy.colorMap[key]);
            });
            groupByColors.push(color);
            cirleColor = groupByColors;
        }

        return {
            type,
            id: `${source}-${type}`,
            source,
            ...(sourceLayer ? { 'source-layer': sourceLayer } : undefined),
            paint: {
                'circle-radius': 5,
                'circle-color': cirleColor as DataDrivenPropertyValueSpecification<string>,
            },
            filter: ['==', ['geometry-type'], 'Point'],
        };
    });
};

export const getMapOptions = (options: PoiMapOptions) => {
    const { aspectRatio = DEFAULT_ASPECT_RATIO, bbox = DEFAULT_BBOX, interactive = true } = options;

    return {
        ...options,
        aspectRatio,
        bbox,
        interactive,
    };
};
