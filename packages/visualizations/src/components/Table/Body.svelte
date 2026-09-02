<script lang="ts">
    import type { Column, RowProps, TableData } from './types';
    import { LoadingCell } from './Cell';
    import EmptyRow from './EmptyRow.svelte';
    import Row from './Row.svelte';

    export let loadingRowsNumber: number | null;
    export let columns: Column[];
    export let rowProps: RowProps | undefined;
    export let records: TableData | undefined;
    export let emptyStateLabel: string | undefined;
    export let showRowNumbers = false;
    export let rowOffset = 0;

    let hoveredRow: number | null;
</script>

<tbody
    on:mouseleave={() => {
        hoveredRow = null;
    }}
>
    {#if records?.length === 0 && !loadingRowsNumber}
        <EmptyRow label={emptyStateLabel} />
    {/if}
    {#if loadingRowsNumber}
        {#each Array(loadingRowsNumber) as _}
            <tr>
                {#if rowProps?.onClick}
                    <td class="button-cell__empty" />
                {/if}
                {#if showRowNumbers}
                    <td class="row-number-cell row-number-cell--loading" />
                {/if}
                {#each columns as __}
                    <LoadingCell />
                {/each}
            </tr>
        {/each}
    {:else if records}
        {#each records as record, rowIndex}
            <Row
                {columns}
                {rowProps}
                {record}
                {rowIndex}
                {rowOffset}
                {showRowNumbers}
                setHovered={() => {
                    hoveredRow = rowIndex;
                }}
                isHovered={hoveredRow === rowIndex}
            />
        {/each}
    {/if}
</tbody>

<style>
    .button-cell__empty {
        min-width: 28px;
    }

    /* The loading placeholder isn't rendered through <Td>, so it doesn't get the generic
       .sticky positioning — pin it the same way it always rendered (real cells now measure
       their offset instead, see Td.svelte). */
    :global(.ods-dataviz--default .row-number-cell--loading) {
        position: sticky;
        inset-inline-start: 0;
        z-index: 10;
    }

    :global(.ods-dataviz--default .row-number-cell) {
        text-align: end;
        min-width: 3rem;
        color: var(--text-color-muted, grey);
        font-variant-numeric: tabular-nums;
        user-select: none;
        padding-inline-end: var(--spacing-75);
    }
</style>
