<script lang="ts">
    import type { BBox } from 'geojson';
    import SvgChoropleth from '../Svg/Choropleth.svelte';
    import VectorChoropleth from '../WebGl/ChoroplethVectorTiles.svelte';
    import type { ChoroplethDataValue, NavigableChoroplethOptions, NavigationMap } from '../types';

    export let data: { value: ChoroplethDataValue[] };
    export let options: NavigableChoroplethOptions;

    $: ({ navigationMaps, colorScale, ...mainOptions } = options);

    let viewBox: BBox;
    const setViewBox = (map: NavigationMap) => () => {
        viewBox = map.bbox;
    };
</script>

<div class="maps-container">
    <div class="main">
        <VectorChoropleth {data} options={{ ...mainOptions, colorScale, viewBox }} />
    </div>
    <div class="buttons">
        {#each navigationMaps as map}
            <div class="button" on:click={setViewBox(map)}>
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

    .buttons {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    .button {
        height: 60px;
        width: 60px;
        padding: 3px;
    }

    .main {
        flex-grow: 1;
    }
</style>
