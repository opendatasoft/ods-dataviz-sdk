<script lang="ts">
    import type { ColorScale } from '$lib/types';
    import type { ChoroplethDataValue, NavigationMap } from '$lib/ChoroplethMap/types';
    import SvgChoropleth from '$lib/ChoroplethMap/Svg';
    import tippy from './tippy';

    interface Props {
        active: boolean;
        showTooltip: boolean;
        data: { value: ChoroplethDataValue[] };
        map: NavigationMap;
        colorScale: ColorScale | undefined;
        onClick: () => void;
    };

    let {
        active,
        showTooltip,
        data,
        map,
        colorScale,
        onClick,
    }: Props = $props();

    let { label } = $derived(map);
    let options = $derived({ shapes: map.shapes, colorScale });
</script>

{#if showTooltip}
    <button
        type="button"
        class:active
        onclick={onClick}
        use:tippy={{
            content: label,
        }}
    >
        <SvgChoropleth {data} {options} />
    </button>
{:else}
    <button type="button" class:active onclick={onClick}>
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
