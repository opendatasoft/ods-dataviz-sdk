<svelte:options immutable={true} />

<script lang="ts">
    import turfBbox from '@turf/bbox';
    import { debounce } from 'lodash';
    import type { SourceSpecification } from 'maplibre-gl';
    import type { BBox } from 'geojson';
    import type { ColorScale, DataBounds, Color } from '../../types';
    import MapRender from './MapRender.svelte';
    import { BLANK } from '../mapStyles';
    import { getDataBounds, mapKeyToColor, isVectorTile, VOID_BOUNDS } from '../utils';
    import { DEFAULT_COLORS, DEFAULT_COLORS_SCALE } from '../constants';
    import { ChoroplethShapeTypes } from '../types';
    import type {
        ChoroplethDataValue,
        ChoroplethLayer,
        ChoroplethOptions,
        MapRenderTooltipFunction,
        ChoroplethShapeValues,
        ChoroplethTooltipFormatter,
        MapLegend,
        MapFilter,
    } from '../types';

    export let data: { value: ChoroplethDataValue[] }; // values, and the key to match
    export let options: ChoroplethOptions; // contains the shapes to display & match

    let shapes: ChoroplethShapeValues;
    let colorScale: ColorScale;

    let aspectRatio: number | undefined;
    let renderTooltip: MapRenderTooltipFunction;
    let bbox: BBox | undefined;
    let activeShapes: string[] | undefined;
    let interactive: boolean;
    let legend: MapLegend | undefined;
    let filter: MapFilter | undefined;
    let filterExpression: (string | string[])[] | undefined;

    // Used to apply a chosen color for shapes without values (default: #cccccc)
    let emptyValueColor: Color;

    // Used to determine the shapes key
    let matchKey: string;

    $: matchKey = isVectorTile(shapes) ? shapes.key : 'key';

    const defaultInteractive = true;
    $: ({
        shapes,
        colorScale = DEFAULT_COLORS_SCALE,
        legend,
        aspectRatio,
        activeShapes,
        interactive = defaultInteractive,
        emptyValueColor = DEFAULT_COLORS.Default,
        bbox,
        filter,
    } = options);

    // Choropleth is always display over a blank map, for readability purposes
    const style = BLANK;
    let layer: ChoroplethLayer;
    let source: SourceSpecification;
    let dataBounds: DataBounds;

    function computeSourceLayerAndBboxes(
        newShapes: ChoroplethShapeValues,
        newColorScale: ColorScale,
        values: ChoroplethDataValue[] = []
    ) {
        if (
            (newShapes.type === ChoroplethShapeTypes.GeoJson && !newShapes.geoJson) ||
            (newShapes.type === ChoroplethShapeTypes.VectorTiles && !newShapes.url)
        ) {
            // We don't have everything we need yet
            return;
        }

        let colors;
        let fillColor: string | (string | string[])[] = emptyValueColor;

        if (values.length > 0) {
            dataBounds = getDataBounds(values);
            colors = mapKeyToColor(values, dataBounds, newColorScale, emptyValueColor);
            const matchExpression = ['match', ['get', matchKey]];
            Object.entries(colors).forEach((e) => matchExpression.push(...e));
            matchExpression.push(emptyValueColor); // Default fallback color
            fillColor = matchExpression;
        }

        const baseLayer: ChoroplethLayer = {
            type: 'fill',
            layout: {},
            paint: {
                'fill-color': fillColor,
                'fill-opacity': 0.8,
                'fill-outline-color': DEFAULT_COLORS.ShapeOutline,
            },
        };

        if (newShapes.type === ChoroplethShapeTypes.GeoJson && newShapes.geoJson) {
            source = {
                type: 'geojson',
                data: newShapes.geoJson,
            };

            layer = baseLayer;

            bbox = bbox || turfBbox(newShapes.geoJson) || VOID_BOUNDS;
        } else if (newShapes.type === ChoroplethShapeTypes.VectorTiles) {
            source = {
                type: 'vector',
                tiles: [newShapes.url],
            };

            layer = {
                ...baseLayer,
                'source-layer': newShapes.layer,
            };

            bbox = bbox || VOID_BOUNDS;
        }
    }

    $: computeSourceLayerAndBboxes(shapes, colorScale, data.value);

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

    function computeFilterExpression(filterConfig: MapFilter) {
        /** Transform a filter object from the options into a Maplibre filter expression */
        const { key, value } = filterConfig;
        const filterMatchExpression: string[] = ['in', key];
        (Array.isArray(value) ? value : [value]).forEach((filterValue) => {
            filterMatchExpression.push(filterValue.toString());
        });
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
        {colorScale}
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
