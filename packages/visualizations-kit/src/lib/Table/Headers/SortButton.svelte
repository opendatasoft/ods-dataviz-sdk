<script lang="ts">
    import { ColumnSort } from '../types';
    import type { ColumnSortValues } from '../types';
    import SortIcon from './SortIcon.svelte';

    interface Props {
        sorted: ColumnSortValues | undefined;
        labels?: any;
        children?: import('svelte').Snippet;
        onclick?: () => void;
    }

    let { 
        sorted, 
        labels = {
            asc: 'Sort ascending',
            desc: 'Sort descending',
        }, 
        children,
        onclick,
    }: Props = $props();
</script>

<button onclick={onclick} type="button" aria-label={sorted === ColumnSort.asc ? labels.asc : labels.desc}>
    {@render children?.()}
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
