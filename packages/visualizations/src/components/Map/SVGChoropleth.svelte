<script lang="ts">
    import { geoEqualEarth, geoPath } from 'd3-geo';

    import type { SvgChoroplethOptions } from './types';

    // export let data;
    export let options: SvgChoroplethOptions;
    $: ({ geoJson, emptyValueColor } = options);

    let width: number = 0;
    let height: number = 0;
    let paths: string[];

    $: projection = geoEqualEarth().fitSize([height, width], geoJson.geoJson);
    $: makePath = geoPath(projection);
    $: paths =
        geoJson?.geoJson?.features.map((f) => {
            return makePath(f);
        }) || [];
</script>

<div class="container" bind:clientWidth={width} bind:clientHeight={height}>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        height={height}
        width={width}
        viewBox={`0 0 ${height} ${width}`}
        style="stroke: black; stroke-width: 0.1px; fill: none;"
    >
        {#each paths as path}
            <path d={path} />
        {/each}
    </svg>
</div>

<style>
    .container {
        width: 100%;
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
    }
</style>
