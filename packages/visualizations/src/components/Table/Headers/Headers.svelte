<script lang="ts">
    import type { Column } from '../types';
    import Th from './Th.svelte';

    export let columns: Column[];
    export let extraButtonColumn = false;
    export let extraButtonColumnLabel: string | undefined;
    export let stickyHeader = false;
</script>

<thead>
    <tr>
        {#if extraButtonColumn}
            <Th {extraButtonColumnLabel} {stickyHeader} />
        {/if}
        {#each columns as column (column.key)}
            <Th {column} {stickyHeader} />
        {/each}
    </tr>
</thead>

<style>
</style>
