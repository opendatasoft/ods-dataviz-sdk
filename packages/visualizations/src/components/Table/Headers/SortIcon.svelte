<script lang="ts">
    import { ColumnSort, type ColumnSortValues } from "../types";

    export let sorted: ColumnSortValues | undefined;
</script>

<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        d="m12 10.5-4 4-4-4h8zM12"
        fill={sorted === ColumnSort.asc ? 'var(--selected)' : 'var(--neutral)'}
    />
    <path
        d="m12 6.5l-4-4-4 4h8z"
        fill={sorted === ColumnSort.desc ? 'var(--selected)' : 'var(--neutral)'}
    />
</svg>

<style>
    svg {
        --selected: black;
        --neutral: grey;
    }
</style>
