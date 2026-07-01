<script lang="ts">
    import Button from './Button.svelte';
    import type { CursorPagination } from './types';

    export let current: number;
    export let pagesAhead: number;
    export let onPageChange: (page: number) => void;
    export let labels: CursorPagination['labels'] = {};

    $: hasNextPage = pagesAhead >= 1;
    $: hasTrailingEllipsis = pagesAhead >= 2;
</script>

<ul>
    <li>
        <Button
            on:click={() => onPageChange(current - 1)}
            pointingAngle="singleLeft"
            label={labels?.previousPage}
            disabled={current === 1}
            class="arrow-button"
        />
    </li>
    {#if current > 2}
        <li aria-hidden="true" class="ellipsis">…</li>
    {/if}
    {#if current > 1}
        <li>
            <button on:click={() => onPageChange(current - 1)} class="page-button">
                {current - 1}
            </button>
        </li>
    {/if}
    <li>
        <button class="page-button page-button--active" aria-current="page">
            {current}
        </button>
    </li>
    {#if hasNextPage}
        <li>
            <button on:click={() => onPageChange(current + 1)} class="page-button">
                {current + 1}
            </button>
        </li>
    {/if}
    {#if hasTrailingEllipsis}
        <li aria-hidden="true" class="ellipsis">…</li>
    {/if}
    <li>
        <Button
            on:click={() => onPageChange(current + 1)}
            pointingAngle="singleRight"
            label={labels?.nextPage}
            disabled={!hasNextPage}
            class="arrow-button"
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
        height: 28px;
        min-width: 28px;
        text-align: center;
    }

    li button {
        border: none;
        background: none;
        cursor: pointer;
        height: 100%;
        width: 100%;
    }

    .ellipsis {
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: none;
    }

    :global(.page-button--active) {
        border-radius: 3px;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.39);
        background-color: #fff;
        color: #000;
    }
</style>
