<script lang="ts">
    import type { DataFrame } from '$lib/types';
    import { generateId } from '$lib/utils';
    import type { Column, RowProps } from './types';
    import Headers from './Headers';
    import Body from './Body.svelte';

    interface Props {
        loadingRowsNumber: number | null;
        columns: Column[];
        records: DataFrame | undefined;
        description: string | undefined;
        emptyStateLabel: string | undefined;
        rowProps: RowProps | undefined;
    }

    let {
        loadingRowsNumber,
        columns,
        records,
        description,
        emptyStateLabel,
        rowProps
    }: Props = $props();
    const tableId = `table-${generateId()}`;
</script>

<div class="scrollbox">
    <table aria-describedby={description ? tableId : undefined}>
        <Headers {columns} extraButtonColumn={Boolean(rowProps?.onClick)} />
        <Body {loadingRowsNumber} {records} {columns} {rowProps} {emptyStateLabel} />
    </table>
</div>
{#if description}
    <p id={tableId} class="a11y-invisible-description">{description}</p>
{/if}

<style>
    /* Suitable for elements that are used via aria-describedby or aria-labelledby */
    .a11y-invisible-description {
        display: none;
    }

    :global(.ods-dataviz--default) .scrollbox {
        overflow-x: auto;
        overscroll-behavior-x: none;
        width: 100%;
    }

    :global(.ods-dataviz--default) table {
        border-collapse: collapse;
        white-space: nowrap;
        width: inherit;
    }
</style>
