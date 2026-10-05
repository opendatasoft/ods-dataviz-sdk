<script lang="ts">
    import { getContext } from 'svelte';
    import type { StickyStores, Column } from '../types';
    import { getStickyClasses, getStickyOffset } from '../sticky';
    import { HOVER_COLUMN_KEY, ROW_NUMBER_COLUMN_KEY } from '../constants';

    export let column: Column | null = null;
    export let rowNumber = false;

    const { isHorizontallyScrolled, stickyColumnsOffset, lastStickyColumn } =
        getContext<StickyStores>('sticky-stores');

    $: columnKey = rowNumber ? ROW_NUMBER_COLUMN_KEY : column?.key || HOVER_COLUMN_KEY;
    $: sticky = rowNumber || (column ? Boolean(column.sticky) : true);
    $: rowHeader = Boolean(column?.rowHeader);
</script>

<!-- To display a format value, rawValue must be different from undefined or null -->
<!-- Two branches rather than <svelte:element>, which needs svelte >= 3.47 (peer range starts at 3.43) -->
{#if rowHeader}
    <th
        scope="row"
        style={getStickyOffset($stickyColumnsOffset.get(columnKey))}
        class={`${getStickyClasses({
            columnKey,
            sticky,
            scrolled: $isHorizontallyScrolled,
            lastStickyColumn: $lastStickyColumn,
        })} row-header-cell`}
    >
        <slot />
    </th>
{:else}
    <td
        style={getStickyOffset($stickyColumnsOffset.get(columnKey))}
        class={getStickyClasses({
            columnKey,
            sticky,
            scrolled: $isHorizontallyScrolled,
            lastStickyColumn: $lastStickyColumn,
        })}
        class:button-cell={!column && !rowNumber}
        class:row-number-cell={rowNumber}
    >
        <slot />
    </td>
{/if}

<style lang="scss">
    @import '../sticky';
    :global(.ods-dataviz--default td),
    :global(.ods-dataviz--default th.row-header-cell) {
        background-color: white; /* avoids overlap with sticky columns */
        border-bottom: 1px solid var(--border-color);
        overflow: visible;
        padding: 0;
    }
    /* Row headers: muted and separated from the values (overridable through the variables) */
    :global(.ods-dataviz--default tbody th.row-header-cell) {
        text-align: start;
        font-weight: normal;
        background-color: var(--table-row-header-background, #f6f6f6);
        color: var(--table-row-header-color, #5b5b5b);
        border-inline-end: 2px solid var(--table-row-header-border-color, #dbdbdb);
    }
</style>
