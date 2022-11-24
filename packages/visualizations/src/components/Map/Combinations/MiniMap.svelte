<script lang="ts">
    import SvgChoropleth from '../Svg/Choropleth.svelte';
    import type { ColorScale } from '../../types';
    import type { ChoroplethDataValue, NavigationMap } from '../types';

    export let active: boolean;
    export let data: { value: ChoroplethDataValue[] };
    export let map: NavigationMap;
    export let colorScale: ColorScale | undefined;
</script>

<div class:active on:click>
    <SvgChoropleth {data} options={{ shapes: map.shapes, colorScale }} />
</div>

<style>
    div {
        flex: 1;
        min-width: 52px;
        max-width: 72px;
        aspect-ratio: 1;
        padding: 6px;
        border-radius: 6px;
        box-sizing: border-box;
    }

    .active {
        border: 1px solid #dee5ef;
        background: #f6f8fb;
    }
</style>
