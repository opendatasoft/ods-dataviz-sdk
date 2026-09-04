<script lang="ts">
    import { setContext } from 'svelte';
    import type { DataFrame } from 'types';
    import { generateId } from 'components/utils';
    import type { Column, RowProps } from './types';
    import Headers from './Headers';
    import Body from './Body.svelte';
    import { HOVER_COLUMN_KEY, ROW_NUMBER_COLUMN_KEY } from './constants';
    import { createStickyStores } from './store';

    export let loadingRowsNumber: number | null;
    export let columns: Column[];
    export let records: DataFrame | undefined;
    export let description: string | undefined;
    export let emptyStateLabel: string | undefined;
    export let rowProps: RowProps | undefined;
    export let extraButtonColumnLabel: string | undefined;
    export let stickyHeader = false;
    export let fillHeight = false;
    export let maxHeight: string | undefined;
    export let showRowNumbers = false;
    export let rowNumberLabel = 'Row number';
    export let showFieldTypeIcons = false;
    export let rowOffset = 0;

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
    /* Length caps stay inline: `unstyled` drops the .ods-dataviz--default rules,
       and the scrollport must be bounded either way. */
    $: scrollboxStyle = maxHeight ? `max-height: ${maxHeight}; overflow-y: auto;` : undefined;

    function handleScroll() {
        $isHorizontallyScrolled =
            document.dir === 'rtl' ? scrollBox?.scrollLeft < 0 : scrollBox?.scrollLeft > 0;
        $isVerticallyScrolled = scrollBox?.scrollTop > 0;
    }

    /* New records are new content: without this, changing page keeps the scroll offsets of
       the previous one, so the next page renders already scrolled on its first frame.
       The stores are reset alongside because the scroll event only fires on an actual move. */
    $: if (records && scrollBox) {
        scrollBox.scrollTop = 0;
        scrollBox.scrollLeft = 0;
        $isVerticallyScrolled = false;
        $isHorizontallyScrolled = false;
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
        if (showRowNumbers) {
            stickyColumnsWidth.updateColumn(ROW_NUMBER_COLUMN_KEY, 0);
        }
        sortedStickyColumns.forEach((col) => {
            if (col?.sticky) {
                stickyColumnsWidth.updateColumn(col.key, 0);
            }
        });
    }
</script>

<div
    class="scrollbox"
    class:fill={fillHeight}
    style={scrollboxStyle}
    bind:this={scrollBox}
    on:scroll={handleScroll}
>
    <table aria-describedby={description ? tableId : undefined}>
        <Headers
            columns={sortedStickyColumns}
            extraButtonColumn={Boolean(rowProps?.onClick)}
            {extraButtonColumnLabel}
            {showRowNumbers}
            {rowNumberLabel}
            {showFieldTypeIcons}
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

    /* `flex-basis: 0` rather than `auto` (or `height: 100%`) keeps this purely
       free-space driven: the scrollbox never derives its size from the rows, so
       a short parent can shrink it. `min-height: 0` lifts the flex item's
       automatic minimum so it can shrink below the table's content height.
       Not scoped to `--default`: `unstyled` still needs a bounded scrollport. */
    .scrollbox.fill {
        flex: 1 1 0;
        min-height: 0;
        overflow: auto;
        width: 100%;
    }

    :global(.ods-dataviz--default) table {
        border-collapse: separate;
        border-spacing: 0;
        white-space: nowrap;
        width: inherit;
    }
</style>
