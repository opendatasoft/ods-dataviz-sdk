<script lang="ts">
    import { getContext, onMount } from 'svelte';
    import type { StickyStores, Column } from '../types';
    import { getStickyClasses, getStickyOffset } from '../sticky';
    import { HOVER_COLUMN_KEY } from '../constants';
    import SortButton from './SortButton.svelte';
    import tooltipOnOverflow from '../actions';
    import FieldTypeIcon from './FieldTypeIcon.svelte';

    export let column: Column | null = null;
    export let extraButtonColumnLabel = 'Action';
    export let showFieldTypeIcons = false;

    const { stickyColumnsWidth, stickyColumnsOffset, isHorizontallyScrolled, lastStickyColumn } =
        getContext<StickyStores>('sticky-stores');

    /* bind:clientWidth adds a position: relative intermettently which messes up positon: sticky
        https://github.com/sveltejs/svelte/issues/4776 — using bind:this instead. Measuring is
        done via ResizeObserver rather than a one-off reactive read, since a host's CSS can
        change this column's rendered width after the initial measurement (e.g. it only applies
        once another stylesheet loads, or once layout settles post-scroll). */
    let thElement: HTMLElement;
    $: colKey = column?.key || HOVER_COLUMN_KEY;
    $: sticky = column ? Boolean(column.sticky) : true;

    onMount(() => {
        const observer = new ResizeObserver(() => {
            // Only updates columns that have been initialized after a reset in Table.svelte
            if ($stickyColumnsWidth.has(colKey)) {
                stickyColumnsWidth.updateColumn(colKey, thElement.clientWidth);
            }
        });
        observer.observe(thElement);
        return () => observer.disconnect();
    });

    /* Self-heals when Table.svelte resets this column's width to 0 without the element's own
       size actually changing (e.g. an unrelated re-render on window resize) — the
       ResizeObserver above only fires on a real size change, so nothing else catches this.
       Guarded to avoid looping, since `updateColumn` always emits. */
    $: {
        const registeredWidth = $stickyColumnsWidth.get(colKey);
        if (
            thElement &&
            registeredWidth !== undefined &&
            registeredWidth !== thElement.clientWidth
        ) {
            stickyColumnsWidth.updateColumn(colKey, thElement.clientWidth);
        }
    }
</script>

{#if column}
    <th
        bind:this={thElement}
        style={getStickyOffset($stickyColumnsOffset.get(colKey))}
        class={`table-header--${column?.dataFormat || 'hover'} ${getStickyClasses({
            columnKey: colKey,
            sticky,
            scrolled: $isHorizontallyScrolled,
            lastStickyColumn: $lastStickyColumn,
        })}`}
    >
        {#if column.onClick}
            <SortButton
                sorted={column?.sorted}
                on:click={column.onClick}
                labels={column?.sortLabels}
            >
                <span class="th-title-content">
                    {#if showFieldTypeIcons}
                        <FieldTypeIcon dataFormat={column.dataFormat} />
                    {/if}
                    <span class="th-title" use:tooltipOnOverflow>{column.title}</span>
                </span>
            </SortButton>
        {:else}
            <span class="th-title-content">
                {#if showFieldTypeIcons}
                    <FieldTypeIcon dataFormat={column.dataFormat} />
                {/if}
                <span class="th-title" use:tooltipOnOverflow>{column.title}</span>
            </span>
        {/if}
    </th>
{:else}
    <th
        bind:this={thElement}
        style={getStickyOffset($stickyColumnsOffset.get(colKey))}
        class={`button-cell ${getStickyClasses({
            columnKey: colKey,
            sticky,
            scrolled: $isHorizontallyScrolled,
            lastStickyColumn: $lastStickyColumn,
        })}`}
    >
        <span class="sr-only">{extraButtonColumnLabel}</span>
    </th>
{/if}

<style lang="scss">
    @import '../sticky';
    @import 'styles/accessibility';
    :global(.ods-dataviz--default th) {
        text-align: left;
        padding: var(--spacing-75);
        background-color: white;
        border-bottom: 1px solid var(--border-color);
    }

    .th-title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        min-width: 0;
    }

    :global(.ods-dataviz--default th.table-header--number) {
        text-align: right;
    }

    :global(.ods-dataviz--default .hover.sticky) {
        border-left: none;
    }

    .th-title-content {
        display: flex;
        align-items: center;
        gap: var(--spacing-50);
        flex: 1;
        min-width: 0;
    }
</style>
