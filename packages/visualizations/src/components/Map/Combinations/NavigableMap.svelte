<script lang="ts">
    import type { BBox } from 'geojson';
    import VectorChoropleth from '../WebGl/ChoroplethVectorTiles.svelte';
    import type { ChoroplethDataValue, NavigableChoroplethOptions, NavigationMap } from '../types';

    import BackButton from './BackButton.svelte';
    import MiniMap from './MiniMap.svelte';

    export let data: { value: ChoroplethDataValue[] };
    export let options: NavigableChoroplethOptions;

    $: ({ navigationMaps, colorScale, ...mainOptions } = options);

    let viewBox: BBox | undefined;
    let active: number | undefined;

    const setViewBox = (map: NavigationMap, i: number) => () => {
        viewBox = map.bbox;
        active = i;
    };

    const resetViewBox = () => {
        active = undefined;
        viewBox = mainOptions.bbox;
    };

    $: vectorOptions = { ...mainOptions, colorScale, viewBox };
</script>

<div class="maps-container">
    <div class="main" style="--aspect-ratio: {options.aspectRatio}">
        {#if active !== undefined}
            <BackButton on:click={resetViewBox} />
        {/if}
        <VectorChoropleth {data} options={vectorOptions} />
    </div>
    <!-- Working with index is safe since we don't add/remove items -->
    <div class="buttons">
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
        flex: 1 1 auto;
        aspect-ratio: var(--aspect-ratio);
        position: relative;
        display: flex;
        flex-direction: column;
    }

    .buttons {
        flex: 1 1 0;
        display: grid;
        grid-template-rows: repeat(auto-fill, minmax(52px, 72px));
        grid-auto-flow: column;
        overflow-y: auto;
        border-left: 1px solid #cbd2db;
        padding: 0 13px;
    }
</style>
