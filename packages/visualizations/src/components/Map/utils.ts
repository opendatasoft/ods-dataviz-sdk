import chroma from 'chroma-js';
import turfBbox from '@turf/bbox';
import maplibregl, { ExpressionInputType, ExpressionSpecification } from 'maplibre-gl';
import type { Feature, FeatureCollection, BBox } from 'geojson';
import type { Scale } from 'chroma-js';
import { DEFAULT_COLORS } from './constants';
import { assertUnreachable } from '../utils';
import {
    Color,
    ColorScale,
    DataBounds,
    isGroupByForMatchExpression,
    ColorScaleTypes,
} from '../types';

import type {
    ChoroplethDataValue,
    ChoroplethFixedTooltipDescription,
    MapFilter,
    ChoroplethTooltipFormatter,
    MapRenderTooltipFunction,
    ComputeTooltipFunction,
    ChoroplethLayer,
} from './types';
import { ChoroplethTooltipMatcherTypes, TooltipParams } from './types';

export const LIGHT_GREY: Color = '#CBD2DB';
export const DARK_GREY: Color = '#515457';

export function getDataBounds(values: ChoroplethDataValue[]): DataBounds {
    const rawValues = values.map((v) => v.y);
    const min = Math.min(...rawValues);
    const max = Math.max(...rawValues);
    return { min, max };
}

export const colorShapes = ({
    featureCollection,
    colorMapping,
    emptyValueColor,
}: {
    featureCollection: FeatureCollection;
    colorMapping: { [key: string]: Color };
    emptyValueColor: Color;
}) => {
    const coloredFeatures = featureCollection.features.map((feature: Feature) => {
        const color = colorMapping[feature?.properties?.key] || emptyValueColor;
        return {
            ...feature,
            properties: {
                ...feature.properties,
                color,
            },
        };
    });
    const coloredShapes: FeatureCollection = {
        type: 'FeatureCollection',
        features: coloredFeatures,
    };
    return coloredShapes;
};

export const mapKeyToColor = (
    values: ChoroplethDataValue[],
    dataBounds: DataBounds,
    colorScale: ColorScale,
    emptyValueColor: Color = DEFAULT_COLORS.Default
): { [s: string]: string } => {
    const { min, max } = dataBounds;
    let colorMin: Color;
    let colorMax: Color;
    let scale: Scale;
    // This is an exhaustive check, function must handle all color scale types
    switch (colorScale.type) {
        case ColorScaleTypes.Palette: {
            const thresholdArray: number[] = [];
            colorScale.colors.forEach((_color: Color, i: number) => {
                if (i === 0) {
                    thresholdArray.push(min);
                    thresholdArray.push(min + (max - min) / colorScale.colors.length);
                } else if (i === colorScale.colors.length - 1) {
                    thresholdArray.push(max);
                } else {
                    thresholdArray.push(min + ((max - min) / colorScale.colors.length) * (i + 1));
                }
            });
            scale = chroma.scale(colorScale.colors).classes(thresholdArray);
            break;
        }
        case ColorScaleTypes.Gradient:
            colorMin = chroma(colorScale.colors.start).hex();
            colorMax = chroma(colorScale.colors.end).hex();
            scale = chroma.scale([colorMin, colorMax]).domain([min, max]);
            break;
        default: {
            // This function should never be reached because of the exhaustive check (will throw a compilation error)
            const exhaustiveCheck: never = colorScale;
            assertUnreachable(exhaustiveCheck);
        }
    }

    const dataMapping: { [s: ChoroplethDataValue['x']]: Color } = {};
    values.forEach(({ x, y }) => {
        dataMapping[x] = Number.isFinite(y) ? scale(y).hex() : emptyValueColor;
    });
    return dataMapping;
};

// This is a default bound that will be extended
export const VOID_BOUNDS: BBox = [180, 90, -180, -90];

const getShapeCenter = (feature: Feature) => {
    const featureBbox = turfBbox(feature.geometry);
    const centerLatitude = (featureBbox[1] + featureBbox[3]) / 2;
    const centerLongitude = (featureBbox[0] + featureBbox[2]) / 2;
    return [centerLongitude, centerLatitude];
};

