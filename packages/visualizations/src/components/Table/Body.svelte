<script lang="ts">
    import type { Column, RowProps, TableData } from './types';
    import Td, { LoadingCell } from './Cell';
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
                    <Td>
                        <div class="button-cell__empty" />
                    </Td>
                {/if}
                {#if showRowNumbers}
                    <Td rowNumber />
                {/if}
                {#each columns as column}
                    <LoadingCell {column} />
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
        width: 28px;
        height: 28px;
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
