<script lang="ts">
    import { getContext } from 'svelte';
    import type { StickyStores, Column } from '../types';
    import { getStickyClasses, getStickyOffset } from '../sticky';
    import { HOVER_COLUMN_KEY } from '../constants';
    import SortButton from './SortButton.svelte';

    export let column: Column | null = null;

    const { stickyColumnsWidth, stickyColumnsOffset, isHorizontallyScrolled, lastStickyColumn } =
        getContext<StickyStores>('sticky-stores');

    let thElement: HTMLElement;
    let clientWidth: number;
    /* bind:clientWidth adds a position: relative intermettently which messes up positon: sticky
        https://github.com/sveltejs/svelte/issues/4776
        if columns change width after render at some point, we'll need Resize observer or Svelte 5
    */
    $: colKey = column?.key || HOVER_COLUMN_KEY;
    $: if (thElement) {
        clientWidth = thElement.clientWidth;
    }
    // Only updates columns that have been initialized after a reset in Table.svelte
    $: if ($stickyColumnsWidth.has(colKey)) {
        stickyColumnsWidth.updateColumn(colKey, clientWidth);
    }
</script>

{#if column}
    <th
        bind:this={thElement}
        style={getStickyOffset($stickyColumnsOffset.get(colKey))}
        class={`table-header--${column?.dataFormat || 'hover'} ${getStickyClasses({
            column,
            scrolled: $isHorizontallyScrolled,
            lastStickyColumn: $lastStickyColumn,
        })}`}
    >
        {#if column.onClick}
            <SortButton
                sorted={column?.sorted}
                on:click={column.onClick}
                labels={column.sortLabels}
            >
                {column.title}
            </SortButton>
        {:else}
            {column.title}
        {/if}
    </th>
{:else}
    <th
        bind:this={thElement}
        style={getStickyOffset($stickyColumnsOffset.get(colKey))}
        class={`button-cell ${getStickyClasses({
            column,
            scrolled: $isHorizontallyScrolled,
            lastStickyColumn: $lastStickyColumn,
        })}`}
    />
{/if}

<style lang="scss">
    @import '../sticky';
    :global(.ods-dataviz--default th) {
        text-align: left;
        padding: var(--spacing-75);
        background-color: white;
        border-bottom: 1px solid var(--border-color);
    }

    :global(.ods-dataviz--default th.table-header--number) {
        text-align: right;
    }

    :global(.ods-dataviz--default .hover.sticky) {
        border-left: none;
    }
</style>
