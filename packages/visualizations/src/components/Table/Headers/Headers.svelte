<script lang="ts">
    import type { Column } from '../types';
    import Th from './Th.svelte';

    export let columns: Column[];
    export let extraButtonColumn = false;
    export let extraButtonColumnLabel: string | undefined;
    export let showRowNumbers = false;
</script>

<thead>
    <tr>
        {#if showRowNumbers}
            <th class="row-number-header" scope="col" aria-label="Row number" />
        {/if}
        {#if extraButtonColumn}
            <Th {extraButtonColumnLabel} />
        {/if}
        {#each columns as column (column.key)}
            <Th {column} />
        {/each}
    </tr>
</thead>

<style>
    .row-number-header {
        width: 2rem;
        position: sticky;
        inset-inline-start: 0;
        z-index: 10;
        background-color: white;
    }
</style>
