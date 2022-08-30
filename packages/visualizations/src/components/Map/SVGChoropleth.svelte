<script lang="ts">
    import { geoEqualEarth, geoPath } from 'd3-geo';
    import { colorShapes, LIGHT_GREY, DARK_GREY } from './utils';
    import type { SvgChoroplethOptions } from './types';

    export let data;
    export let options: SvgChoroplethOptions;
    $: ({ geoJson, colorScale, emptyValueColor = LIGHT_GREY } = options);

    let width: number = 0;
    let height: number = 0;
    let paths: string[];

    const defaultColorsScale: ColorsScale = {
        type: 'gradient',
        colors: {
            start: LIGHT_GREY,
            end: DARK_GREY,
        },
    };

    $: projection = geoEqualEarth().fitSize([height, width], geoJson.geoJson);
    $: makePath = geoPath(projection);
    $: coloredShapes = colorShapes(
        geoJson?.geoJson,
        data.value,
        defaultColorsScale,
        LIGHT_GREY
    );
    $: paths = coloredShapes?.geoJson.features.map((f) => {
        console.log(f)
            return { 
                path: makePath(f),
                color: f.properties.color,
            }
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
            <path d={path.path} fill={path.color}/>
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
