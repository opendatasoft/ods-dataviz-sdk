<script lang="ts">
    import { run } from 'svelte/legacy';

    import CategoryLegendItem from './CategoryLegend/Item/CategoryLegendItem.svelte';
    import type { CategoryLegend, CategoryItem } from './types';

    interface Props {
        legendOptions: CategoryLegend;
    }

    let { legendOptions }: Props = $props();

    let items: CategoryItem[] = $state([]);
    let title: string | undefined = $state();
    let align: string | undefined = $state();
    let refinedSeries: number[] = $state([]);

    const isRefined = (i: number, series: number[]) => series.some((id) => id === i);
    const toggleSerie = (index: number) => {
        refinedSeries = refinedSeries.some((id) => id === index)
            ? refinedSeries.filter((id) => id !== index)
            : [...refinedSeries, index];
    };

    run(() => {
        ({ items, title, align = 'center' } = legendOptions);
    });
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
        grid-template-columns: repeat(auto-fit, minmax(120px, max-content));
        padding: 13px 0;
    }
</style>
