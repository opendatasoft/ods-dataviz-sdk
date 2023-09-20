<script lang="ts">
    import CategoryLegendItemLabel from './CategoryLegendItemLabel.svelte';
    import CategoryLegendItemSymbol from './CategoryLegendItemSymbol.svelte';
    import type { CategoryItem } from '../../types';

    export let item: CategoryItem;
    export let itemIndex: number;
    export let toggleSerie: (index: number) => void;
    export let refined: boolean;

    const stringLabel =
        item.label &&
        (typeof item.label === 'string' ? item.label : item?.label?.text?.(itemIndex));
</script>

<div
    class="legend-item-category"
    class:refined
    style="--cursor-style: {item.onClick ? 'pointer' : 'default'};"
    on:click={() => {
        if (item.onClick) {
            toggleSerie(itemIndex);
            item.onClick?.(itemIndex);
        }
    }}
    on:mouseenter={() => {
        if (item.onHover) {
            item.onHover(itemIndex, !refined);
        }
    }}
    on:mouseleave={() => {
        if (item.onLeave) {
            item.onLeave();
        }
    }}
>
    <CategoryLegendItemSymbol {item} />
    {#if stringLabel}
        <CategoryLegendItemLabel label={stringLabel} />
    {/if}
</div>

<style>
    .legend-item-category {
        display: inline-flex;
        align-items: center;
    }
    .legend-item-category:hover {
        cursor: var(--cursor-style);
    }
    .refined {
        text-decoration: line-through;
        opacity: 50%;
    }
</style>
