<script lang="ts">
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
        {#each columns as column (column.key)}
            <Th {column} dataFormat={column.dataFormat} {isHorizontallyScrolled} />
        {/each}
    </tr>
</thead>

<style>
</style>