export const getFixedTooltips = (
    shapeKeys: string[],
    features: Feature[],
    renderTooltip: MapRenderTooltipFunction,
    matchKey: string
): ChoroplethFixedTooltipDescription[] => {
    const popups = shapeKeys.map((shapeKey) => {
        const matchedFeature = features.find(
            (feature) => feature.properties?.[matchKey] === shapeKey
        );
        if (matchedFeature) {
            const center = getShapeCenter(matchedFeature);
            const description = renderTooltip(matchedFeature);
            // Cancel the debounce on activeShapes
            renderTooltip.cancel();
            const popup = new maplibregl.Popup({
                closeOnClick: false,
                closeButton: false,
                className: 'tooltip-on-hover',
            });
            return { center, description, popup };
        }
        return null;
    });

    return popups.filter((item): item is NonNullable<ChoroplethFixedTooltipDescription> =>
        Boolean(item)
    ) as ChoroplethFixedTooltipDescription[];
};

/** Transform a filter object from the options into a Maplibre filter expression */
export const computeFilterExpression = (filterConfig: MapFilter): ExpressionSpecification => {
    const { key, value } = filterConfig;
    const filterMatchExpression: ExpressionSpecification = [
        'in',
        ['downcase', ['get', key]],
        ['literal', []],
    ];

    const matchingValues: string[] = Array.isArray(value)
        ? value.map((v) => v.toString().toLowerCase())
        : [value.toString().toLowerCase()];

    filterMatchExpression[2] = ['literal', matchingValues];
    return filterMatchExpression;
};

export const defaultTooltipFormat: ChoroplethTooltipFormatter = ({ value, label }) =>
    value ? `${label} &mdash; ${value}` : label;

export const computeTooltip: ComputeTooltipFunction = (
    hoveredFeature,
    dataValues,
    options,
    matchKey
) => {
    const values = dataValues || [];
    const matchedFeature = values.find(
        (item: ChoroplethDataValue) => String(item.x) === hoveredFeature.properties?.[matchKey]
    );

    let tooltipLabel = hoveredFeature.properties?.label || hoveredFeature.properties?.[matchKey];
    const labelMatcher = options?.tooltip?.labelMatcher;

    if (labelMatcher) {
        const { type } = labelMatcher;
        if (type === ChoroplethTooltipMatcherTypes.KeyProperty) {
            const { key } = labelMatcher;
            tooltipLabel = hoveredFeature.properties?.[key];
        } else if (type === ChoroplethTooltipMatcherTypes.KeyMap && matchedFeature) {
            const { mapping } = labelMatcher;
            tooltipLabel = mapping[matchedFeature?.x];
        }
    }

    const tooltipRawValues: TooltipParams = {
        value: matchedFeature?.y,
        label: tooltipLabel,
        key: hoveredFeature.properties?.[matchKey], // === matchedFeature.x
    };
    const format = options?.tooltip?.formatter;

    return format ? format(tooltipRawValues) : defaultTooltipFormat(tooltipRawValues);
};

export const computeBaseLayer = (
    fillColor: string | ExpressionSpecification,
    DefaultColor: Color
): ChoroplethLayer => ({
    type: 'fill',
    layout: {},
    paint: {
        'fill-color': fillColor,
        'fill-opacity': 1,
        'fill-outline-color': DefaultColor,
    },
});

export const computeMatchExpression = (
    colors: { [s: string]: string },
    matchKey: string,
    emptyValueColor: Color
): ExpressionSpecification => {
    const matchExpression: ['match', ExpressionSpecification] = ['match', ['get', matchKey]];
    const groupByColors: ExpressionInputType[] = [];
    Object.entries(colors).forEach((e) => groupByColors.push(...e));
    groupByColors.push(emptyValueColor); // Default fallback color
    if (!isGroupByForMatchExpression(groupByColors)) {
        throw new Error('Not the expected type for complete match expression');
    }
    return [...matchExpression, ...groupByColors];
};
