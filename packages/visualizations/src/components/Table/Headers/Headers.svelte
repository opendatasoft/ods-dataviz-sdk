<script lang="ts">
    import SortButton from './SortButton.svelte';
    import type { Column } from '../types';

    export let columns: Column[];
</script>

<thead>
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

<style lang="scss">
    @import 'variables';
    :global(.ods-viz--default-style thead) {
        border-bottom: 1px solid $border-color;
    }

    :global(.ods-viz--default-style th) {
        text-align: left;
        padding: $spacing-75;
    }

    :global(.ods-viz--default-style th.table-header--number) {
        text-align: right;
    }
</style>
