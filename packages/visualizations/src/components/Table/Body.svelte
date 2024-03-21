<script lang="ts">
    import type { Column, TableData } from './types';
    import Cell from './Cell';

    export let columns: Column[];
    export let records: TableData;
</script>

<tbody>
    {#each records as record}
        <tr>
            {#each columns as column}
                <Cell rawValue={record[column.key]} {column} />
            {/each}
        </tr>
    {/each}
</tbody>

<style>
    :global(.ods-dataviz--default) tr {
        border-bottom: 1px solid var(--border-color);
    }

    :global(.ods-dataviz--default) tr:last-child {
        border-bottom: none;
    }
</style>