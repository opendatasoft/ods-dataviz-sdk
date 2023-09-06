import type {
    CircleLayerSpecification,
    DataDrivenPropertyValueSpecification,
    MapOptions,
    StyleSpecification,
} from 'maplibre-gl';

import type { Color } from '../types';

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
        let circleColor: DataDrivenPropertyValueSpecification<Color> | Color = layer.color;

        if (layer.colorMatch) {
            const { key, colors } = layer.colorMatch;
            const groupByColors = ['match', ['get', key]];
            Object.keys(colors).forEach((color) => {
                groupByColors.push(color, colors[color]);
            });
            groupByColors.push(layer.color);
            circleColor = groupByColors;
        }
        const { id, type, source, sourceLayer } = layer;
        return {
            id,
            type,
            source,
            ...(sourceLayer ? { 'source-layer': sourceLayer } : undefined),
            paint: {
                'circle-radius': 5,
                // TODO: Better typing
                'circle-color': circleColor,
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
        legend,
    } = options;
    return {
        aspectRatio,
        bbox,
        interactive,
        legend,
    };
};
