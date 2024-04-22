<script lang="ts">
    import type { Column } from './types';

    export let columns: Column[];
</script>

<thead>
    <tr>
        {#each columns as column}
            <th class={`table-header--${column.dataFormat}`} on:click={column?.onClick}>
                {column.title}
                {#if column?.sorted}
                    {column.sorted}
                {/if}
            </th>
        {/each}
    </tr>
</thead>

<style>
    :global(.ods-dataviz--default thead) {
        border-bottom: 1px solid var(--border-color);
    }

    :global(.ods-dataviz--default th) {
        text-align: left;
        padding: var(--spacing-75);
    }

    :global(.ods-dataviz--default th.table-header--number) {
        text-align: right;
    }
</style>
