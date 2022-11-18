<script lang="ts">
    import type { BBox } from 'geojson';
    import SvgChoropleth from '../Svg/Choropleth.svelte';
    import VectorChoropleth from '../WebGl/ChoroplethVectorTiles.svelte';
    import type {
        ChoroplethDataValue,
        NavigableChoroplethOptions,
        NavigationButtonOptions,
    } from '../types';

    export let data: { value: ChoroplethDataValue[] };
    export let options: NavigableChoroplethOptions;

    $: ({ buttonsOptions, ...mainOptions } = options);

    let viewBox: BBox;
    const setViewBox = (buttonOptions: NavigationButtonOptions) => () => {
        viewBox = buttonOptions.bbox;
    };
</script>

<div class="maps-container">
    <div class="main">
        <VectorChoropleth {data} options={{ ...mainOptions, viewBox }} />
    </div>
    <div class="buttons">
        {#each buttonsOptions as buttonOptions}
            <div class="button" on:click={setViewBox(buttonOptions)}>
                <SvgChoropleth {data} options={buttonOptions} />
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

    .main {
        flex-grow: 1;
    }

    .button {
        flex-shrink: 1;
        height: 50px;
        width: 50px;
    }
</style>
