import type { BBox } from 'geojson';
import type {
    POIMapLayer,
    ComputeTooltipFunctionPOI,
    POIMapDataValue,
    POIMapTooltipFormatter,
    TooltipParamsPOI,
    LayersParams,
} from './types';
import { POIMapTooltipMatcherTypes } from './types';
import type { Color } from '../types';

export const computeBaseRoundMarkerLayer = (
    color: Color,
    matchKey: string,
    matchProperty: string
): POIMapLayer => ({
    type: 'circle',
    layout: {},
    paint: {
        'circle-radius': 6,
        'circle-color': color,
    },
    filter: ['==', ['get', matchProperty], matchKey],
});

export const computeLayers = (layers: LayersParams[]): POIMapLayer[] | [] => {
    if (layers.length === 0) {
        return [];
    }
    return layers.map((layer) => {
        const { color, matchKey, matchProperty } = layer;
        return computeBaseRoundMarkerLayer(color, matchKey, matchProperty);
    });
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
