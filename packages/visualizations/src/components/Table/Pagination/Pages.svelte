<script lang="ts">
    import Button from './Button.svelte';
    import DoubleLeft from './DoubleLeft.svelte';
    import DoubleRight from './DoubleRight.svelte';
    import SingleLeft from './SingleLeft.svelte';
    import SingleRight from './SingleRight.svelte';
    import { getPages } from './utils';
    import type { Labels } from '../types';

    export let totalPages: number;
    export let current: number;
    export let setPage: (page: number) => void;
    export let labels: Labels = {};

    $: pages = getPages({ current, totalPages });
</script>

<ul>
    <li>
        <Button
            on:click={() => setPage(1)}
            icon={DoubleLeft}
            label={labels.firstPage}
            disabled={current === 1}
        />
    </li>
    <li>
        <Button
            on:click={() => setPage(current - 1)}
            icon={SingleLeft}
            label={labels.previousPage}
            disabled={current === 1}
        />
    </li>
    {#if current - 1 > 1 && totalPages > 3}
        <span>...</span>
    {/if}
    {#each pages as page}
        <li>
            <button on:click={() => setPage(page)} class:current={page === current}>
                {page}
            </button>
        </li>
    {/each}
    {#if current + 1 < totalPages && totalPages > 3}
        <span>...</span>
    {/if}
    <li>
        <Button
            on:click={() => setPage(current + 1)}
            icon={SingleRight}
            label={labels.nextPage}
            disabled={current === totalPages}
        />
    </li>
    <li>
        <Button
            on:click={() => setPage(totalPages)}
            icon={DoubleRight}
            label={labels.lastPage}
            disabled={current === totalPages}
        />
    </li>
</ul>

<style>
    ul {
        margin: 0;
        padding: 0;
        width: 100%;
        display: flex;
        list-style: none;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        line-height: 21px;
    }

    li {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        height: 28px;
        width: 28px;
        text-align: center;
        vertical-align: middle;
    }

    li button {
        border: none;
        background: none;
        cursor: pointer;
        height: 100%;
        width: 100%;
    }

    :global(.ods-dataviz--default) .current {
        border-radius: 3px;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.39);
        background-color: #fff;
        color: #142e7b;
    }
</style>
