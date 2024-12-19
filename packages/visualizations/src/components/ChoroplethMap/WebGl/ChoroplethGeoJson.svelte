<script lang="ts">
    import { run } from 'svelte/legacy';

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

    interface Props {
        data: $$Props['data']; // values, and the key to match
        options: $$Props['options']; // contains the shapes to display & match
    }

    let { data, options }: Props = $props();

    let shapes: FeatureCollection = $state();
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
    let title: string | undefined = $state();
    let subtitle: string | undefined = $state();
    let description: string | undefined = $state();
    let navigationMaps: NavigationMap[] | undefined = $state();
    // Data source link
    let sourceLink: Source | undefined = $state();
    let cooperativeGestures: boolean | GestureOptions | undefined = $state();
    let preserveDrawingBuffer: boolean = $state();

    // Used to apply a chosen color for shapes without values (default: #cccccc)
    let emptyValueColor: Color = $state();

    // Used to determine the shapes key
    const matchKey = 'key';

    const defaultInteractive = true;
    run(() => {
        ({
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
    });

    // Choropleth is always display over a blank map, for readability purposes
    const style = BLANK;
    let layer: ChoroplethLayer = $state();
    let source: SourceSpecification = $state();
    let dataBounds: DataBounds = $state();
    let renderedBbox = $state(bbox || VOID_BOUNDS);

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

    run(() => {
        if (shapes) {
            computeSourceLayerAndBboxes(shapes, colorScale, data.value);
        }
    });

    
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
