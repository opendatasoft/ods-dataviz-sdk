<script lang="ts">
    import { createBubbler } from 'svelte/legacy';

    const bubble = createBubbler();
    import type { ColorScale } from 'types';
    import type { ChoroplethDataValue, NavigationMap } from 'components/ChoroplethMap/types';
    import SvgChoropleth from 'components/ChoroplethMap/Svg';
    import tippy from './tippy';

    interface Props {
        active: boolean;
        showTooltip: boolean;
        data: { value: ChoroplethDataValue[] };
        map: NavigationMap;
        colorScale: ColorScale | undefined;
    }

    let {
        active,
        showTooltip,
        data,
        map,
        colorScale
    }: Props = $props();

    let { label } = $derived(map);
    let options = $derived({ shapes: map.shapes, colorScale });
</script>

{#if showTooltip}
    <button
        type="button"
        class:active
        onclick={bubble('click')}
        use:tippy={{
            content: label,
        }}
    >
        <SvgChoropleth {data} {options} />
    </button>
{:else}
    <button type="button" class:active onclick={bubble('click')}>
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
