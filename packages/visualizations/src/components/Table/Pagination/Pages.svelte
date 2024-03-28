<script lang="ts">
    import Button from './Button.svelte';
    import DoubleLeft from './DoubleLeft.svelte';
    import DoubleRight from './DoubleRight.svelte';
    import SingleLeft from './SingleLeft.svelte';
    import SingleRight from './SingleRight.svelte';

    export let totalPages: number;
    export let current: number;
    export let setPage: (page: number) => void;

    let pages = [current - 1, current, current + 1];
    $: if (totalPages === 2) {
        pages = [1, 2];
    } else if (totalPages === 1) {
        pages = [1];
    } else if (current - 1 < 1) {
        pages = [current, current + 1, current + 2];
    } else if (current + 1 > totalPages) {
        pages = [current - 2, current - 1, current];
    } else {
        pages = [current - 1, current, current + 1];
    }
</script>

<ul>
    <li>
        <Button on:click={() => setPage(1)} icon={DoubleLeft} disabled={current === 1} />
    </li>
    <li>
        <Button on:click={() => setPage(current - 1)} icon={SingleLeft} disabled={current === 1} />
    </li>
    {#if current - 1 > 1}
        <span>...</span>
    {/if}
    {#each pages as page}
        <li on:click={() => setPage(page)} class:current={page === current}>
            {page}
        </li>
    {/each}
    {#if current + 1 < totalPages}
        <span>...</span>
    {/if}
    <li>
        <Button
            on:click={() => setPage(current + 1)}
            icon={SingleRight}
            disabled={current === totalPages}
        />
    </li>
    <li>
        <Button
            on:click={() => setPage(totalPages)}
            icon={DoubleRight}
            disabled={current === totalPages}
        />
    </li>
</ul>

<style lang="scss">
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
        cursor: pointer;
    }

    :global(.ods-dataviz--default) {
        .current {
            border-radius: 3px;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.39);
            background-color: #fff;
            color: #142e7b;
        }
    }
</style>
