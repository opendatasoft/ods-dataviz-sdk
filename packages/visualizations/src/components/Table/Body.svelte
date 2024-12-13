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
                setHovered={() => {
                    hoveredRow = rowIndex;
                }}
                isHovered={hoveredRow === rowIndex}
            />
        {/each}
    {/if}
</tbody>

<style>
</style>
