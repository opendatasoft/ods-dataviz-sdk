<svelte:options immutable={false} />

<script lang="ts">
    import type { CategoryLegend } from '../types';
    export let legendOptions: CategoryLegend;
    export let align: 'horizontal' | 'vertical';
    let refinedSeries: boolean[];
    if (legendOptions.type === 'category') {
        refinedSeries = legendOptions.items.map(() => false);
    }
</script>

<div class="legend-container-category legend--{align}">
    {#each legendOptions.items as item, i}
        <div
            class="legend-color-item-category"
            on:click={() => {
                refinedSeries[i] = !refinedSeries[i];
                item.onClick(i);
            }}
            on:mouseenter={() => {
                if (item.onHover) {
                    item.onHover(i);
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
                    class="legend-color-box-category"
                    style="--box-color: {item.color}; --border-color:{item.borderColor}"
                />
            {:else}
                <div
                    class="legend-color-line-category"
                    class:legend-color-line-category-dashed={item.borderDashed}
                    style="--border-color:{item.borderColor}"
                />
            {/if}
            <div class="legend-color-label-category" class:refined={refinedSeries[i]}>
                {item.label}
            </div>
        </div>
    {/each}
</div>

<style>
    .legend-container-category {
        display: flex;
    }
    .legend-container-category.legend--horizontal {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 13px;
    }
    .legend-container-category.legend--vertical {
        padding: 13px;
        flex-direction: column;
        margin: auto;
        justify-content: center;
        align-items: start;
    }
    .legend-color-item-category {
        margin: 0 26px 6px 26px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .legend-color-item-category:hover {
        cursor: pointer;
    }
    .refined {
        text-decoration: line-through;
    }
    .legend-container-category {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
    .legend-color-box-category {
        min-height: 16px;
        min-width: 20px;
        border-radius: 3px;
        background: var(--box-color);
        border: 1px solid var(--border-color);
        margin-right: 3px;
    }
    .legend-color-line-category {
        min-height: 16px;
        min-width: 20px;
        margin-right: 3px;
        background: linear-gradient(var(--border-color), var(--border-color)) no-repeat center/100%
            2px;
        background-position-x: calc(50% - 3px);
    }
    .legend-color-line-category-dashed {
        background: repeating-linear-gradient(
                to right,
                transparent 0 3px,
                var(--border-color) 3px 6px
            )
            no-repeat center/100% 2px;
        background-position-x: calc(50% - 3px);
    }
    .legend-color-label-category {
        color: #565656;
        font-size: 0.8rem;
    }
</style>
