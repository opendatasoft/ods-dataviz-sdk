<script lang="ts">
    import { ColumnSort } from '../types';
    import type { ColumnSortValues } from '../types';
    import SortIcon from './SortIcon.svelte';

    export let sorted: ColumnSortValues | undefined;
    export let labels = {
        asc: 'Sort ascending',
        desc: 'Sort descending',
    };
</script>

<button on:click type="button" aria-label={sorted === ColumnSort.asc ? labels.asc : labels.desc}>
    <slot />
    <SortIcon {sorted} />
</button>

<style>
    button {
        font-size: inherit;
        font-weight: inherit;
        text-align: inherit;
        color: inherit;
        border: none;
        background: transparent;
        box-shadow: none;
        cursor: pointer;
        width: 100%;
        height: 100%;
        padding: 0;
        display: flex;
        justify-content: space-between;
    }

    :global(.ods-dataviz--default th.table-header--number button) {
        justify-content: flex-end;
    }
</style>
