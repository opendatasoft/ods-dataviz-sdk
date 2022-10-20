<script lang="ts">
    import { geoMercator } from 'd3-geo';
    import {
        mapKeyToColor,
        LIGHT_GREY,
        DEFAULT_COLORSCALE,
        EMPTY_FC,
        getDataBounds,
        colorShapes,
    } from '../utils';
    import Map from './Map.svelte';

    import type { ChoroplethGeoJsonOptions, ChoroplethDataValue } from '../types';

    export let data: { value: ChoroplethDataValue[] };
    export let options: ChoroplethGeoJsonOptions;

    $: ({ shapes, colorScale = DEFAULT_COLORSCALE, emptyValueColor = LIGHT_GREY } = options);
    $: colorMapping = mapKeyToColor(
        data.value,
        getDataBounds(data.value),
        colorScale,
        emptyValueColor
    );
    $: coloredShapes =
        shapes?.geoJson && shapes?.type === 'geojson'
            ? colorShapes({
                  featureCollection: shapes.geoJson,
                  colorMapping,
              })
            : EMPTY_FC;
</script>

<Map
    projection={geoMercator()}
    featureCollection={coloredShapes}
    svgProps={{ fill: 'color' }}
    style="stroke: black; stroke-width: 0.1px; fill: none;"
/>

<style>
</style>
