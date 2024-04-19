<script lang="ts">
    import Button from './Button.svelte';
    import DoubleLeft from './DoubleLeft.svelte';
    import DoubleRight from './DoubleRight.svelte';
    import SingleLeft from './SingleLeft.svelte';
    import SingleRight from './SingleRight.svelte';
    import { getPages } from './utils';
    import { getPages } from './utils';

    export let totalPages: number;
    export let current: number;
    export let onPageChange: (page: number) => void;

    $: pages = getPages({ current, totalPages });
    $: pages = getPages({ current, totalPages });
</script>

<ul>
    <li>
        <Button on:click={() => onPageChange(1)} icon={DoubleLeft} disabled={current === 1} />
    </li>
    <li>
        <Button on:click={() => onPageChange(current - 1)} icon={SingleLeft} disabled={current === 1} />
    </li>
    {#if current - 1 > 1 && totalPages < 3}
    {#if current - 1 > 1 && totalPages < 3}
        <span>...</span>
    {/if}
    {#each pages as page}
        <li>
            <button on:click={() => onPageChange(page)} class:current={page === current}>
                {page}
            </button>
        </li>
    {/each}
    {#if current + 1 < totalPages && totalPages > 3}
    {#if current + 1 < totalPages && totalPages > 3}
        <span>...</span>
    {/if}
    <li>
        <Button
            on:click={() => onPageChange(current + 1)}
            icon={SingleRight}
            disabled={current === totalPages}
        />
    </li>
    <li>
        <Button
            on:click={() => onPageChange(totalPages)}
            icon={DoubleRight}
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
    }

    li button {
        border: none;
        background: none;
        cursor: pointer;
        height: 100%;
        width: 100%;
        height: 100%;
        width: 100%;
    }

    :global(.ods-dataviz--default) .current {
        border-radius: 3px;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.39);
        background-color: #fff;
        color: #142e7b;
    :global(.ods-dataviz--default) .current {
        border-radius: 3px;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.39);
        background-color: #fff;
        color: #142e7b;
    }
</style>
