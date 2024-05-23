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

    $: ({ value: records } = data);
    $: ({
        columns,
        title,
        subtitle,
        description,
        source,
        unstyled,
        locale: localeOption,
        pagination,
        verticalScroll,
    } = options);
    $: $locale = localeOption || navigator.language;
    /* Preserves paginations controls positioning
    min heigh of table + controls = max-height of row * (number of rows) + headers + pagination
    */
</script>

<Card {title} {subtitle} {source} defaultStyle={!unstyled}>
    <div>
        <Table {records} {columns} {description} {verticalScroll} />
        {#if pagination}
            <Pagination {...pagination} />
        {/if}
    </div>
</Card>

<style>
    :global(.ods-dataviz--default) div {
        max-width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: inherit;
    }
</style>
