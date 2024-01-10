import type {
    CircleLayerSpecification,
    ExpressionSpecification,
    MapOptions,
    StyleSpecification,
    ExpressionInputType,
    SymbolLayerSpecification,
    FilterSpecification,
} from 'maplibre-gl';

import { isGroupByForMatchExpression, Color } from '../types';

import type {
    CenterZoomOptions,
    CircleLayer,
    LayerSpecification,
    Layer,
    PoiMapData,
    PoiMapOptions,
    PopupConfigurationByLayers,
    SymbolLayer,
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

const getBaseMapLayerConfiguration = (layer: Layer) => {
    const { id, source, sourceLayer } = layer;
    const filter: FilterSpecification = ['==', ['geometry-type'], 'Point'];
    return {
        id,
        source,
        ...(sourceLayer ? { 'source-layer': sourceLayer } : null),
        filter,
    };
};

const getMapCircleLayer = (layer: CircleLayer): CircleLayerSpecification => {
    const {
        type,
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
        circleColor = [...matchExpression, ...groupByColors];

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
            circleBorderColor = [...matchBorderExpression, ...groupByBorderColors];
        }
    }
    return {
        ...getBaseMapLayerConfiguration(layer),
        type,
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
    };
};

const getMapSymbolLayer = (layer: SymbolLayer): SymbolLayerSpecification => {
    const { type, iconImageId, iconImageMatch } = layer;

    let iconImage: Required<SymbolLayerSpecification>['layout']['icon-image'] = iconImageId;
    if (iconImageMatch) {
        const { key, imageIds } = iconImageMatch;
        const matchExpression: ['match', ExpressionSpecification] = ['match', ['get', key]];
        const groupByIconImages: ExpressionInputType[] = [];
        Object.keys(imageIds).forEach((value) => {
            groupByIconImages.push(value, imageIds[value]);
        });
        groupByIconImages.push(iconImageId);
        if (!isGroupByForMatchExpression(groupByIconImages)) {
            throw new Error('Not the expected type for complete match expression');
        }
        iconImage = [...matchExpression, ...groupByIconImages];
    }

    return {
        ...getBaseMapLayerConfiguration(layer),
        type,
        layout: {
            'icon-allow-overlap': true,
            'icon-image': iconImage,
        },
    };
};
// Only circle and symbol layers are supported
export const getMapLayers = (layers?: Layer[]): LayerSpecification[] => {
    if (!layers) return [];
    return layers.map((layer) => {
        switch (layer.type) {
            case 'circle':
                return getMapCircleLayer(layer);
            case 'symbol':
                return getMapSymbolLayer(layer);
            default:
                throw new Error(`Unexepected layer type for layer: ${layer}`);
        }
    });
};

export const getPopupConfigurationByLayers = (layers?: Layer[]): PopupConfigurationByLayers => {
    const configurationByLayers: PopupConfigurationByLayers = {};
    layers?.forEach(({ id, popup }) => {
        if (popup) {
            configurationByLayers[id] = popup;
        }
    });
    return configurationByLayers;
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
        images,
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
        images,
    };
};

/**
 * Generates a valid CenterZoomOptions object by combining optional zoom and center properties.
 *
 * @param options - An object with optional zoom and center properties.
 * @returns A CenterZoomOptions object with valid zoom and center properties is defined.
 */
export const getCenterZoomOptions: (options: CenterZoomOptions) => CenterZoomOptions = ({
    zoom,
    center,
}) => ({
    ...(center ? { center } : null),
    ...(Number.isInteger(zoom) ? { zoom } : null),
});
