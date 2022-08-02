<svelte:options immutable={true} />

<script lang="ts">
    import turfBbox from '@turf/bbox';
    import type { SourceSpecification } from 'maplibre-gl';
    // eslint-disable-next-line import/no-unresolved
    import type { BBox, FeatureCollection } from 'geojson';
    import type { ColorsScale, DataBounds, Color } from '../types';
    import MapRender from './MapRender.svelte';
    import { BLANK } from './mapStyles';
    import { colorShapes, LIGHT_GREY, DARK_GREY } from './utils';
    import type {
        ChoroplethDataValue,
        ChoroplethLayer,
        ChoroplethOptions,
        ChoroplethRenderTooltipFunction,
        ChoroplethShapeValue,
        ChoroplethTooltipFormatter,
        MapLegend,
    } from './types';

    export let data: { value: ChoroplethDataValue[] }; // values, and the key to match
    export let options: ChoroplethOptions; // contains the shapes to display & match

    let shapes: ChoroplethShapeValue;
    let colorsScale: ColorsScale;

    const defaultColorsScale: ColorsScale = {
        type: 'gradient',
        colors: {
            start: LIGHT_GREY,
            end: DARK_GREY,
        },
    };

    const defaultEmptyValueColor = '#cccccc';

    let aspectRatio: number;
    let renderTooltip: ChoroplethRenderTooltipFunction;
    let bbox: BBox;
    let activeShapes: string[] | undefined;
    let interactive: boolean;
    let legend: MapLegend | undefined;

    // Used to apply a chosen color for shapes without values (default: #cccccc)
    let emptyValueColor: Color;

    const defaultInteractive = true;
    $: ({
        shapes,
        colorsScale = defaultColorsScale,
        legend,
        aspectRatio,
        activeShapes,
        interactive = defaultInteractive,
        emptyValueColor = defaultEmptyValueColor,
    } = options);

    // Choropleth is always display over a blank map, for readability purposes
    const style = BLANK;
    let layer: ChoroplethLayer;
    let source: SourceSpecification;
    let dataBounds: DataBounds;

    function computeSourceLayerAndBboxes(
        values: ChoroplethDataValue[] = [],
        newShapes: ChoroplethShapeValue,
        newColorScale: ColorsScale
    ) {
        if (newShapes.type === 'geojson' && !newShapes.geoJson) {
            // We don't have everything we need yet
            return;
        }

        if (newShapes.type === 'geojson') {
            const computeColors = colorShapes(
                newShapes.geoJson as FeatureCollection,
                values,
                newColorScale,
                emptyValueColor
            );
            const coloredShapes = computeColors.geoJson;
            dataBounds = computeColors.bounds;

            source = {
                type: 'geojson',
                data: coloredShapes,
            };

            layer = {
                type: 'fill',
                layout: {},
                paint: {
                    'fill-color': ['get', 'color'],
                    'fill-opacity': 0.8,
                    'fill-outline-color': '#fff',
                },
            };

            bbox = turfBbox(newShapes.geoJson);
        } else {
            // eslint-disable-next-line no-console
            console.error('Unknown shapes type', newShapes.type);
        }
    }

    $: computeSourceLayerAndBboxes(data.value, shapes, colorsScale);

    const defaultFormat: ChoroplethTooltipFormatter = ({ value, label }) =>
        value ? `${label} &mdash; ${value}` : label;

    $: renderTooltip = (hoveredFeature) => {
        const values = data.value || [];
        const matchedFeature = values.find(
            (item) => String(item.x) === hoveredFeature.properties?.key
        );

        const tooltipRawValues: { value?: number; label: string; key: string } = {
            value: matchedFeature?.y,
            label: hoveredFeature.properties?.label || hoveredFeature.properties?.key,
            key: hoveredFeature.properties?.key, // === matchedFeature.x
        };
        const format = options?.tooltip?.label;

        return format ? format(tooltipRawValues) : defaultFormat(tooltipRawValues);
    };
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
    />
</div>

<style>
</style>
