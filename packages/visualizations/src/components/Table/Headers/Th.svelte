<script lang="ts">
    import type { Column, DataFormat } from '../types';
    import { stickyColumnsWidth, stickyColumnsOffset, isHorizontallyScrolled } from '../store';
    import { getStickyClasses } from '../utils';
    import SortButton from './SortButton.svelte';

    export let column: Column;
    export let dataFormat: DataFormat;

    let clientWidth: number;

    // Only updates columns that have been initialized after a reset in Table.svelte
    $: if ($stickyColumnsWidth.has(column.key)) {
        stickyColumnsWidth.updateColumn(column.key, clientWidth);
    }
</script>

<th
    style={`--sticky-offset: ${$stickyColumnsOffset.get(column.key)}px`}
    class={`table-header--${dataFormat} ${getStickyClasses(column, $isHorizontallyScrolled)}`}
    bind:clientWidth
>
    {#if column.onClick}
        <SortButton sorted={column?.sorted} on:click={column.onClick} labels={column.sortLabels}>
            {column.title}
        </SortButton>
    {:else}
        {column.title}
    {/if}
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
