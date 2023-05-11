<script lang="ts">
    import { geoMercator } from 'd3-geo';
    import { mapKeyToColor, getDataBounds, colorShapes } from '../utils';
    import { DEFAULT_COLORSCALE, DEFAULT_COLORS, EMPTY_FC } from '../constants';
    import Map from './Map.svelte';

    import type { ChoroplethGeoJsonOptions, ChoroplethDataValue } from '../types';

    export let data: { value: ChoroplethDataValue[] };
    export let options: ChoroplethGeoJsonOptions;

    $: ({
        shapes,
        colorScale = DEFAULT_COLORSCALE,
        emptyValueColor = DEFAULT_COLORS.Default,
    } = options);
    $: colorMapping = mapKeyToColor(
        data.value,
        getDataBounds(data.value),
        colorScale,
        emptyValueColor
    );
    $: coloredShapes = shapes
        ? colorShapes({
              featureCollection: shapes,
              colorMapping,
              emptyValueColor,
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
