import type {
    CircleLayerSpecification,
    ExpressionSpecification,
    MapOptions as MapLibreMapOptions,
    StyleSpecification,
    ExpressionInputType,
    SymbolLayerSpecification,
    FillLayerSpecification,
    LineLayerSpecification,
} from 'maplibre-gl';

import { isGroupByForMatchExpression, Color } from 'types';

import type {
    CircleLayer,
    LayerSpecification,
    Layer,
    WebGlMapData,
    WebGlMapOptions,
    PopupConfigurationByLayers,
    SymbolLayer,
    CenterZoomOptions,
    FillLayer,
    LineLayer,
} from './types';
import { DEFAULT_DARK_GREY, DEFAULT_BASEMAP_STYLE, DEFAULT_SORT_KEY_VALUE } from './constants';

export const getMapStyle = (style: WebGlMapOptions['style']): MapLibreMapOptions['style'] => {
    if (!style) return DEFAULT_BASEMAP_STYLE;
    if (typeof style === 'string') return style;
    return { ...DEFAULT_BASEMAP_STYLE, ...style };
};
export const getMapSources = (sources: WebGlMapData['sources']): StyleSpecification['sources'] => {
    if (!sources) return DEFAULT_BASEMAP_STYLE.sources;
    return sources;
};

const getBaseMapLayerConfiguration = (layer: Layer) => {
    const { id, source, sourceLayer } = layer;
    return {
        id,
        source,
        ...(sourceLayer ? { 'source-layer': sourceLayer } : null),
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
        filter: ['==', ['geometry-type'], 'Point'],
        type,
        paint: {
            'circle-radius': circleRadius,
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
        filter: ['==', ['geometry-type'], 'Point'],
        type,
        layout: {
            'icon-size': 1,
            'icon-allow-overlap': true,
            'icon-image': iconImage,
            'symbol-sort-key': DEFAULT_SORT_KEY_VALUE,
        },
    };
};

const getMapFillLayer = (layer: FillLayer): FillLayerSpecification => {
    const {
        type,
        color: layerColor,
        borderColor,
        opacity: layerOpacity,
        colorMatch,
        opacityMatch,
    } = layer;

    // Fallbacks
    let fillColor: ExpressionSpecification | Color = layerColor;
    let fillOpacity: number | ExpressionSpecification | undefined = layerOpacity;

    // Color by category
    if (colorMatch) {
        const { key, colors } = colorMatch;
        const matchExpr: ['match', ExpressionSpecification] = ['match', ['get', key]];
        const group: ExpressionInputType[] = [];
        Object.keys(colors).forEach((k) => {
            group.push(k, colors[k]);
        });
        group.push(layerColor);
        if (!isGroupByForMatchExpression(group)) {
            throw new Error('Not the expected type for complete match expression');
        }
        fillColor = [...matchExpr, ...group];
    }

    // Opacity by category
    if (opacityMatch) {
        const { key, values } = opacityMatch;
        const matchExpr: ['match', ExpressionSpecification] = ['match', ['get', key]];
        const group: ExpressionInputType[] = [];
        Object.keys(values).forEach((k) => {
            group.push(k, values[k]);
        });
        group.push(layerOpacity ?? 0.5);
        if (!isGroupByForMatchExpression(group)) {
            throw new Error('Not the expected type for complete match expression');
        }
        fillOpacity = [...matchExpr, ...group];
    }

    return {
        ...getBaseMapLayerConfiguration(layer),
        // Polygon & MultiPolygon
        filter: ['in', ['geometry-type'], ['literal', ['Polygon', 'MultiPolygon']]],
        type,
        paint: {
            'fill-color': fillColor,
            ...(borderColor && { 'fill-outline-color': borderColor }),
            ...(fillOpacity !== undefined && { 'fill-opacity': fillOpacity }),
        },
    };
};

const getMapLineLayer = (layer: LineLayer): LineLayerSpecification => {
    const {
        type,
        color: layerColor,
        width: layerWidth,
        opacity: layerOpacity,
        colorMatch,
        widthMatch,
        opacityMatch,
    } = layer;

    // Fallbacks
    let lineColor: ExpressionSpecification | Color = layerColor;
    let lineWidth: number | ExpressionSpecification | undefined = layerWidth;
    let lineOpacity: number | ExpressionSpecification | undefined = layerOpacity;

    // Color by category
    if (colorMatch) {
        const { key, colors } = colorMatch;
        const matchExpr: ['match', ExpressionSpecification] = ['match', ['get', key]];
        const group: ExpressionInputType[] = [];
        Object.keys(colors).forEach((k) => {
            group.push(k, colors[k]);
        });
        group.push(layerColor);
        if (!isGroupByForMatchExpression(group)) {
            throw new Error('Not the expected type for complete match expression');
        }
        lineColor = [...matchExpr, ...group];
    }

    // Width by category
    if (widthMatch) {
        const { key, values } = widthMatch;
        const matchExpr: ['match', ExpressionSpecification] = ['match', ['get', key]];
        const group: ExpressionInputType[] = [];
        Object.keys(values).forEach((k) => {
            group.push(k, values[k]);
        });
        group.push(layerWidth ?? 3);
        if (!isGroupByForMatchExpression(group)) {
            throw new Error('Not the expected type for complete match expression');
        }
        lineWidth = [...matchExpr, ...group];
    }

    // Opacity by category
    if (opacityMatch) {
        const { key, values } = opacityMatch;
        const matchExpr: ['match', ExpressionSpecification] = ['match', ['get', key]];
        const group: ExpressionInputType[] = [];
        Object.keys(values).forEach((k) => {
            group.push(k, values[k]);
        });
        group.push(layerOpacity ?? 0.5);
        if (!isGroupByForMatchExpression(group)) {
            throw new Error('Not the expected type for complete match expression');
        }
        lineOpacity = [...matchExpr, ...group];
    }

    return {
        ...getBaseMapLayerConfiguration(layer),
        // LineString & MultiLineString
        filter: ['in', ['geometry-type'], ['literal', ['LineString', 'MultiLineString']]],
        type,
        paint: {
            'line-color': lineColor,
            ...(lineWidth !== undefined && { 'line-width': lineWidth }),
            ...(lineOpacity !== undefined && { 'line-opacity': lineOpacity }),
        },
    };
};
// Circle, symbol, fill and line layers are supported
export const getMapLayers = (layers?: Layer[]): LayerSpecification[] => {
    if (!layers) return [];
    return layers.map((layer) => {
        switch (layer.type) {
            case 'circle':
                return getMapCircleLayer(layer);
            case 'symbol':
                return getMapSymbolLayer(layer);
            case 'fill':
                return getMapFillLayer(layer);
            case 'line':
                return getMapLineLayer(layer);
            default:
                throw new Error(`Unexpected layer type for layer: ${layer}`);
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

export const getMapOptions = (options: WebGlMapOptions) => {
    const {
        bbox,
        zoom,
        maxZoom,
        minZoom,
        center,
        interactive = true,
        transformRequest,
        cooperativeGestures,
        preserveDrawingBuffer = false,
        images,
    } = options;
    return {
        bbox,
        zoom,
        minZoom,
        maxZoom,
        center,
        interactive,
        transformRequest,
        cooperativeGestures,
        preserveDrawingBuffer,
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
