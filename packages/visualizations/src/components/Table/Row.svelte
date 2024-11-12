<script lang="ts">
    import Cell from './Cell';
    import type { Column, Rows } from './types';

    export let columns: Column[];
    export let rows: Rows | undefined;
    export let record: Record<string, unknown>;
    let isRowHovered = false;

    $: onMouseEnter = () => {
        if (rows?.onMouseEnter) {
            rows.onMouseEnter(record);
        }
        isRowHovered = true;
    };

    $: onMouseLeave = () => {
        if (rows?.onMouseLeave) {
            rows.onMouseLeave(record);
        }
        isRowHovered = false;
    };

    $: onClick = () => {
        if (rows?.onClick) {
            rows.onClick(record);
        }
    };
</script>

<tr on:mouseenter={onMouseEnter} on:mouseleave={onMouseLeave}>
    {#each columns as column, index}
        <Cell
            rawValue={record[column.key]}
            {column}
            onClick={index === 0 && rows?.onClick ? onClick : null}
            {isRowHovered}
        />
    {/each}
</tr>

<!-- markup (zero or more items) goes here -->

<style>
    :global(.ods-dataviz--default) tr {
        border-bottom: 1px solid var(--border-color);
    }

    :global(.ods-dataviz--default) tr:last-child {
        border-bottom: none;
    }
</style>
