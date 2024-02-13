<script lang="ts">
    import type { Column, TableData } from './types';
    import Cell from './Cell.svelte';

    function parseValue(value: unknown) {
        return value === undefined || value === null ? '' : value;
    }

    export let columns: Column[];
    export let records: TableData;
</script>

<tbody>
    {#each records as record}
        <tr>
            {#each columns as column}
                <Cell value={parseValue(record[column.key])} />
            {/each}
        </tr>
    {/each}
</tbody>

<style lang="scss">
    :global(.ods-dataviz-sdk-table--default) {
        tbody tr {
            &:not(:last-child) {
                border-bottom: 1px solid var(--border-color);
            }
            &:hover {
                background-color: var(--active-row-background-color);
            }
        }
    }
</style>
