<script lang="ts">
    import { sum, sumBy } from 'lodash';
    import type { DataFrame } from '../types';
    import type { Column, TableOptions } from './types';
    import type { Async } from '../../types';
    import Pagination from './Pagination.svelte';

    export let data: Async<DataFrame>;
    export let options: TableOptions;

    $: ({ value: records } = data);
    $: ({ unstyled = false, columns, pages, fixedHeader, defaultSortKey } = options);
    $: defaultStyle = !unstyled;
    $: sorted = defaultSortKey;

    const format = (column: Column, record: Record<string, unknown>) => {
        if (typeof column?.format === 'function') {
            return column.format(record[column.key]);
        }
        return record[column.key];
    };

    const reOrder = (onSort: Required<Column>['onSort'], key: string) => {
        if (records?.sort) {
            records = [...records.sort(onSort)];
            sorted = key;
        }
    };

    const columnOffSet = (cols: Column[], index: number) => {
        return sumBy(cols.slice(0, index), col => col.width || 0);
    };
</script>

<div class="scroll-container">
    <table class:defaultStyle style="width: 1400px;">
        <colgroup>
            {#each columns as column}
                <col style="width: {column.width}px;">
            {/each}
        </colgroup>
        <thead class:fixedHeader>
            <tr>
                {#each columns as column, i}
                    <th style="position: {column.fixed ? 'sticky' : ''}; left: {column.fixed ? columnOffSet(columns, i): ''}px;">
                        {column.title}
                        {#if column?.onSort}
                            <button on:click={() => reOrder(column.onSort, column.key)}>sort</button>
                        {/if}
                        {#if sorted === column.key}
                            <span>I'm sorted</span>
                        {/if}
                    </th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#if records}
                {#each records as record}
                    <tr>
                        {#each columns as column, i}
                            <td style="position: {column.fixed ? 'sticky' : ''}; left: { column.fixed ? columnOffSet(columns, i): ''}px;">
                                {@html format(column, record)}
                            </td>
                        {/each}
                    </tr>
                {/each}
            {/if}
        </tbody>
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
        table-layout: fixed;
    }
    table.defaultStyle {
        border: 2px solid black;
    }

    th,
    td {
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .defaultStyle th {
        padding: 13px;
        background: white;
        border-bottom: 1px solid lightgray;
    }

    thead.fixedHeader {
        /* Nice implem' 😎 */
        position: sticky;
        top: 0;
    }
</style>
