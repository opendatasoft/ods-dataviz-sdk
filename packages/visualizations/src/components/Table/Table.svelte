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
    export let stickyHeader = false;
    export let maxHeight: string | undefined;

    const tableId = `table-${generateId()}`;

    let scrollBox: HTMLDivElement;
    let sortedStickyColumns: Column[] = [];

    const {
        stickyColumnsOffset,
        stickyColumnsWidth,
        lastStickyColumn,
        isHorizontallyScrolled,
        isVerticallyScrolled,
        stickyHeader: isHeaderSticky,
    } = createStickyStores();

    setContext('sticky-stores', {
        stickyColumnsOffset,
        stickyColumnsWidth,
        lastStickyColumn,
        isHorizontallyScrolled,
        isVerticallyScrolled,
        stickyHeader: isHeaderSticky,
    });

    $: $isHeaderSticky = stickyHeader;
    /* Set inline rather than in the scoped style block: `unstyled` drops the
       .ods-dataviz--default rules, and the scrollport must be bounded either way. */
    $: scrollboxStyle = maxHeight ? `max-height: ${maxHeight}; overflow-y: auto;` : undefined;

    function handleScroll() {
        $isHorizontallyScrolled =
            document.dir === 'rtl' ? scrollBox?.scrollLeft < 0 : scrollBox?.scrollLeft > 0;
        $isVerticallyScrolled = scrollBox?.scrollTop > 0;
    }

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

<div class="scrollbox" style={scrollboxStyle} bind:this={scrollBox} on:scroll={handleScroll}>
    <table aria-describedby={description ? tableId : undefined}>
        <Headers
            columns={sortedStickyColumns}
            extraButtonColumn={Boolean(rowProps?.onClick)}
            {extraButtonColumnLabel}
        />
        <Body
            {records}
            columns={sortedStickyColumns}
            {rowProps}
            {emptyStateLabel}
            {loadingRowsNumber}
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
