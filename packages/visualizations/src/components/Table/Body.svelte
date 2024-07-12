<script lang="ts">
    import type { Column, TableData } from './types';
    import Cell, { LoadingCell } from './Cell';

    export let loadingRowsNumber: number | null;
    export let columns: Column[];
    export let records: TableData | undefined;
    export let emptyStateLabel = 'No records found...';
</script>

<tbody>
    {#if records?.length === 0 && !loadingRowsNumber}
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
    {:else if records}
        {#each records as record}
            <tr>
                {#each columns as column}
                    <Cell rawValue={record[column.key]} {column} />
                {/each}
            </tr>
        {/each}
    {/if}
</tbody>

<style lang="scss">
    @import 'variables';
    :global(.ods-viz--default-style) tr {
        border-bottom: 1px solid $border-color;
    }

    :global(.ods-viz--default-style) tr:last-child {
        border-bottom: none;
    }

    :global(.ods-viz--default-style) em {
        text-align: center;
        width: 100%;
        display: block;
    }
</style>
