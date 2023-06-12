<script lang="ts">
    import type { CategoryLegend, CategoryItem } from './types';

    export let legendOptions: CategoryLegend;
    let refinedSeries: number[] = [];
    /** just find a way to identify each item uniquely, here initial order */
    type UniqueCategoryItem = CategoryItem & { id: number };
    $: categoryItems = legendOptions.items.map((item, i) => ({ ...item, id: i }));

    const isRefined = (item: UniqueCategoryItem, series: number[]) =>
        series.some((id) => id === item.id);
</script>

{#each categoryItems as item (item.id)}
    <div
        class="color-item-category"
        on:click={() => {
            refinedSeries = isRefined(item, refinedSeries)
                ? refinedSeries.filter((id) => id !== item.id)
                : [...refinedSeries, item.id];
            item.onClick(item.id);
        }}
        on:mouseenter={() => {
            if (item.onHover) {
                item.onHover(item.id, !isRefined(item, refinedSeries));
            }
        }}
        on:mouseleave={() => {
            if (item.onLeave) {
                item.onLeave();
            }
        }}
    >
        {#if item.color}
            <div
                class="color-box-category"
                class:refined={isRefined(item, refinedSeries)}
                style="--box-color: {item.color}; --border-color:{item.borderColor}"
            />
        {:else}
            <div
                class="color-line-category"
                class:color-line-category-dashed={item.borderDashed}
                style="--border-color:{item.borderColor}"
            />
        {/if}
        <div class="color-label-category" class:refined={isRefined(item, refinedSeries)}>
            {item.label}
        </div>
    </div>
{/each}

<style>
    .color-item-category {
        display: inline-flex;
        align-items: center;
    }
    .color-item-category:hover {
        cursor: pointer;
    }
    .refined {
        text-decoration: line-through;
        opacity: 50%;
    }
    .color-box-category {
        min-height: 16px;
        min-width: 28px;
        border-radius: 3px;
        background: var(--box-color);
        border: 1px solid var(--border-color);
        margin-right: 6px;
    }
    .color-line-category {
        min-height: 16px;
        min-width: 28px;
        margin-right: 3px;
        background: linear-gradient(var(--border-color), var(--border-color)) no-repeat center/100%
            2px;
        background-position-x: calc(50% - 3px);
    }
    .color-line-category-dashed {
        background: repeating-linear-gradient(
                to right,
                transparent 0 3px,
                var(--border-color) 3px 9px
            )
            no-repeat center/100% 2px;
        background-position-x: calc(50% - 3px);
    }
    .color-label-category {
        color: #565656;
        font-size: 0.8rem;
    }
</style>
