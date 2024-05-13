<script lang="ts">
    import SortButton from './SortButton.svelte';
    import type { Column } from '../types';

    export let columns: Column[];
    export let verticalScroll: boolean | undefined;
</script>

<thead class:sticky-top={verticalScroll}>
    <tr>
        {#each columns as column}
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
    
    thead.sticky-top {
        background-color: var(--header-background-color);
        box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.26);
        position: sticky;
        top: 0;
    }
</style>
