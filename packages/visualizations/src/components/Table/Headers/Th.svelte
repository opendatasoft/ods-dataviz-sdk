<script lang="ts">
    import type { DataFormat } from '../types';
    import { stickyColumnsWidth, stickyColumnsOffset, lastStickyColumn } from '../store';

    export let key: string;
    export let dataFormat: DataFormat;
    export let isHorizontallyScrolled: boolean;
    let clientWidth: number;

    // Only updates columns that have been initialized after a reset in Table.svelte
    $: if ($stickyColumnsWidth.has(key)) {
        stickyColumnsWidth.updateColumn(key, clientWidth);
    }
</script>

<th
    style={`--sticky-offset: ${$stickyColumnsOffset.get(key)}px`}
    class={`table-header--${dataFormat}`}
    class:sticky={$stickyColumnsWidth.has(key)}
    class:isLastSticky={key === $lastStickyColumn}
    class:isHorizontallyScrolled
    bind:clientWidth
>
    <slot />
</th>

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
</style>
