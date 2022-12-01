<script lang="ts">
    import type { BBox } from 'geojson';
    import VectorChoropleth from '../WebGl/ChoroplethVectorTiles.svelte';
    import type { ChoroplethDataValue, NavigableChoroplethOptions, NavigationMap } from '../types';

    import BackButton from './BackButton.svelte';
    import MiniMap from './MiniMap.svelte';

    export let data: { value: ChoroplethDataValue[] };
    export let options: NavigableChoroplethOptions;

    $: ({ navigationMaps, colorScale, bbox, ...mainOptions } = options);

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
        <VectorChoropleth {data} options={vectorOptions} />
    </div>
    <!-- Working with index is safe since we don't add/remove items -->
    <div class="buttons" style="--nav-maps-width: {navMapsWidth}px">
        {#each navigationMaps as map, i}
            <MiniMap
                {data}
                {map}
                {colorScale}
                active={active === i}
                on:click={setViewBox(map, i)}
            />
        {/each}
    </div>
</div>

<style>
    .maps-container {
        display: flex;
        width: 100%;
    }

    .main {
        flex-grow: 1;
        aspect-ratio: var(--aspect-ratio);
        position: relative;
        display: block;
    }

    .buttons {
        max-width: var(--nav-maps-width);
        flex-shrink: 1;
        display: grid;
        grid-template-rows: repeat(auto-fit, minmax(52px, 72px));
        grid-auto-flow: column;
        grid-auto-columns: minmax(52px, 72px);
        justify-content: flex-start;
        border-left: 1px solid #cbd2db;
        padding: 0 13px;
    }
</style>
