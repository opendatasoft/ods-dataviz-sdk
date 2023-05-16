<svelte:options immutable={false} />

<script lang="ts">
    import type { CategoryLegend } from './types';

    export let legendOptions: CategoryLegend;
    let refinedSeries: boolean[];
    if (legendOptions.type === 'category') {
        refinedSeries = legendOptions.items.map(() => false);
    }
</script>

{#each legendOptions.items as item, i}
    <div
        class="color-item-category"
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
                class="color-box-category"
                class:refined={refinedSeries[i]}
                style="--box-color: {item.color}; --border-color:{item.borderColor}"
            />
        {:else}
            <div
                class="color-line-category"
                class:color-line-category-dashed={item.borderDashed}
                style="--border-color:{item.borderColor}"
            />
        {/if}
        <div class="color-label-category" class:refined={refinedSeries[i]}>
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
