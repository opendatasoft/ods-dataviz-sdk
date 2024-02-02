<script lang="ts">
    import { sumBy } from 'lodash';
    import type { DataFrame } from '../types';
    import type { Column, TableOptions } from './types';
    import type { Async } from '../../types';
    import Pagination from './Pagination.svelte';
    import ColGroup from './ColGroup.svelte';
    import Header from './Header.svelte';
    import Body from './Body.svelte';

    export let data: Async<DataFrame>;
    export let options: TableOptions;

    $: ({ value: records } = data);
    $: ({ unstyled = false, columns, pages, fixedHeader, defaultSortKey } = options);
    $: defaultStyle = !unstyled;

    const sortRecords = (onSort: Required<Column>['sort']['onSort']) => {
        if (records?.sort) {
            records = [...records.sort(onSort)];
        }
    };
</script>

<div class="scroll-container">
    <table class:defaultStyle style="width: {sumBy(columns, (col) => col?.width || 0)}px;">
        <ColGroup {columns} />
        <Header 
            {columns}
            {sortRecords}
            {defaultSortKey}
            fixed={fixedHeader}
        />
        {#if records}
            <Body
                {records}
                {columns}
            />           <!-- content here -->
        {/if}
        {#if pages}
            <Pagination {...pages} />
        {/if}
    </table>
</div>

<style>
    .scroll-container {
        width: 100%;
        overflow: auto hidden;
    }
    table {
        min-width: 100%;
        table-layout: fixed;
    }
    table.defaultStyle {
        border: 2px solid black;
    }
</style>
