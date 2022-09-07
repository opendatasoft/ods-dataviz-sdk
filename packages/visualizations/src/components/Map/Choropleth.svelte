<svelte:options immutable={true} />

<script lang="ts">
    import turfBbox from '@turf/bbox';
    import { debounce } from 'lodash';
    import type { SourceSpecification } from 'maplibre-gl';
    import type { BBox } from 'geojson';
    import type { ColorScales, DataBounds, Color } from '../types';
    import MapRender from './MapRender.svelte';
    import { BLANK } from './mapStyles';
    import { getDataBounds, mapKeyToColor, isVectorTile, VOID_BOUNDS } from './utils';
    import { DEFAULT_COLORS, DEFAULT_COLORS_SCALE } from './constants';
    import type {
        ChoroplethDataValue,
        ChoroplethLayer,
        ChoroplethOptions,
        MapRenderTooltipFunction,
        ChoroplethShapeValues,
        ChoroplethTooltipFormatter,
        MapLegend,
    } from './types';

    export let data: { value: ChoroplethDataValue[] }; // values, and the key to match
    export let options: ChoroplethOptions; // contains the shapes to display & match

    let shapes: ChoroplethShapeValues;
    let colorsScale: ColorScales;

    let aspectRatio: number;
    let renderTooltip: MapRenderTooltipFunction;
    let bbox: BBox | undefined;
    let fixedBbox: BBox | undefined;
    let activeShapes: string[] | undefined;
    let interactive: boolean;
    let legend: MapLegend | undefined;
    let filter: (string | number)[] | undefined;
    let filterExpression: (string | string[])[] | undefined;

    /** Boolean to use label from data instead of label from features, default is false */
    let useLabelFromData: boolean;

    // Used to apply a chosen color for shapes without values (default: #cccccc)
    let emptyValueColor: Color;

    // Used to determine the shapes key
    let matchKey: string;
    // Used to determine the shapes label
    let matchLabel: string = 'label';

    const defaultInteractive = true;
    $: ({
        shapes,
        colorsScale = DEFAULT_COLORS_SCALE,
        legend,
        aspectRatio,
        activeShapes,
        interactive = defaultInteractive,
        emptyValueColor = DEFAULT_COLORS.Default,
        fixedBbox,
        filter,
        useLabelFromData = false,
    } = options);

    // Choropleth is always display over a blank map, for readability purposes
    const style = BLANK;
    let layer: ChoroplethLayer;
    let source: SourceSpecification;
    let dataBounds: DataBounds;

    function computeSourceLayerAndBboxes(
        values: ChoroplethDataValue[] = [],
        newShapes: ChoroplethShapeValues,
        newColorScales: ColorScales
    ) {
        if (
            (newShapes.type === 'geojson' && !newShapes.geoJson) ||
            (newShapes.type === 'vtiles' && !newShapes.url) ||
            !values
        ) {
            // We don't have everything we need yet
            return;
        }
        let filteredValues: ChoroplethDataValue[] = values;
        if (filter) {
            filteredValues = values.filter((value) => filter?.includes(value.x));
        }

        dataBounds = getDataBounds(filteredValues);
        const colors = mapKeyToColor(filteredValues, dataBounds, newColorScales, emptyValueColor);

        if (newShapes.type === 'geojson' && newShapes.geoJson) {
            // Iterate shapes, compute color from matching value
            const coloredFeatures = newShapes.geoJson.features.map((feature) => ({
                ...feature,
                properties: {
                    ...feature.properties,
                    color: colors[feature.properties?.key] || emptyValueColor,
                },
            }));

            source = {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: coloredFeatures,
                },
            };

            layer = {
                type: 'fill',
                layout: {},
                paint: {
                    'fill-color': ['get', 'color'],
                    'fill-opacity': 0.8,
                    'fill-outline-color': DEFAULT_COLORS.ShapeOutline,
                },
            };

            bbox = fixedBbox || turfBbox(newShapes.geoJson) || VOID_BOUNDS;
        } else if (newShapes.type === 'vtiles') {
            source = {
                type: 'vector',
                tiles: [newShapes.url],
            };

            const matchExpression = ['match', ['get', newShapes.key]];

            Object.entries(colors).forEach((e) => matchExpression.push(...e));
            matchExpression.push(emptyValueColor); // Default fallback color

            bbox = fixedBbox || VOID_BOUNDS;

            layer = {
                type: 'fill',
                'source-layer': newShapes.layer,
                layout: {},
                paint: {
                    'fill-color': matchExpression,
                    'fill-outline-color': DEFAULT_COLORS.ShapeOutline,
                    'fill-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                        1,
                        0.5,
                    ],
                },
            };
        }
    }

    $: computeSourceLayerAndBboxes(data.value, shapes, colorsScale);

    const defaultFormat: ChoroplethTooltipFormatter = ({ value, label }) =>
        value ? `${label} &mdash; ${value}` : label;

    $: matchKey = isVectorTile(shapes) ? shapes.key : 'key';

    $: renderTooltip = debounce(
        (hoveredFeature) => {
            const values = data.value || [];
            const matchedFeature = values.find(
                (item) => String(item.x) === hoveredFeature.properties?.[matchKey]
            );
            if (isVectorTile(shapes) && shapes.label) {
                matchLabel = shapes.label;
            }
            const tooltipRawValues: {
                value?: number;
                label: string;
                key: string;
            } = {
                value: matchedFeature?.y,
                label: useLabelFromData
                    ? matchedFeature?.label
                    : hoveredFeature.properties?.[matchLabel] ||
                      hoveredFeature.properties?.[matchKey],
                key: hoveredFeature.properties?.[matchKey], // === matchedFeature.x
            };
            const format = options?.tooltip?.labelFormatter;

            return format ? format(tooltipRawValues) : defaultFormat(tooltipRawValues);
        },
        10,
        { leading: true }
    );

    function computeFilterExpression(filterArray: (string | number)[]) {
        const filterMatchExpression: (string | string[])[] = ['all'];
        const filterArgument: string[] = ['in', matchKey];
        filterArray.forEach((value) => {
            filterArgument.push(value.toString());
        });
        filterMatchExpression.push(filterArgument);
        return filterMatchExpression;
    }

    $: if (filter) {
        filterExpression = computeFilterExpression(filter);
    }
</script>

<div>
    <MapRender
        {style}
        {source}
        {layer}
        {aspectRatio}
        {dataBounds}
        {colorsScale}
        {legend}
        {renderTooltip}
        {bbox}
        {activeShapes}
        {interactive}
        {filterExpression}
        {matchKey}
    />
</div>

<style>
</style>
