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

    // Used to apply a chosen color for shapes without values (default: #cccccc)
    let emptyValueColor: Color;

    // Used to determine the shapes key
    let matchKey: string;

    $: matchKey = isVectorTile(shapes) ? shapes.key : 'key';

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
        newShapes: ChoroplethShapeValues,
        newColorScales: ColorScales
    ) {
        if (
            (newShapes.type === 'geojson' && !newShapes.geoJson) ||
            (newShapes.type === 'vtiles' && !newShapes.url)
        ) {
            // We don't have everything we need yet
            return;
        }

        let valuesToMatch: ChoroplethDataValue[] = values;
        let colors;
        let fillColor: string | (string | string[])[] = emptyValueColor;

        if (valuesToMatch.length !== 0) {
            if (filter) {
                valuesToMatch = values.filter((value) => filter?.includes(value.x));
            }
            dataBounds = getDataBounds(valuesToMatch);
            colors = mapKeyToColor(valuesToMatch, dataBounds, newColorScales, emptyValueColor);
            const matchExpression = ['match', ['get', matchKey]];
            Object.entries(colors).forEach((e) => matchExpression.push(...e));
            matchExpression.push(emptyValueColor); // Default fallback color
            fillColor = matchExpression;
        }

        if (newShapes.type === 'geojson' && newShapes.geoJson) {
            source = {
                type: 'geojson',
                data: newShapes.geoJson,
            };

            layer = {
                type: 'fill',
                layout: {},
                paint: {
                    'fill-color': fillColor,
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

            layer = {
                type: 'fill',
                'source-layer': newShapes.layer,
                layout: {},
                paint: {
                    'fill-color': fillColor,
                    'fill-outline-color': DEFAULT_COLORS.ShapeOutline,
                    'fill-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                        1,
                        0.5,
                    ],
                },
            };

            bbox = fixedBbox || VOID_BOUNDS;
        }
    }

    $: computeSourceLayerAndBboxes(data.value, shapes, colorsScale);

    const defaultFormat: ChoroplethTooltipFormatter = ({ value, label }) =>
        value ? `${label} &mdash; ${value}` : label;

    $: renderTooltip = debounce(
        (hoveredFeature) => {
            const values = data.value || [];
            const matchedFeature = values.find(
                (item) => String(item.x) === hoveredFeature.properties?.[matchKey]
            );

            let tooltipLabel =
                hoveredFeature.properties?.label || hoveredFeature.properties?.[matchKey];
            const labelMatcher = options?.tooltip?.labelMatcher;

            if (labelMatcher && matchedFeature) {
                const { type } = labelMatcher;
                if (type === 'keyProperty') {
                    const { key } = labelMatcher;
                    tooltipLabel = hoveredFeature.properties?.[key];
                } else if (type === 'keyMap') {
                    const { mapping } = labelMatcher;
                    tooltipLabel = mapping[matchedFeature?.x];
                }
            }

            const tooltipRawValues: {
                value?: number;
                label: string;
                key: string;
            } = {
                value: matchedFeature?.y,
                label: tooltipLabel,
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
