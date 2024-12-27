<script lang="ts">
    import Button from './Button.svelte';
    import { getPages } from './utils';
    import type { Pagination } from './types';

    interface Props {
        totalPages: number;
        current: number;
        labels: Pagination['labels'];
        onPageChange: (page: number) => void;
    }

    let {
        totalPages,
        current,
        labels,
        onPageChange
    }: Props = $props();

    let pages = $derived(getPages({ current, totalPages }));
</script>

<ul>
    <li>
        <Button
            on:click={() => onPageChange(1)}
            pointingAngle="doubleLeft"
            label={labels?.firstPage}
            disabled={current === 1}
            class="arrow-button"
        />
    </li>
    <li>
        <Button
            on:click={() => onPageChange(current - 1)}
            pointingAngle="singleLeft"
            label={labels?.previousPage}
            disabled={current === 1}
            class="arrow-button"
        />
    </li>
    {#if current - 1 > 1 && totalPages > 3}
        <span>...</span>
    {/if}
    {#each pages as page}
        <li>
            <button
                onclick={() => onPageChange(page)}
                class="page-button"
                class:page-button--active={page === current}
            >
                {page}
            </button>
        </li>
    {/each}
    {#if current + 1 < totalPages && totalPages > 3}
        <span>...</span>
    {/if}
    <li>
        <Button
            on:click={() => onPageChange(current + 1)}
            pointingAngle="singleRight"
            label={labels?.nextPage}
            disabled={current === totalPages}
            class="arrow-button"
        />
    </li>
    <li>
        <Button
            on:click={() => onPageChange(totalPages)}
            pointingAngle="doubleRight"
            label={labels?.lastPage}
            disabled={current === totalPages}
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

    :global(.page-button--active) {
        border-radius: 3px;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.39);
        background-color: #fff;
        color: #000;
    }
</style>
