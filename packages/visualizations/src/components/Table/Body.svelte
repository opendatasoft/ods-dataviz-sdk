<script lang="ts">
    import type { Column, RowProps, TableData } from './types';
    import { LoadingCell } from './Cell';
    import EmptyRow from './EmptyRow.svelte';
    import Row from './Row.svelte';

    interface Props {
        loadingRowsNumber: number | null;
        columns: Column[];
        rowProps: RowProps | undefined;
        records: TableData | undefined;
        emptyStateLabel: string | undefined;
    }

    let {
        loadingRowsNumber,
        columns,
        rowProps,
        records,
        emptyStateLabel
    }: Props = $props();

    let hoveredRow: number | null = $state();
</script>

<tbody
    onmouseleave={() => {
        hoveredRow = null;
    }}
>
    {#if records?.length === 0 && !loadingRowsNumber}
        <EmptyRow label={emptyStateLabel} />
    {/if}
    {#if loadingRowsNumber}
        {#each Array(loadingRowsNumber) as _}
            <tr>
                {#each columns as __}
                    <LoadingCell />
                {/each}
            </tr>
        {/each}
    {:else if records}
        {#each records as record, rowIndex}
            <Row
                {columns}
                {rowProps}
                {record}
                setHovered={() => {
                    hoveredRow = rowIndex;
                }}
                isHovered={hoveredRow === rowIndex}
            />
        {/each}
    {/if}
</tbody>

<style>
</style>
