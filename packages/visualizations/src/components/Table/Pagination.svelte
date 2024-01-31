<script lang="ts">
    import type { TableOptions } from "./types";

    export let setPage: Required<TableOptions>['pages']['setPage'];
    export let current: number;
    export let total: number;

    $: pagination = Array.from({length: total - 1}, (_, i) => i + 2);
</script>

<ul>
    <li on:click={() => setPage(current - 1)}>
        <button>{'<<'}</button>
    </li>
    {#each pagination as page}
        <li on:click={() => setPage(page)}>{page}</li>
    {/each}
    <li on:click={() => setPage(current + 1)}>
        <button>{'>>'}</button>
    </li>
</ul>

<style>
    ul {
        display: flex;
        list-style: none;
    }
</style>

<!-- markup (zero or more items) goes here -->