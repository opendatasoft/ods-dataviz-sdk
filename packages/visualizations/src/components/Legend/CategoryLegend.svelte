<script lang="ts">
    import CategoryLegendItem from './CategoryLegend/Item/CategoryLegendItem.svelte';
    import type { CategoryLegend, CategoryItem } from './types';

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
</script>

<div class="legend-container" style="--align: {align}">
    {#if title}
        <div class="legend-title">{title}</div>
    {/if}
    <div class="legend-items-container">
        {#each items as item, i}
            <CategoryLegendItem
                {item}
                itemIndex={i}
                {toggleSerie}
                refined={isRefined(i, refinedSeries)}
            />
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
        justify-content: var(--align);
        grid-gap: 3px 13px;
        grid-template-columns: repeat(auto-fit, minmax(80px, max-content));
        padding: 13px 0;
    }
</style>
