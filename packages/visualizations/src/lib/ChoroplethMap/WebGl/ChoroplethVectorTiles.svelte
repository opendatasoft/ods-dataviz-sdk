<script lang="ts">
    import type {
        SourceSpecification,
        MapGeoJSONFeature,
    } from 'maplibre-gl';
    import { debounce } from 'lodash-es';
    import type { DataBounds } from 'types';
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
        ChoroplethLayer,
        MapRenderTooltipFunction,
    } from '../types';

    const defaultInteractive = true;
    // MapLibre default zoom
    const MIN_ZOOM = 0;
    const MAX_ZOOM = 22;
    // Choropleth is always display over a blank map, for readability purposes
    const style = BLANK;

    let { data, options }: ChoroplethVectorTilesProps = $props();
    let {
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
        } = $derived(options);
    
    let renderTooltip: MapRenderTooltipFunction = $derived(debounce(
        (hoveredFeature: MapGeoJSONFeature) => computeTooltip(hoveredFeature, data.value, options, matchKey),
        10,
        { leading: true }
    ));

    let matchKey = $derived(shapesTiles.key);
    let colors = $derived(mapKeyToColor(data.value, getDataBounds(data.value), colorScale, emptyValueColor));
    let fillColor = $derived(computeMatchExpression(colors, matchKey, emptyValueColor))
    let baseLayer = $derived(computeBaseLayer(fillColor, DEFAULT_COLORS.ShapeOutline));

    let layer: ChoroplethLayer = $state({
        ...baseLayer,
        'source-layer': shapesTiles.layer,
    });
    let source: SourceSpecification = $state({
        type: 'vector',
        tiles: [shapesTiles.url],
        minzoom: shapesTiles.minZoom || MIN_ZOOM,
        maxzoom: shapesTiles.maxZoom || MAX_ZOOM,
    });
    let dataBounds: DataBounds = $state(getDataBounds(data.value));

    let filterExpression = $derived(filter && computeFilterExpression(filter));
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
