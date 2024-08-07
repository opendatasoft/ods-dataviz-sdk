<script lang="ts">
    import type {
        SourceSpecification,
        GestureOptions,
        ExpressionSpecification,
        LngLatBoundsLike,
    } from 'maplibre-gl';
    import type { BBox } from 'geojson';
    import { debounce } from 'lodash';
    import type { ColorScale, Color, DataBounds, Source } from 'types';
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
    import { DEFAULT_COLORS, DEFAULT_COLORSCALE } from '../constants';
    import type {
        ChoroplethVectorTilesProps,
        ChoroplethDataValue,
        ChoroplethLayer,
        ChoroplethShapeVectorTilesValue,
        MapLegend,
        MapFilter,
        MapRenderTooltipFunction,
        NavigationMap,
    } from '../types';

    // ensure exported type matches declared props
    type $$Props = ChoroplethVectorTilesProps;

    export let data: $$Props['data']; // values, and the key to match
    export let options: $$Props['options']; // contains the shapes to display & match

    let shapesTiles: ChoroplethShapeVectorTilesValue;
    let colorScale: ColorScale;

    let aspectRatio: number | undefined;
    let renderTooltip: MapRenderTooltipFunction;
    let bbox: BBox | undefined;
    let activeShapes: string[] | undefined;
    let interactive: boolean;
    let legend: MapLegend | undefined;
    let attribution: string | undefined;
    let filter: MapFilter | undefined;
    let filterExpression: ExpressionSpecification | undefined;
    let title: string | undefined;
    let subtitle: string | undefined;
    let description: string | undefined;
    let navigationMaps: NavigationMap[] | undefined;
    // Data source link
    let sourceLink: Source | undefined;
    let cooperativeGestures: boolean | GestureOptions | undefined;
    let preserveDrawingBuffer: boolean;
    let fixedMaxBounds: LngLatBoundsLike | undefined;

    // Used to apply a chosen color for shapes without values (default: #cccccc)
    let emptyValueColor: Color;

    // Used to determine the shapes key
    let matchKey: string;

    $: matchKey = shapesTiles.key;

    const defaultInteractive = true;
    $: ({
        shapesTiles,
        colorScale = DEFAULT_COLORSCALE,
        legend,
        aspectRatio,
        activeShapes,
        interactive = defaultInteractive,
        emptyValueColor = DEFAULT_COLORS.Default,
        bbox = VOID_BOUNDS,
        filter,
        attribution,
        title,
        subtitle,
        description,
        navigationMaps,
        sourceLink,
        cooperativeGestures,
        preserveDrawingBuffer = false,
        fixedMaxBounds,
    } = options);

    // Choropleth is always display over a blank map, for readability purposes
    const style = BLANK;
    let layer: ChoroplethLayer;
    let source: SourceSpecification;
    let dataBounds: DataBounds;

    // MapLibre default zoom
    const MIN_ZOOM = 0;
    const MAX_ZOOM = 22;

    function computeSourceLayerAndBboxes(
        newShapes: ChoroplethShapeVectorTilesValue,
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

        const baseLayer = computeBaseLayer(fillColor, DEFAULT_COLORS.ShapeOutline);

        source = {
            type: 'vector',
            tiles: [newShapes.url],
            minzoom: newShapes.minZoom || MIN_ZOOM,
            maxzoom: newShapes.maxZoom || MAX_ZOOM,
        };

        layer = {
            ...baseLayer,
            'source-layer': newShapes.layer,
        };
    }

    $: if (shapesTiles.url) {
        computeSourceLayerAndBboxes(shapesTiles, colorScale, data.value);
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
    {attribution}
    {title}
    {subtitle}
    {description}
    {navigationMaps}
    {data}
    {sourceLink}
    {cooperativeGestures}
    {preserveDrawingBuffer}
    {fixedMaxBounds}
/>

<style>
</style>
