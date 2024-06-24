<script lang="ts">
    import type { Column, TableData } from './types';
    import Cell, { LoadingCell } from './Cell';

    export let loadingRowsNumber: number | null;
    export let columns: Column[];
    export let records: TableData;
    export let emptyStateLabel = 'No records found...';
</script>

<tbody>
    {#if records.length === 0}
        <tr>
            <td colspan={columns.length}>
                <em>{emptyStateLabel}</em>
            </td>
        </tr>
    {/if}
    {#if loadingRowsNumber}
        {#each Array(loadingRowsNumber) as _}
            <tr>
                {#each columns as __}
                    <LoadingCell />
                {/each}
            </tr>
        {/each}
    {:else}
        {#each records as record}
            <tr>
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

    :global(.ods-dataviz--default) em {
        text-align: center;
        width: 100%;
        display: block;
    }
</style>
