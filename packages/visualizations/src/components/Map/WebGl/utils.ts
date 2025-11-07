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

const ACTIVE_BORDER_RATIO = 2;

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
            'circle-radius': [
                'case',
                ['boolean', ['feature-state', 'active'], false],
                ['*', circleRadius, ACTIVE_BORDER_RATIO],
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
        borderColor: layerBorderColor,
        opacity: layerOpacity,
        colorMatch,
        opacityMatch,
    } = layer;

    let fillColor: ExpressionSpecification | Color = layerColor;
    let fillOpacity: number | ExpressionSpecification | undefined = layerOpacity;
    let fillOutlineColor: ExpressionSpecification | Color | undefined = layerBorderColor;

    // Color by category
    if (colorMatch) {
        const { key, colors, borderColors } = colorMatch;

        // fill-color
        {
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

        // fill-outline-color (NEW)
        if (borderColors) {
            const matchExpr: ['match', ExpressionSpecification] = ['match', ['get', key]];
            const group: ExpressionInputType[] = [];
            Object.keys(borderColors).forEach((k) => {
                group.push(k, borderColors[k]);
            });
            group.push(layerBorderColor ?? DEFAULT_DARK_GREY);
            if (!isGroupByForMatchExpression(group)) {
                throw new Error('Not the expected type for complete match expression');
            }
            fillOutlineColor = [...matchExpr, ...group];
        }
    }

    // Opacity by category
    // (keeping as-is; it does not change on active now—only size layers do)
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
        filter: ['in', ['geometry-type'], ['literal', ['Polygon', 'MultiPolygon']]],
        type,
        paint: {
            'fill-color': fillColor,
            ...(fillOutlineColor && { 'fill-outline-color': fillOutlineColor }),
            ...(fillOpacity !== undefined && { 'fill-opacity': fillOpacity }),
        },
    };
};

const getMapFillOutlineStrokeLayer = (layer: FillLayer): LineLayerSpecification | null => {
    const { id, source, sourceLayer, borderWidth = 1.5, borderColor, colorMatch } = layer;

    // derive stroke color from borderColor or colorMatch.borderColors
    let strokeColor: ExpressionSpecification | Color | undefined = borderColor;
    if (colorMatch?.borderColors) {
        const { key, borderColors } = colorMatch;
        const matchExpr: ['match', ExpressionSpecification] = ['match', ['get', key]];
        const group: ExpressionInputType[] = [];
        Object.keys(borderColors).forEach((k) => {
            group.push(k, borderColors[k]);
        });
        group.push(borderColor ?? DEFAULT_DARK_GREY);
        if (!isGroupByForMatchExpression(group)) throw new Error('Bad match expression');
        strokeColor = [...matchExpr, ...group];
    }
    if (!strokeColor) return null;

    return {
        id: `${id}--outline`,
        type: 'line',
        source,
        ...(sourceLayer ? { 'source-layer': sourceLayer } : null),
        // same polygons, drawn as rings
        filter: ['in', ['geometry-type'], ['literal', ['Polygon', 'MultiPolygon']]],
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
            'line-color': strokeColor,
            // ONLY border grows on active:
            'line-width': [
                'case',
                ['boolean', ['feature-state', 'active'], false],
                ['*', borderWidth, ACTIVE_BORDER_RATIO],
                borderWidth,
            ],
        },
    };
};

