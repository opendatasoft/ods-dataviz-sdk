<script lang="ts">
    import { run } from 'svelte/legacy';

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

    interface Props {
        data: $$Props['data']; // values, and the key to match
        options: $$Props['options']; // contains the shapes to display & match
    }

    let { data, options }: Props = $props();

    let shapesTiles: ChoroplethShapeVectorTilesValue = $state();
    let colorScale: ColorScale = $state();

    let aspectRatio: number | undefined = $state();
    let renderTooltip: MapRenderTooltipFunction = $derived(debounce(
        (hoveredFeature) => computeTooltip(hoveredFeature, data.value, options, matchKey),
        10,
        { leading: true }
    ));
    let bbox: BBox | undefined = $state();
    let activeShapes: string[] | undefined = $state();
    let interactive: boolean = $state();
    let legend: MapLegend | undefined = $state();
    let attribution: string | undefined = $state();
    let filter: MapFilter | undefined = $state();
    let filterExpression: ExpressionSpecification | undefined = $state();
    let title: string | undefined = $state();
    let subtitle: string | undefined = $state();
    let description: string | undefined = $state();
    let navigationMaps: NavigationMap[] | undefined = $state();
    // Data source link
    let sourceLink: Source | undefined = $state();
    let cooperativeGestures: boolean | GestureOptions | undefined = $state();
    let preserveDrawingBuffer: boolean = $state();
    let fixedMaxBounds: LngLatBoundsLike | undefined = $state();

    // Used to apply a chosen color for shapes without values (default: #cccccc)
    let emptyValueColor: Color = $state();

    // Used to determine the shapes key
    let matchKey: string = $state();

    run(() => {
        matchKey = shapesTiles.key;
    });

    const defaultInteractive = true;
    run(() => {
        ({
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
    });

    // Choropleth is always display over a blank map, for readability purposes
    const style = BLANK;
    let layer: ChoroplethLayer = $state();
    let source: SourceSpecification = $state();
    let dataBounds: DataBounds = $state();

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

    run(() => {
        if (shapesTiles.url) {
            computeSourceLayerAndBboxes(shapesTiles, colorScale, data.value);
        }
    });

    

    run(() => {
        if (filter) {
            filterExpression = computeFilterExpression(filter);
        }
    });
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
