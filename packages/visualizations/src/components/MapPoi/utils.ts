import type {
    CircleLayerSpecification,
    ExpressionSpecification,
    MapOptions,
    StyleSpecification,
    ExpressionInputType,
} from 'maplibre-gl';

import { isGroupByForMatchExpression, type Color } from '../types';

import type {
    CenterZoomOptions,
    Layer,
    PoiMapData,
    PoiMapOptions,
    PopupsConfiguration,
} from './types';
import { DEFAULT_DARK_GREY, DEFAULT_BASEMAP_STYLE, DEFAULT_ASPECT_RATIO } from './constants';

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
        const {
            id,
            type,
            source,
            sourceLayer,
            circleRadius = 7,
            circleStrokeWidth = 1.5,
            colorMatch,
            color: layerColor,
            borderColor: layerBorderColor,
        } = layer;

        let circleColor: ExpressionSpecification | Color = layerColor;
        let circleBorderColor: ExpressionSpecification | Color | undefined = layerBorderColor;

        if (colorMatch) {
            const { key, colors, borderColors } = colorMatch;
            const matchExpression: ['match', ExpressionSpecification] = ['match', ['get', key]];
            const groupByColors: ExpressionInputType[] = [];
            Object.keys(colors).forEach((color) => {
                groupByColors.push(color, colors[color]);
            });
            groupByColors.push(layerColor);
            if (!isGroupByForMatchExpression(groupByColors)) {
                throw new Error('Not the expected type for complete match expression');
            }
            circleColor = [
                ...matchExpression,
                ...groupByColors,
            ];

            if (borderColors) {
                const matchBorderExpression: ['match', ExpressionSpecification] = [
                    'match',
                    ['get', key],
                ];
                const groupByBorderColors: ExpressionInputType[] = [];
                Object.keys(borderColors).forEach((borderColor) => {
                    groupByBorderColors.push(borderColor, borderColors[borderColor]);
                });
                groupByBorderColors.push(circleBorderColor || DEFAULT_DARK_GREY);
                if (!isGroupByForMatchExpression(groupByBorderColors)) {
                    throw new Error('Not the expected type for complete match expression');
                }
                circleBorderColor = [
                    ...matchBorderExpression,
                    ...groupByBorderColors,
                ];
            }
        }
        return {
            id,
            type,
            source,
            ...(sourceLayer ? { 'source-layer': sourceLayer } : undefined),
            paint: {
                'circle-radius': [
                    'case',
                    ['boolean', ['feature-state', 'popup-feature'], false],
                    circleRadius * 1.3,
                    circleRadius,
                ],
                ...(circleBorderColor && { 'circle-stroke-width': circleStrokeWidth }),
                'circle-color': circleColor,
                ...(circleBorderColor && { 'circle-stroke-color': circleBorderColor }),
            },
            filter: ['==', ['geometry-type'], 'Point'],
        };
    });
};

export const getPopupsConfiguration = (layers?: Layer[]): PopupsConfiguration => {
    const configuration: PopupsConfiguration = {};
    layers?.forEach(({ id, popup }) => {
        if (popup) {
            configuration[id] = popup;
        }
    });
    return configuration;
};

export const getMapOptions = (options: PoiMapOptions) => {
    const {
        aspectRatio = DEFAULT_ASPECT_RATIO,
        bbox,
        zoom,
        maxZoom,
        minZoom,
        center,
        interactive = true,
        title,
        subtitle,
        description,
        legend,
        sourceLink,
        transformRequest,
        cooperativeGestures,
    } = options;
    return {
        aspectRatio,
        bbox,
        zoom,
        minZoom,
        maxZoom,
        center,
        interactive,
        title,
        subtitle,
        description,
        legend,
        sourceLink,
        transformRequest,
        cooperativeGestures,
    };
};

/**
 * Generates a valid CenterZoomOptions object by combining optional zoom and center properties.
 *
 * @param {CenterZoomOptions} options - An object with optional zoom and center properties.
 * @returns A CenterZoomOptions object with valid zoom and center properties is defined.
 */
export const getCenterZoomOptions: (options: CenterZoomOptions) => CenterZoomOptions = ({
    zoom,
    center,
}) => ({
    ...(center ? { center } : null),
    ...(Number.isInteger(zoom) ? { zoom } : null),
});
