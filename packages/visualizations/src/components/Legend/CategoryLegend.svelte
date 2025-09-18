<script lang="ts">
    import CategoryLegendItem from './CategoryLegend/Item/CategoryLegendItem.svelte';
    import { type CategoryLegend, type CategoryItem, CATEGORY_ITEM_VARIANT } from './types';

    export let legendOptions: CategoryLegend;

    let items: CategoryItem[] = [];
    let title: string | undefined;
    let align: string | undefined;
    let refinedSeries: number[] = [];

    const isRefined = (i: number, series: number[]) => series.some((id) => id === i);
    const toggleSerie = (index: number) => {
        refinedSeries = refinedSeries.some((id) => id === index)
            ? refinedSeries.filter((id) => id !== index)
            : [...refinedSeries, index];
    };

    $: ({ items, title, align = 'center' } = legendOptions);

    // group items by available "variant"
    $: grouped = items.reduce((acc, item) => {
        const v = item.variant;
        if (!acc[v]) acc[v] = [];
        acc[v].push(item);
        return acc;
    }, {} as Record<string, CategoryItem[]>);

    const variantOrder = [
        CATEGORY_ITEM_VARIANT.Circle,
        CATEGORY_ITEM_VARIANT.Line,
        CATEGORY_ITEM_VARIANT.Box,
        CATEGORY_ITEM_VARIANT.Image,
    ];
    $: groupKeys = variantOrder.filter(v => grouped[v]);
</script>

<div class="legend-container" style="--align: {align}">
    {#if title}
        <div class="legend-title">{title}</div>
    {/if}
    <div class="legend-items-container">
        {#each groupKeys as group}
            <div class="legend-items-group">
                {#each grouped[group] as item, i}
                    <CategoryLegendItem
                        {item}
                        itemIndex={i}
                        {toggleSerie}
                        refined={isRefined(i, refinedSeries)}
                    />
                {/each}
            </div>
        {/each}
    </div>
</div>

<style>
    .legend-container {
        display: flex;
        flex-direction: column;
        font-size: 0.8rem;
        padding: 0 13px;
    }
    .legend-title {
        padding-top: 13px;
        font-weight: 700;
        text-align: var(--align);
    }
    .legend-items-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, max-content));
        justify-content: var(--align);
        gap: 6px 13px;
        padding: 7px 0;
    }
    .legend-items-group {
        display: grid;
        grid-template-columns: subgrid;
        grid-column: 1 / -1;
        gap: 3px 13px;
        justify-content: start; /* items always align left in each row */
        padding: 6px 0;
    }
</style>
