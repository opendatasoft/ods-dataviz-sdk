<script lang="ts">
    import type { Column } from '../types';
    import Th from './Th.svelte';

    export let columns: Column[];
    export let extraButtonColumn = false;
    export let extraButtonColumnLabel: string | undefined;
    export let showRowNumbers = false;
    export let rowNumberLabel = 'Row number';
    export let showFieldTypeIcons = false;
</script>

<thead>
    <tr>
        {#if showRowNumbers}
            <th class="row-number-header" scope="col" aria-label={rowNumberLabel} />
        {/if}
        {#if extraButtonColumn}
            <Th {extraButtonColumnLabel} />
        {/if}
        {#each columns as column (column.key)}
            <Th {column} {showFieldTypeIcons} />
        {/each}
    </tr>
</thead>

<style>
    .row-number-header {
        width: 3rem;
        position: sticky;
        inset-inline-start: 0;
        z-index: 10;
        background-color: white;
    }
</style>
