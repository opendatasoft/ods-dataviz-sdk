<svelte:options immutable={true} />

<script lang="ts">
    import turfBbox from '@turf/bbox';
    import type { SourceSpecification } from 'maplibre-gl';
    import type { BBox } from 'geojson';
    import { debounce } from 'lodash';
    import type { ColorScale, DataBounds, Color } from '../../types';
    import MapRender from './MapRender.svelte';
    import { BLANK } from '../mapStyles';
    import {
        getDataBounds,
        mapKeyToColor,
        VOID_BOUNDS,
        computeFilterExpression,
        computeTooltip,
        computeBaseLayer,
        computeMatchExpression,
    } from '../utils';
    import { DEFAULT_COLORS, DEFAULT_COLORS_SCALE } from '../constants';
    import type {
        ChoroplethDataValue,
        ChoroplethLayer,
        ChoroplethGeoJsonOptions,
        MapRenderTooltipFunction,
        ChoroplethShapeGeoJsonValue,
        MapLegend,
        MapFilter,
    } from '../types';

    export let data: { value: ChoroplethDataValue[] }; // values, and the key to match
    export let options: ChoroplethGeoJsonOptions; // contains the shapes to display & match

    let shapes: ChoroplethShapeGeoJsonValue;
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
    const matchKey = 'key';

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
        newShapes: ChoroplethShapeGeoJsonValue,
        newColorScale: ColorScale,
        values: ChoroplethDataValue[] = []
    ) {
        let colors;
        let fillColor: string | (string | string[])[] = emptyValueColor;

        if (values.length > 0) {
            dataBounds = getDataBounds(values);
            colors = mapKeyToColor(values, dataBounds, newColorScale, emptyValueColor);
            fillColor = computeMatchExpression(colors, matchKey, emptyValueColor);
        }

        source = {
            type: 'geojson',
            data: newShapes.geoJson,
        };

        layer = computeBaseLayer(fillColor, DEFAULT_COLORS.ShapeOutline);

        bbox = bbox || turfBbox(newShapes.geoJson) || VOID_BOUNDS;
    }

    $: if (shapes.geoJson) {
        computeSourceLayerAndBboxes(shapes, colorScale, data.value);
    }

    $: renderTooltip = debounce(
        (hoveredFeature) => computeTooltip(hoveredFeature, data.value, options, matchKey),
        10,
        { leading: true }
    );

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
