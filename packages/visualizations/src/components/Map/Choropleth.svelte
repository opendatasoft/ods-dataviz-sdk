<svelte:options immutable={true} />

<script lang="ts">
    import turfBbox from '@turf/bbox';
    import type { SourceSpecification } from 'maplibre-gl';
    import type { BBox } from 'geojson';
    import type { ColorScales, DataBounds, Color } from '../types';
    import MapRender from './MapRender.svelte';
    import { BLANK } from './mapStyles';
    import { getDataBounds, mapKeyToColor, isVectorTile } from './utils';
    import { DEFAULT_COLORS, DEFAULT_COLORS_SCALE } from './constants';
    import type {
        ChoroplethDataValue,
        ChoroplethLayer,
        ChoroplethOptions,
        MapRenderTooltipFunction,
        ChoroplethShapeValue,
        ChoroplethTooltipFormatter,
        MapLegend,
    } from './types';

    export let data: { value: ChoroplethDataValue[] }; // values, and the key to match
    export let options: ChoroplethOptions; // contains the shapes to display & match

    let shapes: ChoroplethShapeValue;
    let colorsScale: ColorScales;

    let aspectRatio: number;
    let renderTooltip: MapRenderTooltipFunction;
    let bbox: BBox | undefined;
    let fixedBbox: BBox | undefined;
    let activeShapes: string[] | undefined;
    let interactive: boolean;
    let legend: MapLegend | undefined;
    let filter: (string|number)[] | undefined;
    let filterExpression: (string|string[])[] | undefined;

    // Used to apply a chosen color for shapes without values (default: #cccccc)
    let emptyValueColor: Color;

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
    } = options);

    // Choropleth is always display over a blank map, for readability purposes
    const style = BLANK;
    let layer: ChoroplethLayer;
    let source: SourceSpecification;
    let dataBounds: DataBounds;

    function computeSourceLayerAndBboxes(
        values: ChoroplethDataValue[] = [],
        newShapes: ChoroplethShapeValue,
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
        if (filter) {
            values = values.filter(value => filter?.includes(value.x))
        };
        dataBounds = getDataBounds(values);
        const colors = mapKeyToColor(values, dataBounds, newColorScales, emptyValueColor);

        if (newShapes.type === 'geojson' && newShapes.geoJson) {
            // Iterate shapes, compute color from matching value
            const coloredFeatures = newShapes.geoJson.features.map((feature) => ({
                ...feature,
                properties: {
                    ...feature.properties,
                    color: colors[feature.properties?.key] || emptyValueColor,
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

            bbox = fixedBbox ? fixedBbox : turfBbox(newShapes.geoJson);
        } else if (newShapes.type === 'vtiles') {
            source = {
                type: 'vector',
                tiles: [newShapes.url],
            };

            const matchExpression = ['match', ['get', newShapes.key]];

            Object.entries(colors).forEach((e) => matchExpression.push(...e));
            matchExpression.push(emptyValueColor); // Default fallback color

            bbox = fixedBbox;

            layer = {
                type: 'fill',
                'source-layer': newShapes.sourceLayer,
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

    $: renderTooltip = (hoveredFeature) => {
        const key = isVectorTile(shapes) ? shapes.key : 'key';
        const values = data.value || [];
        const matchedFeature = values.find(
            (item) => String(item.x) === hoveredFeature.properties?.[key]
        );

        const tooltipRawValues: { value?: number; label: string; key: string } = {
            value: matchedFeature?.y,
            label: hoveredFeature.properties?.label || hoveredFeature.properties?.[key],
            key: hoveredFeature.properties?.[key], // === matchedFeature.x
        };
        const format = options?.tooltip?.label;

        return format ? format(tooltipRawValues) : defaultFormat(tooltipRawValues);
    };

    function computeFilterExpression(filterArray: (string | number)[]) {
        const key = isVectorTile(shapes) ? shapes.key : 'key';
        const filterMatchExpression: (string | string[])[] = ['all'];
        const filterArgument: string[] = ['in', key];
        filterArray.forEach((value) => {
            filterArgument.push(value.toString())
        });
        filterMatchExpression.push(filterArgument);
        return filterMatchExpression;

    };

    $: if (filter) {filterExpression = computeFilterExpression(filter)}

    // $: const filterToMapRender = computeFilterExpression(filter);
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
    />
</div>

<style>
</style>
