import type {
    CircleLayerSpecification,
    DataDrivenPropertyValueSpecification,
    MapOptions,
    StyleSpecification,
} from 'maplibre-gl';

import type { Layer, PoiMapData, PoiMapOptions } from './types';
import { DEFAULT_BASEMAP_STYLE, DEFAULT_ASPECT_RATIO, DEFAULT_BBOX } from './constants';

export const getMapStyle = (style: PoiMapOptions['style']): MapOptions['style'] => {
    if (!style) return DEFAULT_BASEMAP_STYLE;
    if (typeof style === 'string') return style;
    return { ...DEFAULT_BASEMAP_STYLE, ...style };
};
export const getMapSources = (sources: PoiMapData['sources']): StyleSpecification['sources'] => {
    if (!sources) return DEFAULT_BASEMAP_STYLE.sources;
    return sources;
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
                // TODO: Better typing
                'circle-color': cirleColor as DataDrivenPropertyValueSpecification<string>,
            },
            filter: ['==', ['geometry-type'], 'Point'],
        };
    });
};

export const getMapOptions = (options: PoiMapOptions) => {
    const { aspectRatio = DEFAULT_ASPECT_RATIO, bbox = DEFAULT_BBOX, interactive = true } = options;
    return {
        aspectRatio,
        bbox,
        interactive,
    };
};
