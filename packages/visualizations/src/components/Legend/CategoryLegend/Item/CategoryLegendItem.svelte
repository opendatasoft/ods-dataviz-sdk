<script lang="ts">
    import type { CategoryItem } from 'components/Legend/types';
    import CategoryLegendItemLabel from './CategoryLegendItemLabel.svelte';
    import CategoryLegendItemSymbol from './CategoryLegendItemSymbol.svelte';

    interface Props {
        item: CategoryItem;
        itemIndex: number;
        toggleSerie: (index: number) => void;
        refined: boolean;
    }

    let {
        item,
        itemIndex,
        toggleSerie,
        refined
    }: Props = $props();

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.key !== 'Enter' || !item.onClick) return;
        toggleSerie(itemIndex);
        item.onClick(itemIndex);
    };

    let stringLabel =
        $derived(item.label &&
        (typeof item.label === 'string' ? item.label : item?.label?.text?.(itemIndex)));
</script>

<div
    role="button"
    tabindex={item.onClick ? 0 : -1}
    class:refined
    style="--cursor-style: {item.onClick ? 'pointer' : 'default'};"
    onkeydown={onKeyDown}
    onclick={() => {
        if (item.onClick) {
            toggleSerie(itemIndex);
            item.onClick?.(itemIndex);
        }
    }}
    onmouseenter={() => {
        if (item.onHover) {
            item.onHover(itemIndex, !refined);
        }
    }}
    onmouseleave={() => {
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