const getMapLineLayers = (layer: LineLayer): [LineLayerSpecification, LineLayerSpecification?] => {
    const {
        id,
        source,
        sourceLayer,
        type,
        color: innerColor,
        width: innerW = 3,
        opacity: innerOp,
        colorMatch,
        widthMatch,
        opacityMatch,
        borderColor,
        borderWidth = 2.5, // thickness of casing outside inner line
    } = layer;

    // Build inner style (your existing match logic, shortened here)
    let lineColor: ExpressionSpecification | Color = innerColor;
    let lineWidth: number | ExpressionSpecification = innerW;
    let lineOpacity: number | ExpressionSpecification | undefined = innerOp;

    if (colorMatch) {
        const { key, colors } = colorMatch;
        const match: ['match', ExpressionSpecification] = ['match', ['get', key]];
        const group: ExpressionInputType[] = [];
        Object.keys(colors).forEach((k) => group.push(k, colors[k]));
        group.push(innerColor);
        if (!isGroupByForMatchExpression(group)) throw new Error('Bad match');
        lineColor = [...match, ...group];
    }
    if (widthMatch) {
        const { key, values } = widthMatch;
        const match: ['match', ExpressionSpecification] = ['match', ['get', key]];
        const group: ExpressionInputType[] = [];
        Object.keys(values).forEach((k) => group.push(k, values[k]));
        group.push(innerW);
        if (!isGroupByForMatchExpression(group)) throw new Error('Bad match');
        lineWidth = [...match, ...group];
    }
    if (opacityMatch) {
        const { key, values } = opacityMatch;
        const match: ['match', ExpressionSpecification] = ['match', ['get', key]];
        const group: ExpressionInputType[] = [];
        Object.keys(values).forEach((k) => group.push(k, values[k]));
        group.push(innerOp ?? 1);
        if (!isGroupByForMatchExpression(group)) throw new Error('Bad match');
        lineOpacity = [...match, ...group];
    }

    const base: LineLayerSpecification = {
        id,
        type,
        source,
        ...(sourceLayer ? { 'source-layer': sourceLayer } : null),
        filter: ['in', ['geometry-type'], ['literal', ['LineString', 'MultiLineString']]],
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
            'line-color': lineColor,
            'line-width': lineWidth, // fixed (no active bump here)
            ...(lineOpacity !== undefined && { 'line-opacity': lineOpacity }),
        },
    };

    // casing color
    let casingColor: ExpressionSpecification | Color | undefined = borderColor;
    if (colorMatch?.borderColors) {
        const { key, borderColors } = colorMatch;
        const match: ['match', ExpressionSpecification] = ['match', ['get', key]];
        const group: ExpressionInputType[] = [];
        Object.keys(borderColors).forEach((k) => group.push(k, borderColors[k]));
        group.push(borderColor ?? DEFAULT_DARK_GREY);
        if (!isGroupByForMatchExpression(group)) throw new Error('Bad match');
        casingColor = [...match, ...group];
    }
    if (!casingColor) return [base];

    const casing: LineLayerSpecification = {
        id: `${id}--casing`,
        type: 'line',
        source,
        ...(sourceLayer ? { 'source-layer': sourceLayer } : null),
        filter: base.filter,
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
            'line-color': casingColor,
            // ONLY the casing grows on active:
            // total casing width = inner width + extra
            'line-width': [
                '+',
                base.paint!['line-width'] as any,
                [
                    'case',
                    ['boolean', ['feature-state', 'active'], false],
                    ['*', borderWidth, ACTIVE_BORDER_RATIO], // bigger when active
                    borderWidth, // normal
                ],
            ],
        },
    };

    return [base, casing];
};

// Circle, symbol and fill layers are supported
export const getMapLayers = (layers?: Layer[]): LayerSpecification[] => {
    if (!layers) return [];
    const out: LayerSpecification[] = [];
    layers.forEach((layer) => {
        switch (layer.type) {
            case 'circle':
                out.push(getMapCircleLayer(layer));
                break;
            case 'symbol':
                out.push(getMapSymbolLayer(layer));
                break;
            case 'fill': {
                const fill = getMapFillLayer(layer);
                const stroke = getMapFillOutlineStrokeLayer(layer);
                // Ensure the casing/stroke sits under/over appropriately:
                // Usually: casing first, then fill, then labels.
                if (stroke) out.push(stroke);
                out.push(fill);
                break;
            }
            case 'line': {
                const [base, casing] = getMapLineLayers(layer);
                if (casing) out.push(casing); // add casing first (under)
                out.push(base);
                break;
            }
            default:
                throw new Error(`Unexpected layer type for layer: ${layer}`);
        }
    });
    return out;
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
