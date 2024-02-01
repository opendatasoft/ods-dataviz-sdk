<script lang="ts">
    import type { TableOptions } from "./types";

    export let setPage: Required<TableOptions>['pages']['setPage'];
    export let initial: number;
    export let total: number;
    
    let current = initial;
    const changePage = (page: number) => {
        setPage(page);
        current = page;
    };

    $: pages = [...Array(total).keys()];
</script>

<ul>
    <li on:click={() => changePage(current - 1)}>
        <button>{'<<'}</button>
    </li>
    {#each pages as page}
        <li 
            on:click={() => changePage(page)}
            class:current={page === current}
        >
            {page}
        </li>
    {/each}
    <li on:click={() => changePage(current + 1)}>
        <button>{'>>'}</button>
    </li>
</ul>

<style>
    ul {
        display: flex;
        list-style: none;
    }

    li {
        cursor: pointer;
        margin-left: 6px;
    }

    .current {
        color: red;
        border: 1px solid;
        padding: 3px;
    }
</style>

<!-- markup (zero or more items) goes here -->