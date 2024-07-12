<script lang="ts">
    import Pagination from 'components/Pagination/Pagination.svelte';
    import Card from 'components/utils/Card/Card.svelte';
    import type { TableProps } from './types';
    import Table from './Table.svelte';
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
    <div class="ods-viz-table">
        <Table {loadingRowsNumber} {records} {columns} {description} {emptyStateLabel} />
        {#if pagination}
            <Pagination {...pagination} />
        {/if}
    </div>
</Card>

<style lang="scss">
    @import 'variables';
    :global(.ods-viz--default-style .ods-viz-table)  {
        border: solid 1px $border-color;
        border-radius: $border-radius-6;
        margin-bottom: $spacing-100;
        overflow: hidden;
        background-color: $background-color;
        max-width: 100%;
    }

    :global(.ods-viz-table .ods-viz-pagination) {
        border-top: solid 1px $border-color;
    }
</style>
