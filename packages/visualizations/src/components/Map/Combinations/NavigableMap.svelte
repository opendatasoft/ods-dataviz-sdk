<script lang="ts">
    import type { BBox } from 'geojson';
    import SvgChoropleth from '../Svg/Choropleth.svelte';
    import VectorChoropleth from '../WebGl/ChoroplethVectorTiles.svelte';
    import type { ChoroplethDataValue, NavigableChoroplethOptions, NavigationMap } from '../types';

    export let data: { value: ChoroplethDataValue[] };
    export let options: NavigableChoroplethOptions;

    let active: number | undefined;

    $: ({ navigationMaps, colorScale, ...mainOptions } = options);

    let viewBox: BBox | undefined;

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
    <div class="main">
        {#if active !== undefined}
            <button on:click={resetViewBox}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                    ><path fill="none" d="M0 0h24v24H0z" /><path
                        d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"
                    /></svg
                >
            </button>
        {/if}
        <VectorChoropleth {data} options={vectorOptions} />
    </div>
    <div class="buttons">
        <!-- Working with index is safe since we don't add/remove items -->
        {#each navigationMaps as map, i}
            <div class="button" class:active={active === i} on:click={setViewBox(map, i)}>
                <SvgChoropleth {data} options={{ shapes: map.shapes, colorScale }} />
            </div>
        {/each}
    </div>
</div>

<style>
    .maps-container {
        display: flex;
        align-items: stretch;
    }

    .main {
        flex-grow: 1;
        position: relative;
    }

    button {
        position: absolute;
        top: 26px;
        right: 26px;
        z-index: 1;
        border-radius: 6px;
        box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.26);
        background: white;
        border: none;
    }

    .buttons {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        border-left: 1px solid #cbd2db;
        padding: 0 13px;
    }

    .button {
        height: 60px;
        width: 60px;
        padding: 6px;
        border-radius: 6px;
        box-sizing: border-box;
    }

    .active {
        border: 1px solid #dee5ef;
        background: #f6f8fb;
    }
</style>
