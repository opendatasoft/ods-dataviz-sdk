<script lang="ts">
    import { setContext } from 'svelte';
    import type { DataFrame } from 'types';
    import { generateId } from 'components/utils';
    import type { Column, RowProps } from './types';
    import Headers from './Headers';
    import Body from './Body.svelte';
    import { HOVER_COLUMN_KEY } from './constants';
    import { createStickyStores } from './store';

    export let loadingRowsNumber: number | null;
    export let columns: Column[];
    export let records: DataFrame | undefined;
    export let description: string | undefined;
    export let emptyStateLabel: string | undefined;
    export let rowProps: RowProps | undefined;
    export let extraButtonColumnLabel: string | undefined;
    export let showRowNumbers = false;
    export let rowOffset = 0;

    const tableId = `table-${generateId()}`;

    let scrollBox: HTMLDivElement;
    let sortedStickyColumns: Column[] = [];

    const { stickyColumnsOffset, stickyColumnsWidth, lastStickyColumn, isHorizontallyScrolled } =
        createStickyStores();

    setContext('sticky-stores', {
        stickyColumnsOffset,
        stickyColumnsWidth,
        lastStickyColumn,
        isHorizontallyScrolled,
    });

    function handleScroll() {
        $isHorizontallyScrolled =
            document.dir === 'rtl' ? scrollBox?.scrollLeft < 0 : scrollBox?.scrollLeft > 0;
    }

    $: rowNumberIsLastSticky = showRowNumbers && !$lastStickyColumn;
    $: rowNumberShadow = rowNumberIsLastSticky && $isHorizontallyScrolled;

    // resets scroll when changing columns parameters
    $: if (columns && scrollBox) {
        sortedStickyColumns = [...columns].sort((colA, colB) => {
            if (Boolean(colA?.sticky) === Boolean(colB?.sticky)) {
                return 0;
            }
            return colA?.sticky ? -1 : 1;
        });
        stickyColumnsWidth.reset();
        if (rowProps) {
            stickyColumnsWidth.updateColumn(HOVER_COLUMN_KEY, 0);
        }
        sortedStickyColumns.forEach((col) => {
            if (col?.sticky) {
                stickyColumnsWidth.updateColumn(col.key, 0);
            }
        });
    }
</script>

<div class="scrollbox" bind:this={scrollBox} on:scroll={handleScroll} style:--row-number-width={showRowNumbers ? 'calc(2rem + var(--spacing-75))' : '0px'} class:scrollbox--row-number-border={rowNumberIsLastSticky} class:scrollbox--row-number-shadow={rowNumberShadow}>
    <table aria-describedby={description ? tableId : undefined}>
        <Headers
            columns={sortedStickyColumns}
            extraButtonColumn={Boolean(rowProps?.onClick)}
            {extraButtonColumnLabel}
            {showRowNumbers}
        />
        <Body
            {records}
            columns={sortedStickyColumns}
            {rowProps}
            {emptyStateLabel}
            {loadingRowsNumber}
            {showRowNumbers}
            {rowOffset}
        />
    </table>
</div>
{#if description}
    <p id={tableId} class="a11y-invisible-description">{description}</p>
{/if}

<style>
    /* Suitable for elements that are used via aria-describedby or aria-labelledby */
    .a11y-invisible-description {
        display: none;
    }

    :global(.ods-dataviz--default) .scrollbox {
        overflow-x: auto;
        overscroll-behavior-x: none;
        width: 100%;
    }

    :global(.ods-dataviz--default) table {
        border-collapse: separate;
        border-spacing: 0;
        white-space: nowrap;
        width: inherit;
    }

    :global(.ods-dataviz--default .scrollbox--row-number-border .row-number-cell:dir(ltr)),
    :global(.ods-dataviz--default .scrollbox--row-number-border .row-number-header:dir(ltr)) {
        box-shadow: 1px 0 0 var(--border-color);
    }
    :global(.ods-dataviz--default .scrollbox--row-number-border .row-number-cell:dir(rtl)),
    :global(.ods-dataviz--default .scrollbox--row-number-border .row-number-header:dir(rtl)) {
        box-shadow: -1px 0 0 var(--border-color);
    }

    :global(.ods-dataviz--default .scrollbox--row-number-shadow .row-number-cell::after),
    :global(.ods-dataviz--default .scrollbox--row-number-shadow .row-number-header::after) {
        content: '';
        position: absolute;
        top: 0;
        height: 100%;
        width: 6px;
    }
    :global(.ods-dataviz--default .scrollbox--row-number-shadow .row-number-cell:dir(ltr)::after),
    :global(.ods-dataviz--default .scrollbox--row-number-shadow .row-number-header:dir(ltr)::after) {
        right: -6px;
        background: linear-gradient(90deg, rgba(0, 0, 0, 0.13), transparent);
    }
    :global(.ods-dataviz--default .scrollbox--row-number-shadow .row-number-cell:dir(rtl)::after),
    :global(.ods-dataviz--default .scrollbox--row-number-shadow .row-number-header:dir(rtl)::after) {
        left: -6px;
        background: linear-gradient(-90deg, rgba(0, 0, 0, 0.13), transparent);
    }
</style>
