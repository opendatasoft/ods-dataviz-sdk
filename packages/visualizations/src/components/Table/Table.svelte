<script lang="ts">
    import type { DataFrame } from 'types';
    import { generateId } from 'components/utils';
    import type { Column, RowProps } from './types';
    import Headers from './Headers';
    import Body from './Body.svelte';
    import { stickyColumnsWidth } from './store';

    export let loadingRowsNumber: number | null;
    export let columns: Column[];
    export let records: DataFrame | undefined;
    export let description: string | undefined;
    export let emptyStateLabel: string | undefined;
    export let rowProps: RowProps | undefined;

    const tableId = `table-${generateId()}`;

    let isHorizontallyScrolled = false;
    let scrollBox: HTMLDivElement;
    let sortedStickyColumns: Column[] = [];

    function handleScroll() {
        isHorizontallyScrolled =
            document.dir === 'rtl' ? scrollBox?.scrollLeft < 0 : scrollBox?.scrollLeft > 0;
    }

    $: sortedStickyColumns = [...columns].sort((colA, colB) => {
        if (Boolean(colA?.sticky) === Boolean(colB?.sticky)) {
            return 0;
        }
        return colA?.sticky ? -1 : 1;
    });

    // resets scroll when changing columns parameters
    $: if (columns && scrollBox) {
        scrollBox.scrollLeft = 0;
        sortedStickyColumns = [...columns].sort((colA, colB) => {
            if (Boolean(colA?.sticky) === Boolean(colB?.sticky)) {
                return 0;
            }
            return colA?.sticky ? -1 : 1;
        });
        stickyColumnsWidth.reset();
        sortedStickyColumns
            .filter((col) => col?.sticky)
            .forEach((col) => {
                stickyColumnsWidth.updateColumn(col.key, 0);
            });
    }
</script>

<div class="scrollbox" bind:this={scrollBox} on:scroll={handleScroll}>
    <table aria-describedby={description ? tableId : undefined}>
        <Headers
            columns={sortedStickyColumns}
            {isHorizontallyScrolled}
            extraButtonColumn={Boolean(rowProps?.onClick)}
        />
        <Body
            {records}
            columns={sortedStickyColumns}
            {rowProps}
            {emptyStateLabel}
            {loadingRowsNumber}
            {isHorizontallyScrolled}
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
</style>
