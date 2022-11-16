<svelte:options immutable={true} />

<script lang="ts">
    import SvgChoropleth from '../Svg/Choropleth.svelte';
    import VectorChoropleth from '../WebGl/ChoroplethVectorTiles.svelte';
    import type { ChoroplethDataValue, NavigableChoroplethOptions } from '../types';

    export let data: { value: ChoroplethDataValue[] };
    export let options: NavigableChoroplethOptions;

    $: ({ buttonsOptions, ...mainOptions } = options);
</script>

<VectorChoropleth {data} options={mainOptions} />
<div style="display: flex">
    {#each buttonsOptions as buttonOptions}
        <div style="width: 50px; height: 50px">
            <SvgChoropleth {data} options={buttonOptions} />
        </div>
    {/each}
</div>

<style>
    /* your styles go here */
</style>
