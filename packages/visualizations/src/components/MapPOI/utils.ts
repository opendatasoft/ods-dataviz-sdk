import type { BBox } from 'geojson';
import type {
    POIMapLayer,
    ComputeTooltipFunctionPOI,
    POIMapDataValue,
    POIMapTooltipFormatter,
    TooltipParamsPOI,
} from './types';
import { POIMapTooltipMatcherTypes } from './types';
import type { Color } from '../types';
import { DEFAULT_COLORS } from './constants';

export const computeBaseRoundMarkerLayer = (
    colors: Color[],
    matchValues: string[],
    matchKey: string,
    noMatchColor?: Color,
): POIMapLayer => {

    const matchExpression = ['match', ['get', matchKey]];
    matchValues.forEach((key, i) => {
        matchExpression.push(key);
        matchExpression.push(colors[i]);
    });
    matchExpression.push(noMatchColor || DEFAULT_COLORS.Blue); // Default fallback color

    return {
        type: 'circle',
        layout: {},
        paint: {
            'circle-radius': 6,
            'circle-color': matchExpression,
        },
        filter: ['==', ['geometry-type'], 'Point'],
    };
};

// This is a default bound that will be extended
export const VOID_BOUNDS: BBox = [180, 90, -180, -90];

export const defaultTooltipFormat: POIMapTooltipFormatter = ({ value, label }) =>
    value ? `${label} &mdash; ${value}` : label;

export const computeTooltip: ComputeTooltipFunctionPOI = (
    hoveredFeature,
    dataValues,
    options,
    matchKey
) => {
    const values = dataValues || [];
    const matchedFeature = values.find(
        (item: POIMapDataValue) => String(item.x) === hoveredFeature.properties?.[matchKey]
    );

    let tooltipLabel = hoveredFeature.properties?.label || hoveredFeature.properties?.[matchKey];
    const labelMatcher = options?.tooltip?.labelMatcher;

    if (labelMatcher) {
        const { type } = labelMatcher;
        if (type === POIMapTooltipMatcherTypes.KeyProperty) {
            const { key } = labelMatcher;
            tooltipLabel = hoveredFeature.properties?.[key];
        } else if (type === POIMapTooltipMatcherTypes.KeyMap && matchedFeature) {
            const { mapping } = labelMatcher;
            tooltipLabel = mapping[matchedFeature?.x];
        }
    }

    const tooltipRawValues: TooltipParamsPOI = {
        value: matchedFeature?.y,
        label: tooltipLabel,
        key: hoveredFeature.properties?.[matchKey], // === matchedFeature.x
    };
    const format = options?.tooltip?.formatter;

    return format ? format(tooltipRawValues) : defaultTooltipFormat(tooltipRawValues);
};
