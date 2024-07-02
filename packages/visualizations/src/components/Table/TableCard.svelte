<script lang="ts">
    import type { TableProps } from './types';
    import Table from './Table.svelte';
    import Pagination from '../Pagination/Pagination.svelte';
    import Card from '../utils/Card.svelte';
    import { locale } from './store';

    // ensure exported type matches declared props
    type $$Props = TableProps;

    export let data: $$Props['data'];
    export let options: $$Props['options'];

    $: ({ value: records, loading: isLoading } = data);
    $: ({
        columns,
        title,
        subtitle,
        description,
        source,
        unstyled,
        locale: localeOption,
        pagination,
        emptyStateLabel,
    } = options);
    $: $locale = localeOption || navigator.language;
    $: defaultLoadingRowsNumber = pagination ? pagination.recordsPerPage : 5;
    $: loadingRowsNumber = isLoading ? defaultLoadingRowsNumber : null;
    /* Preserves paginations controls positioning
    min heigh of table + controls = max-height of row * (number of rows) + headers + pagination
    */
</script>

<Card {title} {subtitle} {source} defaultStyle={!unstyled}>
    <div class="table-container">
        <Table {loadingRowsNumber} {records} {columns} {description} {emptyStateLabel} />
        {#if pagination}
            <Pagination {...pagination} />
        {/if}
    </div>
</Card>

<style>
    :global(.ods-dataviz--default) .table-container {
        border: solid 1px var(--border-color);
        border-radius: var(--border-radius-2);
        margin-bottom: var(--spacing-100);
    }
    :global(.ods-dataviz--default) div {
        max-width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
</style>
