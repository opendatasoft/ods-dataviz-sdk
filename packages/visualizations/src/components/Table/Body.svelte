<script lang="ts">
    import type { Column } from './types';
    import Cell from './Cell.svelte';
    import { columnOffset } from './utils';
    import type { DataFrame } from '../types';

    export let columns: Column[];
    export let records: DataFrame;
</script>

<tbody>
    {#each records as record}
        <tr>
            {#each columns as column, i}
                <Cell {column} {record} offset={columnOffset(columns, i)} />
            {/each}
        </tr>
    {/each}
</tbody>
