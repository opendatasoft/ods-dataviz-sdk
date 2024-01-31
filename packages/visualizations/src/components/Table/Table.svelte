<script lang="ts">
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
    $: console.log(defaultSortKey, sorted);
    
</script>

<table class:defaultStyle>
    <colgroup>
        {#each columns as _}
            <col>
        {/each}
    </colgroup>
    <thead class:fixedHeader>
        <tr>
            {#each columns as column}
                <th>
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
                    {#each columns as column}
                        <td>{@html format(column, record)}</td>
                    {/each}
                </tr>
            {/each}
        {/if}
    </tbody>
    {#if pages}
        <Pagination {...pages} />
    {/if}
</table>

<style>
    table.defaultStyle {
        border: 2px solid black;
    }

    th, td {
        overflow: hidden;
        text-overflow: ellipsis;
    }

    thead.fixedHeader {
        /* Nice implem' 😎 */
        position: sticky;
        top: 0;
    }

    col {
        width: 200px;
    }
</style>
