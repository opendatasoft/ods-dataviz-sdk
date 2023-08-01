import type {
    CircleLayerSpecification,
    StyleSpecification,
    DataDrivenPropertyValueSpecification,
} from 'maplibre-gl';

import type { Layer, PoiMapOptions } from './types';
import { DEFAULT_ASPECT_RATIO, DEFAULT_BBOX } from './constants';

export const getJsonStyle = (style?: string): Promise<StyleSpecification | undefined> =>
    new Promise((resolve) => {
        if (!style) {
            resolve(undefined);
            return;
        }

        fetch(style)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch style.`);
                }
                return response.json();
            })
            .then((json) => resolve(json))
            .catch(() => {
                throw new Error(`Failed to parse fetched style`);
            });
    });

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
    const {
        aspectRatio = DEFAULT_ASPECT_RATIO,
        bbox = DEFAULT_BBOX,
        interactive = true,
        layers,
        ...rest
    } = options;

    return {
        ...rest,
        aspectRatio,
        bbox,
        interactive,
    };
};
