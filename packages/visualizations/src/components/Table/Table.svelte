<script lang="ts">
    import type { DataFrame } from 'components/types';
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
        {#if records}
            <Body {loadingRowsNumber} {records} {columns} {emptyStateLabel} />
        {/if}
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
        border: solid 1px var(--border-color);
        border-radius: var(--border-radius-2);
        overflow-x: auto;
        overscroll-behavior-x: none;
        margin-bottom: var(--spacing-100);
        width: 100%;
    }

    :global(.ods-dataviz--default) table {
        border-collapse: collapse;
        white-space: nowrap;
        width: inherit;
    }
</style>
