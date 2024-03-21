<script lang="ts">
    import type { TableProps } from './types';
    import { MAX_ROW_HEIGHT } from './constants';
    import Table from './Table.svelte';
    import Pagination from './Pagination/Pagination.svelte';
    import Card from '../utils/Card.svelte';

    import { updateLocale } from './store';

    // ensure exported type matches declared props
    type $$Props = TableProps;

    export let data: $$Props['data'];
    export let options: $$Props['options'];

    $: ({ value: records } = data);
    $: ({ columns, title, subtitle, description, source, unstyled, locale, pages } = options);
    $: updateLocale(locale);
    /* Preserves paginations controls positioning
    min heigh of table + controls = max-height of row * (number of rows) + headers + pagination
    */
    $: minHeight = pages ? `${MAX_ROW_HEIGHT * pages.recordsPerPage + 39 + 54}px` : 'none';
</script>

<Card {title} {subtitle} {source} defaultStyle={!unstyled}>
    <div style="--min-height: {minHeight};">
        <Table {records} {columns} {description} />
        {#if pages}
            <Pagination {...pages} />
        {/if}
    </div>
</Card>

<style>
    :global(.ods-dataviz--default) div {
        max-width: 100%;
        min-height: var(--min-height);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
</style>
