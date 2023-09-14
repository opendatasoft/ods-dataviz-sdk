import type {
    CircleLayerSpecification,
    DataDrivenPropertyValueSpecification,
    MapOptions,
    StyleSpecification,
} from 'maplibre-gl';

import type { Color } from '../types';

import type { Layer, PoiMapData, PoiMapOptions } from './types';
import { DEFAULT_BASEMAP_STYLE, DEFAULT_ASPECT_RATIO, DEFAULT_BBOX, DEFAULT_DARK_GREY } from './constants';

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
        // Border color is optionnal in map layers
        let circleBorderColor: DataDrivenPropertyValueSpecification<Color> | Color | undefined =
            layer?.borderColor;

        if (layer.colorMatch) {
            const { key, colors, borderColors } = layer.colorMatch;
            const groupByColors = ['match', ['get', key]];
            Object.keys(colors).forEach((color) => {
                groupByColors.push(color, colors[color]);
            });
            groupByColors.push(layer.color);
            circleColor = groupByColors;

            // Border colors are optionnal in the colorMatch props
            if (borderColors) {
                const groupBordersByColors = ['match', ['get', key]];
                Object.keys(borderColors).forEach((borderColor) => {
                    groupBordersByColors.push(borderColor, borderColors[borderColor]);
                });
                groupBordersByColors.push(circleBorderColor || DEFAULT_DARK_GREY);
                circleBorderColor = groupBordersByColors;
            }
        }
        const { id, type, source, sourceLayer } = layer;
        return {
            id,
            type,
            source,
            ...(sourceLayer ? { 'source-layer': sourceLayer } : undefined),
            paint: {
                'circle-radius': 5,
                ...(circleBorderColor && { 'circle-stroke-width': 1 }),
                'circle-color': circleColor,
                ...(circleBorderColor && { 'circle-stroke-color': circleBorderColor }),
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
        title,
        subtitle,
        description,
        legend,
        sourceLink,
    } = options;
    return {
        aspectRatio,
        bbox,
        interactive,
        title,
        subtitle,
        description,
        legend,
        sourceLink,
    };
};
