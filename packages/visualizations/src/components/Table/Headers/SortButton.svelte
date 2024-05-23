<script lang="ts">
    import type { ColumnSortValues } from '../types';
    import SortIcon from './SortIcon.svelte';

    export let sorted: ColumnSortValues | undefined;
</script>

<button type="button" on:click>
    <slot />
    <SortIcon {sorted} />
</button>

<style>
    button {
        font-size: inherit;
        font-weight: inherit;
        text-align: inherit;
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
</style>
