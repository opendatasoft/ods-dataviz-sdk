<script lang="ts">
    import type { Column, ColumnSorter } from './types';
    import { columnOffset } from './utils';

    export let columns: Column[];
    export let fixed: boolean | undefined;
    export let sortRecords: ((onSort: ColumnSorter) => void)| undefined;
    export let defaultSortKey: string | undefined;
    
    let sortedCol = {
        key: defaultSortKey || null,
        ascending: true,
    };

    const sortColumn = (column: Column) => {
        if (!sortRecords || !column?.sort) return;

        const isSorted = sortedCol.key === column.key;
        const { onSort } = column.sort;
        sortedCol = {
            key: column.key,
            ascending: isSorted ? !sortedCol.ascending : true,
        };
        sortRecords(onSort);
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