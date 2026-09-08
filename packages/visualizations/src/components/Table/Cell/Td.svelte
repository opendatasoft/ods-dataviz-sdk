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
</script>

<!-- To display a format value, rawValue must be different from undefined or null -->
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

<style lang="scss">
    @import '../sticky';
    :global(.ods-dataviz--default td) {
        background-color: white; /* avoids overlap with sticky columns */
        border-bottom: 1px solid var(--border-color);
        overflow: visible;
        padding: 0;
    }
</style>
