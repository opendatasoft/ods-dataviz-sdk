<script lang="ts">
    import { getContext } from 'svelte';
    import type { Column, StickyStores } from '../types';
    import Th from './Th.svelte';

    export let columns: Column[];
    export let extraButtonColumn = false;
    export let extraButtonColumnLabel: string | undefined;

    const { stickyHeader, isVerticallyScrolled } = getContext<StickyStores>('sticky-stores');
</script>

<thead
    class:sticky-header={$stickyHeader}
    class:isVerticallyScrolled={$stickyHeader && $isVerticallyScrolled}
>
    <tr>
        {#if extraButtonColumn}
            <Th {extraButtonColumnLabel} />
        {/if}
        {#each columns as column (column.key)}
            <Th {column} />
        {/each}
    </tr>
</thead>

<style>
    /* The whole row is pinned as one layer, so the shadow stays a single stable line:
       a per-cell shadow would break apart as non-sticky columns scroll under sticky ones. */
    .sticky-header {
        position: sticky;
        top: 0;
        z-index: 20;
    }

    .sticky-header.isVerticallyScrolled {
        box-shadow: 0 6px 6px -6px rgba(0, 0, 0, 0.13);
    }
</style>
