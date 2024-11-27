<script lang="ts">
    import SortButton from './SortButton.svelte';
    import type { Column } from '../types';
    import Th from './Th.svelte';

    export let isHorizontallyScrolled: boolean;
    export let columns: Column[];
</script>

<thead>
    <tr>
        {#each columns as column (column.key)}
            <Th dataFormat={column.dataFormat} key={column.key} {isHorizontallyScrolled}>
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
            </Th>
        {/each}
    </tr>
</thead>

<style>
</style>
