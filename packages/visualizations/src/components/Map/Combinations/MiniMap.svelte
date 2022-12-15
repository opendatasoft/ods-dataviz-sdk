<script lang="ts">
    import SvgChoropleth from '../Svg/Choropleth.svelte';
    import type { ColorScale } from '../../types';
    import type { ChoroplethDataValue, NavigationMap } from '../types';

    export let active: boolean;
    export let data: { value: ChoroplethDataValue[] };
    export let map: NavigationMap;
    export let colorScale: ColorScale | undefined;
</script>

<button type="button" class:active on:click>
    <SvgChoropleth {data} options={{ shapes: map.shapes, colorScale }} />
</button>

<style>
    button {
        cursor: pointer; /* Don't understand why it's not the case */
        flex: 1;
        min-width: 52px;
        max-width: 72px;
        aspect-ratio: 1;
    }
</style>
