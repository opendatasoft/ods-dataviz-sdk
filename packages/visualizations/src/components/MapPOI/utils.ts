
import type { BBox } from 'geojson';
import type {
    POIMapLayer,
    ComputeTooltipFunction,
    POIMapDataValue,
    POIMapTooltipFormatter,
    TooltipParams,
} from './types';
import { POIMapTooltipMatcherTypes } from './types';

export const computeBaseRoundMarkerLayer = (): POIMapLayer => ({
    type: 'circle',
    layout: {},
    paint: {
        'circle-radius': 6,
        'circle-color': '#B42222',
    },
    filter: ['==', '$type', 'Point']
});

// This is a default bound that will be extended
export const VOID_BOUNDS: BBox = [180, 90, -180, -90];

export const defaultTooltipFormat: POIMapTooltipFormatter = ({ value, label }) =>
    value ? `${label} &mdash; ${value}` : label;

export const computeTooltip: ComputeTooltipFunction = (
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

    const tooltipRawValues: TooltipParams = {
        value: matchedFeature?.y,
        label: tooltipLabel,
        key: hoveredFeature.properties?.[matchKey], // === matchedFeature.x
    };
    const format = options?.tooltip?.formatter;

    return format ? format(tooltipRawValues) : defaultTooltipFormat(tooltipRawValues);
};

