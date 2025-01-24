<script lang="ts">
    import { isHorizontallyScrolled, stickyColumnsOffset } from '../store';
    import type { Column } from '../types';
    import { getStickyClasses, getStickyOffset } from '../utils';
    import { HOVER_COLUMN_KEY } from '../constants';

    export let column: Column | null = null;
</script>

<!-- To display a format value, rawValue must be different from undefined or null -->
<td
    style={getStickyOffset($stickyColumnsOffset.get(column?.key || HOVER_COLUMN_KEY))}
    class={getStickyClasses({ column, scrolled: $isHorizontallyScrolled })}
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
