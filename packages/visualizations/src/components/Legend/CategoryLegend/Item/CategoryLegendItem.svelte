<script lang="ts">
    import type { CategoryItem } from 'types';
    import CategoryLegendItemLabel from './CategoryLegendItemLabel.svelte';
    import CategoryLegendItemSymbol from './CategoryLegendItemSymbol.svelte';

    export let item: CategoryItem;
    export let itemIndex: number;
    export let toggleSerie: (index: number) => void;
    export let refined: boolean;

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.key !== 'Enter' || !item.onClick) return;
        toggleSerie(itemIndex);
        item.onClick(itemIndex);
    };

    $: stringLabel =
        item.label &&
        (typeof item.label === 'string' ? item.label : item?.label?.text?.(itemIndex));
</script>

<div
    role="button"
    tabindex={item.onClick ? 0 : -1}
    class:refined
    style="--cursor-style: {item.onClick ? 'pointer' : 'default'};"
    on:keydown={onKeyDown}
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
    div {
        display: inline-flex;
        align-items: center;
    }
    div:hover {
        cursor: var(--cursor-style);
    }
    .refined {
        text-decoration: line-through;
        opacity: 50%;
    }
</style>
