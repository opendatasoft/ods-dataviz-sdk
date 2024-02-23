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
