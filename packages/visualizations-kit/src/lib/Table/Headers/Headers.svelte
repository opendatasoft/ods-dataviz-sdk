<script lang="ts">
    import SortButton from './SortButton.svelte';
    import type { Column } from '../types';

    interface Props {
        columns: Column[];
        extraButtonColumn?: boolean;
    }

    let { columns, extraButtonColumn = false }: Props = $props();
</script>

<thead>
    <tr>
        {#if extraButtonColumn}
            <th></th>
        {/if}
        {#each columns as column}
            <th class={`table-header--${column.dataFormat}`}>
                {#if column.onClick}
                    <SortButton
                        sorted={column?.sorted}
                        onclick={column.onClick}
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
