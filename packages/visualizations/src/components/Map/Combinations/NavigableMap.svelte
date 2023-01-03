<script lang="ts">
    import type { BBox } from 'geojson';
    import ChoroplethVectorTiles from '../WebGl/ChoroplethVectorTiles.svelte';
    import type { ChoroplethDataValue, NavigableChoroplethOptions, NavigationMap } from '../types';

    import BackButton from './BackButton.svelte';
    import MiniMap from './MiniMap.svelte';

    export let data: { value: ChoroplethDataValue[] };
    export let options: NavigableChoroplethOptions;

    $: ({ navigationMaps, colorScale, bbox, ...mainOptions } = options);

    const defaultInteractive = true;
    $: ({ interactive = defaultInteractive } = options);

    let viewBox: BBox | undefined;
    $: viewBox = bbox;

    let active: number | undefined;
    let height: number;

    const setViewBox = (map: NavigationMap, i: number) => () => {
        viewBox = map.bbox;
        active = i;
    };

    const resetViewBox = () => {
        active = undefined;
        viewBox = bbox;
    };

    $: vectorOptions = { ...mainOptions, colorScale, viewBox };
    /* Number of column x largest colmuns.
     * The maps will then auto-adjust between 52 and 72 to fit the best
     * It's stable and doesn't involves too much JS computaton either.
     */
    $: navMapsWidth = height ? Math.ceil((navigationMaps.length * 72) / height) * 72 : 72;
</script>

<div class="maps-container">
    <div class="main" style="--aspect-ratio: {options.aspectRatio}" bind:clientHeight={height}>
        {#if active !== undefined}
            <BackButton on:click={resetViewBox} />
        {/if}
        <ChoroplethVectorTiles {data} options={vectorOptions} />
    </div>
    <!-- Working with index is safe since we don't add/remove items -->
    <div class="buttons" style="--nav-map-buttons--width-vertical: {navMapsWidth}px">
        {#each navigationMaps as map, i}
            <MiniMap
                {data}
                {map}
                {colorScale}
                active={active === i}
                showTooltip={interactive}
                on:click={setViewBox(map, i)}
            />
        {/each}
    </div>
</div>

<style>
    .maps-container {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .main {
        aspect-ratio: var(--aspect-ratio);
        flex-grow: 1;
        position: relative;
        display: block;
    }

    .buttons {
        display: grid;
        grid: auto-flow minmax(52px, 72px) / repeat(auto-fit, minmax(52px, 72px));
        /* to be used with grid: * * * shorthand */
        --nav-map-buttons--vertical: repeat(auto-fit, minmax(52px, 72px)) / auto-flow
            minmax(52px, 72px);
        justify-content: flex-start;
    }
</style>
