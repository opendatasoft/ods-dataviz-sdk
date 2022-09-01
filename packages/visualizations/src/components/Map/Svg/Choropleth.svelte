<script lang="ts">
    import { geoEqualEarth } from 'd3-geo';
    import { colorShapes, LIGHT_GREY, DEFAULT_COLORSSCALE, EMPTY_GJ } from '../utils';
    import Map from './Map.svelte';

    import type { SvgChoroplethOptions, ChoroplethDataValue } from '../types';

    export let data: { value: ChoroplethDataValue[] };
    export let options: SvgChoroplethOptions;
    $: ({ geoJson, colorsScale = DEFAULT_COLORSSCALE, emptyValueColor = LIGHT_GREY } = options);

    $: coloredShapes =
        geoJson?.geoJson && geoJson.type === 'geojson'
            ? colorShapes(geoJson.geoJson, data.value, colorsScale, emptyValueColor)
            : EMPTY_GJ;
</script>

<Map
    projection={geoEqualEarth()}
    featureCollection={coloredShapes.geoJson}
    svgProps={{ fill: 'color' }}
    style="stroke: black; stroke-width: 0.1px; fill: none;"
/>

<style>
</style>
