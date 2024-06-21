<script lang="ts">
    import type { DataFrame } from '../types';
    import type { Column } from './types';
    import { generateId } from '../utils';
    import Headers from './Headers';
    import Body from './Body.svelte';
    import { isRtl } from './store';

    export let loadingRowsNumber: number | null;
    export let columns: Column[];
    export let records: DataFrame | undefined;
    export let description: string | undefined;

    const tableId = `table-${generateId()}`;
</script>

<div>
    <table
        aria-describedby={description ? tableId : undefined}
        class={$isRtl ? 'rtl-direction' : ''}
    >
        <Headers {columns} />
        {#if records}
            <Body {loadingRowsNumber} {records} {columns} />
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

    .rtl-direction {
        direction: rtl;
    }

    :global(.ods-dataviz--default) div {
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
