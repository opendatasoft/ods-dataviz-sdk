<script lang="ts">
    import type { DataFrame } from 'types';
    import { generateId } from 'components/utils';
    import type { Column } from './types';
    import Headers from './Headers';
    import Body from './Body.svelte';

    export let loadingRowsNumber: number | null;
    export let columns: Column[];
    export let records: DataFrame | undefined;
    export let description: string | undefined;
    export let emptyStateLabel: string | undefined;

    const tableId = `table-${generateId()}`;
</script>

<div class="scrollbox">
    <table aria-describedby={description ? tableId : undefined}>
        <Headers {columns} />
        <Body {loadingRowsNumber} {records} {columns} {emptyStateLabel} />
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

    :global(.ods-viz--default-style) .scrollbox {
        overflow-x: auto;
        overscroll-behavior-x: none;
        width: 100%;
    }

    :global(.ods-viz--default-style) table {
        border-collapse: collapse;
        white-space: nowrap;
        width: inherit;
    }
</style>
