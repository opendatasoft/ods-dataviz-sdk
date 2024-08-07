<script lang="ts">
    import turfBbox from '@turf/bbox';
    import type { ExpressionSpecification, SourceSpecification, GestureOptions } from 'maplibre-gl';
    import type { BBox, FeatureCollection } from 'geojson';
    import { debounce } from 'lodash';
    import type { ColorScale, Color, DataBounds, Source } from 'types';
    import {
        getDataBounds,
        mapKeyToColor,
        VOID_BOUNDS,
        computeTooltip,
        computeBaseLayer,
        computeMatchExpression,
    } from '../utils';
    import { DEFAULT_COLORS, DEFAULT_COLORSCALE } from '../constants';
    import MapRender from './MapRender.svelte';
    import { BLANK } from '../mapStyles';
    import type {
        ChoroplethDataValue,
        ChoroplethLayer,
        MapRenderTooltipFunction,
        MapLegend,
        NavigationMap,
        ChoroplethGeoJsonProps,
    } from '../types';

    // ensure exported type matches declared props
    type $$Props = ChoroplethGeoJsonProps;

    export let data: $$Props['data']; // values, and the key to match
    export let options: $$Props['options']; // contains the shapes to display & match

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
    let description: string | undefined;
    let navigationMaps: NavigationMap[] | undefined;
    // Data source link
    let sourceLink: Source | undefined;
    let cooperativeGestures: boolean | GestureOptions | undefined;
    let preserveDrawingBuffer: boolean;

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
        description,
        navigationMaps,
        sourceLink,
        cooperativeGestures,
        preserveDrawingBuffer = false,
    } = options);

    // Choropleth is always display over a blank map, for readability purposes
    const style = BLANK;
    let layer: ChoroplethLayer;
    let source: SourceSpecification;
    let dataBounds: DataBounds;
    let renderedBbox = bbox || VOID_BOUNDS;

    function computeSourceLayerAndBboxes(
        newShapes: FeatureCollection,
        newColorScale: ColorScale,
        values: ChoroplethDataValue[] = []
    ) {
        let colors;
        let fillColor: string | ExpressionSpecification = emptyValueColor;

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

        renderedBbox = bbox || turfBbox(newShapes) || VOID_BOUNDS;
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
        bbox={renderedBbox}
        {activeShapes}
        {interactive}
        {matchKey}
        {attribution}
        {title}
        {subtitle}
        {description}
        {navigationMaps}
        {data}
        {sourceLink}
        {cooperativeGestures}
        {preserveDrawingBuffer}
    />
</div>

<style>
</style>
