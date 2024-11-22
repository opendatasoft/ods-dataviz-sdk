<script lang="ts">
    import SortButton from './SortButton.svelte';
    import type { Column } from '../types';
    import Th from './Th.svelte';

    export let isHorizontallyScrolled: boolean;
    export let columns: Column[];
    export let extraButtonColumn = false;
</script>

<thead>
    <tr>
        {#if extraButtonColumn}
            <th />
        {/if}
        {#each columns as column, index}
            <Th 
                sticky={column?.sticky}
                dataFormat={column.dataFormat}
                {index}
                {isHorizontallyScrolled}
            >
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
