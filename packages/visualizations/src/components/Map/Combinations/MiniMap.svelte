<script lang="ts">
    import SvgChoropleth from '../Svg/Choropleth.svelte';
    import type { ColorScale } from '../../types';
    import type { ChoroplethDataValue, NavigationMap } from '../types';
    import Tooltip from './Tooltip.svelte';

    export let active: boolean;
    export let showTooltip: boolean;
    export let data: { value: ChoroplethDataValue[] };
    export let map: NavigationMap;
    export let colorScale: ColorScale | undefined;

    $: ({ label } = map);
    $: options = { shapes: map.shapes, colorScale };
</script>

{#if showTooltip}
    <Tooltip {label}>
        <button type="button" class:active on:click>
            <SvgChoropleth {data} {options} />
        </button>
    </Tooltip>
{:else}
    <button type="button" class:active on:click>
        <SvgChoropleth {data} {options} />
    </button>
{/if}

<style>
    button {
        cursor: pointer; /* Override user agent stylesheet */
        height: 100%;
        flex: 1;
        min-width: 52px;
        max-width: 72px;
        aspect-ratio: 1;
    }
</style>
