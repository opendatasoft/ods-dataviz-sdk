<script lang="ts">
    import { assertUnreachable } from '../utils';
    import type { Column, ColumnSorter, Order, SortKey } from './types';
    import { columnOffset } from './utils';

    export let columns: Column[];
    export let fixed: boolean | undefined;
    export let defaultSortKey: SortKey | undefined;
    
    let sortedCol = defaultSortKey;

    const nextOrder = (order?: Order) => {
        switch(order) {
            case null: return 'desc';
            case 'desc': return 'asc';
            case 'asc': return null;
            default: return 'asc';
        }
    };
    const sortColumn = (column: Column) => {
        if (!column?.sort) return;

        const { onSort } = column.sort;
        onSort();

        sortedCol = {
            key: column.key,
            order: nextOrder(sortedCol?.order)
        };         
    };
    
</script>

<thead class:fixed>
    <tr>
        {#each columns as column, i}
            <th style="position: {column.fixed ? 'sticky' : ''}; left: {column.fixed ? columnOffset(columns, i): ''}px;">
                {column.title}
                {#if column?.sort}
                    <button 
                        on:click={() => sortColumn(column)}
                        aria-label={column.sort.label}
                    >
                        sort
                    </button>
                {/if}
            </th>
        {/each}
    </tr>
</thead>

<style>
    th {
        overflow: hidden;
        text-overflow: ellipsis;
    }

    thead.fixed {
        /* Nice implem' 😎 */
        position: sticky;
        top: 0;
    }

    th,


    :global(.defaultStyle) th {
        padding: 13px;
        background: white;
        border-bottom: 1px solid lightgray;
    }
</style>