<script lang="ts">
    import type { CategoryLegend, CategoryItem } from './types';

    export let legendOptions: CategoryLegend;
    let refinedSeries: number[] = [];
    /** just find a way to identify each item uniquely, here initial order */
    type UniqueCategoryItem = CategoryItem & { id: number };
    const defaultVariant = 'box';
    let items: CategoryItem[] = [];
    let title: string | undefined;
    let subtitle: string | undefined;
    let alignement: string | undefined = 'center';
    $: ({ items, title, subtitle, alignement } = legendOptions);
    $: categoryItems = items.map((item, i) => ({
        ...item,
        id: i,
        variant: item.variant || defaultVariant,
    }));

    const isRefined = (item: UniqueCategoryItem, series: number[]) =>
        series.some((id) => id === item.id);
</script>

<div class={`legend-container legend-container--${alignement}`}>
    {#if title}
        <div class="legend-title" style="--alignement: {alignement};">{title}</div>
    {/if}
    {#if subtitle}
        <div class="legend-subtitle" style="--alignement: {alignement};">{subtitle}</div>
    {/if}
    <div class="legend-items-container" style="--alignement: {alignement};">
        {#each categoryItems as item (item.id)}
            <div
                class="legend-item-category"
                on:click={() => {
                    refinedSeries = isRefined(item, refinedSeries)
                        ? refinedSeries.filter((id) => id !== item.id)
                        : [...refinedSeries, item.id];
                    item.onClick?.(item.id);
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
                    {#if item?.variant === 'circle'}
                        <div
                            class={'item-circle-category'}
                            class:refined={isRefined(item, refinedSeries)}
                            style="--box-color: {item.color}; --border-color:{item.borderColor}"
                        />
                    {:else}
                        <div
                            class={'item-box-category'}
                            class:refined={isRefined(item, refinedSeries)}
                            style="--box-color: {item.color}; --border-color:{item.borderColor}"
                        />
                    {/if}
                {:else}
                    <div
                        class="item-line-category"
                        class:item-line-category-dashed={item.borderDashed}
                        style="--border-color:{item.borderColor}"
                    />
                {/if}
                <div class="item-label-category" class:refined={isRefined(item, refinedSeries)}>
                    {item.label}
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .legend-container {
        display: flex;
        flex-direction: column;
        padding: 13px;
    }
    .legend-title {
        align-self: var(--alignement);
        font-weight: 700;
        margin-bottom: 3px;
        font-size: medium;
    }
    .legend-subtitle {
        align-self: var(--alignement);
        margin-bottom: 3px;
        font-size: small;
    }
    .legend-items-container {
        display: grid;
        justify-content: var(--alignement);
        grid-gap: 3px 13px;
        grid-template-columns: repeat(auto-fit, minmax(80px, max-content));
        padding: 13px 0;
    }
    .legend-item-category {
        display: inline-flex;
        align-items: center;
    }
    .legend-item-category:hover {
        cursor: pointer;
    }
    .refined {
        text-decoration: line-through;
        opacity: 50%;
    }
    .item-box-category {
        min-height: 16px;
        min-width: 28px;
        border-radius: 3px;
        background: var(--box-color);
        border: 1px solid var(--border-color);
        margin-right: 6px;
    }
    .item-circle-category {
        min-height: 16px;
        min-width: 16px;
        border-radius: 50%;
        background: var(--box-color);
        border: 1px solid var(--border-color);
        margin-right: 6px;
    }
    .item-line-category {
        min-height: 16px;
        min-width: 28px;
        margin-right: 3px;
        background: linear-gradient(var(--border-color), var(--border-color)) no-repeat center/100%
            2px;
        background-position-x: calc(50% - 3px);
    }
    .item-line-category-dashed {
        background: repeating-linear-gradient(
                to right,
                transparent 0 3px,
                var(--border-color) 3px 9px
            )
            no-repeat center/100% 2px;
        background-position-x: calc(50% - 3px);
    }
    .item-label-category {
        color: #565656;
        font-size: 0.8rem;
    }
</style>
