<svelte:options immutable={true} />

<script lang="ts">
    import turfBbox from '@turf/bbox';
    import type { FilterSpecification, SourceSpecification } from 'maplibre-gl';
    import type { BBox, FeatureCollection } from 'geojson';
    import { debounce } from 'lodash';
    import type { ColorScale, DataBounds, Color } from '../../types';
    import MapRender from './MapRender.svelte';
    import { BLANK } from '../mapStyles';
    import {
        getDataBounds,
        mapKeyToColor,
        VOID_BOUNDS,
        computeTooltip,
        computeBaseLayer,
        computeMatchExpression,
    } from '../utils';
    import { DEFAULT_COLORS, DEFAULT_COLORSCALE } from '../constants';
    import type {
        ChoroplethDataValue,
        ChoroplethLayer,
        ChoroplethGeoJsonOptions,
        MapRenderTooltipFunction,
        MapLegend,
    } from '../types';

    export let data: { value: ChoroplethDataValue[] }; // values, and the key to match
    export let options: ChoroplethGeoJsonOptions; // contains the shapes to display & match

    let shapes: FeatureCollection;
    let colorScale: ColorScale;

    let aspectRatio: number | undefined;
    let renderTooltip: MapRenderTooltipFunction;
    let bbox: BBox | undefined;
    let activeShapes: string[] | undefined;
    let interactive: boolean;
    let legend: MapLegend | undefined;
    let attribution: string | undefined;
    let title: string | undefined;
    let subtitle: string | undefined;

    // Used to apply a chosen color for shapes without values (default: #cccccc)
    let emptyValueColor: Color;

    // Used to determine the shapes key
    const matchKey = 'key';

    const defaultInteractive = true;
    $: ({
        shapes,
        colorScale = DEFAULT_COLORSCALE,
        legend,
        aspectRatio,
        activeShapes,
        interactive = defaultInteractive,
        emptyValueColor = DEFAULT_COLORS.Default,
        bbox,
        attribution,
        title,
        subtitle,
    } = options);

    // Choropleth is always display over a blank map, for readability purposes
    const style = BLANK;
    let layer: ChoroplethLayer;
    let source: SourceSpecification;
    let dataBounds: DataBounds;

    function computeSourceLayerAndBboxes(
        newShapes: FeatureCollection,
        newColorScale: ColorScale,
        values: ChoroplethDataValue[] = []
    ) {
        let colors;
        let fillColor: string | (string | string[])[] | FilterSpecification = emptyValueColor;

        if (values.length > 0) {
            dataBounds = getDataBounds(values);
            colors = mapKeyToColor(values, dataBounds, newColorScale, emptyValueColor);
            fillColor = computeMatchExpression(colors, matchKey, emptyValueColor);
        }

        source = {
            type: 'geojson',
            data: newShapes,
        };

        layer = computeBaseLayer(fillColor, DEFAULT_COLORS.ShapeOutline);

        bbox = bbox || turfBbox(newShapes) || VOID_BOUNDS;
    }

    $: if (shapes) {
        computeSourceLayerAndBboxes(shapes, colorScale, data.value);
    }

    $: renderTooltip = debounce(
        (hoveredFeature) => computeTooltip(hoveredFeature, data.value, options, matchKey),
        10,
        { leading: true }
    );
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
        {matchKey}
        {attribution}
        {title}
        {subtitle}
    />
</div>

<style>
</style>
