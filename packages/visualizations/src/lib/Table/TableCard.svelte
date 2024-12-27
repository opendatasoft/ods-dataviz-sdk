<script lang="ts">
    import Pagination from '$lib/Pagination/Pagination.svelte';
    import Card from '$lib/utils/Card.svelte';
    import type { TableProps } from './types';
    import { locale } from './locale.svelte';
    import Table from './Table.svelte';

    let { 
        data,
        columns,
        rowProps,
        title,
        subtitle,
        description,
        source,
        unstyled,
        locale: localeOption = navigator.language,
        pagination,
        emptyStateLabel
    }: TableProps = $props();

    $effect(() => {
        locale.locale = localeOption;
    });
    let { value: records, loading: isLoading } = $derived(data);
    let defaultLoadingRowsNumber = $derived(pagination ? pagination.recordsPerPage : 5);
    let loadingRowsNumber = $derived(isLoading ? defaultLoadingRowsNumber : null);
    /* Preserves paginations controls positioning
    min heigh of table + controls = max-height of row * (number of rows) + headers + pagination
    */
</script>

<Card {title} {subtitle} {source} defaultStyle={!unstyled}>
    <div class="table-container">
        <Table {loadingRowsNumber} {records} {columns} {description} {emptyStateLabel} {rowProps} />
        {#if pagination}
            <Pagination {...pagination} />
        {/if}
    </div>
</Card>

<style>
    :global(.ods-dataviz--default) .table-container {
        border: solid 1px var(--border-color);
        border-radius: var(--border-radius-6);
        margin-bottom: var(--spacing-100);
        overflow: hidden;
        background-color: var(--background-color);
        position: relative;
    }
    :global(.ods-dataviz--default) div {
        max-width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    :global(.table-container .pagination) {
        border-top: solid 1px var(--border-color);
    }
</style>
