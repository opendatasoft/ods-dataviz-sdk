<script lang="ts">
    import type { ColorScale } from 'types';
    import type { ChoroplethDataValue, NavigationMap } from 'components/ChoroplethMap/types';
    import SvgChoropleth from 'components/ChoroplethMap/Svg';
    import tippy from './tippy';

    export let active: boolean;
    export let showTooltip: boolean;
    export let data: { value: ChoroplethDataValue[] };
    export let map: NavigationMap;
    export let colorScale: ColorScale | undefined;

    $: ({ label } = map);
    $: options = { shapes: map.shapes, colorScale };
</script>

{#if showTooltip}
    <button
        type="button"
        class:active
        on:click
        use:tippy={{
            content: label,
        }}
    >
        <SvgChoropleth {data} {options} />
    </button>
{:else}
    <button type="button" class:active on:click>
        <SvgChoropleth {data} {options} />
    </button>
{/if}

<style>
    button {
        cursor: pointer; /* Override user agent stylesheet */
        height: 100%;
        min-width: 52px;
        max-width: 60px;
        aspect-ratio: 1;
    }
</style>
