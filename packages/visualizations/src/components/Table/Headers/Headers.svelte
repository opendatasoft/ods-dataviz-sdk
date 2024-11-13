<script lang="ts">
    import SortButton from './SortButton.svelte';
    import type { Column } from '../types';

    export let columns: Column[];
    export let extraButtonColumn = false;
</script>

<thead>
    <tr>
        {#if extraButtonColumn}
            <th />
        {/if}
        {#each columns as column}
            {#if extraButtonColumn}
                <th />
            {/if}
            <th class={`table-header--${column.dataFormat}`}>
                {#if column.onClick}
                    <SortButton
                        sorted={column?.sorted}
                        on:click={column.onClick}
                        labels={column.sortLabels}
                    >
                        {column.title}
                    </SortButton>
                {:else}
                    {column.title}
                {/if}
            </th>{/each}
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
