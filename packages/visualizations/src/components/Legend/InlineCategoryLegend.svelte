<script lang="ts">
    import CategoryLegendItem from './CategoryLegend/Item/CategoryLegendItem.svelte';
    import type { CategoryLegend, CategoryItem } from './types';

    /**
     * Inline variant of the category legend (e.g. the series of a segmented chart): the title
     * then the items on the same line(s), in a frame that scrolls past `maxHeight`.
     * When fluid (narrow): the title on top, then the items in columns.
     */
    export let legendOptions: CategoryLegend;

    // Same breakpoint as the colors legend of the maps
    const FLUID_MAX_WIDTH = 375;

    let items: CategoryItem[] = [];
    let title: string | undefined;
    let align: string | undefined;
    let maxHeight: string | undefined;
    let titleStyle: CategoryLegend['titleStyle'];
    let refinedSeries: number[] = [];
    let legendWidth: number;

    const isRefined = (i: number, series: number[]) => series.some((id) => id === i);
    const toggleSerie = (index: number) => {
        refinedSeries = refinedSeries.some((id) => id === index)
            ? refinedSeries.filter((id) => id !== index)
            : [...refinedSeries, index];
    };

    $: ({ items, title, align = 'center', maxHeight, titleStyle } = legendOptions);
    // 0 while not measured yet (and in tests): not fluid
    $: fluid = legendWidth > 0 && legendWidth <= FLUID_MAX_WIDTH;
    $: titleCss = [
        titleStyle?.color && `color: ${titleStyle.color}`,
        titleStyle?.fontSize && `font-size: ${titleStyle.fontSize}px`,
        titleStyle?.fontWeight && `font-weight: ${titleStyle.fontWeight}`,
    ]
        .filter(Boolean)
        .join('; ');
</script>

<div
    class="legend-container legend-container--inline"
    class:legend-container--fluid={fluid}
    class:legend-container--scroll={!!maxHeight}
    bind:clientWidth={legendWidth}
    style="--align: {align}; --max-height: {maxHeight || 'none'}"
>
    <!-- The frame scrolls, its content is laid out inside: centering in the scrolling box
         itself would push the overflowing start (the title, the first items) out of reach.
         When fluid, only the items scroll, under the title. -->
    <div class="legend-content">
        {#if title}
            <!-- Beside the items, vertically centered on all their lines -->
            <span class="legend-title" style={titleCss}>{title}</span>
        {/if}
        <div class="legend-items">
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
</div>

<style>
    /* Frame themable by the host (e.g. to match its cards): --category-legend-border-color,
       --category-legend-border-radius */
    .legend-container {
        margin: 6px 0 0;
        padding: 6px 13px;
        font-size: 0.8rem;
        border: 1px solid var(--category-legend-border-color, var(--border-color));
        border-radius: var(--category-legend-border-radius, var(--border-radius-6));
    }
    .legend-container--scroll {
        max-height: var(--max-height);
        overflow-y: auto;
    }
    .legend-content {
        display: flex;
        align-items: center;
        justify-content: var(--align);
        gap: 13px;
    }
    .legend-title {
        flex: none;
        font-weight: 700;
    }
    .legend-items {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: var(--align);
        gap: 6px 13px;
        min-width: 0;
    }
    /* Fluid: the title stays on top, only the items scroll */
    .legend-container--fluid.legend-container--scroll {
        display: flex;
        overflow-y: hidden;
    }
    .legend-container--fluid .legend-content {
        flex: 1;
        flex-direction: column;
        gap: 6px;
        min-height: 0;
    }
    /* Aligned columns, as many as the width allows (two in a small card, one when very narrow),
       centered as a block under the title */
    .legend-container--fluid .legend-items {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, max-content));
        justify-content: center;
        align-self: stretch;
        min-height: 0;
        overflow-y: auto;
    }
</style>
