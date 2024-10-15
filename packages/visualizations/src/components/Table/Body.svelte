<script lang="ts">
    import type { Column, TableData } from './types';
    import Cell, { LoadingCell } from './Cell';
    import EmptyRow from './EmptyRow.svelte';

    export let loadingRowsNumber: number | null;
    export let columns: Column[];
    export let records: TableData | undefined;
    export let emptyStateLabel: string | undefined;
    export let rowClickCallback: ((record: Record<string, any>) => void) | undefined;
</script>

<tbody>
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
        {#each records as record}
            <tr on:click={rowClickCallback ? (() => rowClickCallback(record)) : null}>
                {#each columns as column}
                    <Cell rawValue={record[column.key]} {column} />
                {/each}
            </tr>
        {/each}
    {/if}
</tbody>

<style>
    :global(.ods-dataviz--default) tr {
        border-bottom: 1px solid var(--border-color);
    }

    :global(.ods-dataviz--default) tr:last-child {
        border-bottom: none;
    }
</style>
