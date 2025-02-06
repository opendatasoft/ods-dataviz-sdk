<script lang="ts">
    import { getContext } from 'svelte';
    import type { StickyStores, Column } from '../types';
    import { getStickyClasses, getStickyOffset } from '../sticky';
    import { HOVER_COLUMN_KEY } from '../constants';

    export let column: Column | null = null;

    const { isHorizontallyScrolled, stickyColumnsOffset, lastStickyColumn } =
        getContext<StickyStores>('sticky-stores');
</script>

<!-- To display a format value, rawValue must be different from undefined or null -->
<td
    style={getStickyOffset($stickyColumnsOffset.get(column?.key || HOVER_COLUMN_KEY))}
    class={getStickyClasses({
        column,
        scrolled: $isHorizontallyScrolled,
        lastStickyColumn: $lastStickyColumn,
    })}
    class:button-cell={!column}
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
