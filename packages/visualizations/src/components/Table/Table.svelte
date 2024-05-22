<script lang="ts">
    import type { DataFrame } from '../types';
    import type { Column } from './types';
    import { generateId } from '../utils';
    import Headers from './Headers';
    import Body from './Body.svelte';

    export let columns: Column[];
    export let records: DataFrame | undefined;
    export let description: string | undefined;
    export let verticalScroll: boolean | undefined;

    const tableId = `table-${generateId()}`;
</script>

<div class:vscroll-wrapper={verticalScroll}>
    <table aria-describedby={description ? tableId : undefined}>
        <Headers {columns} {verticalScroll}/>
        {#if records}
            <Body {records} {columns} />
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

    .vscroll-wrapper {
        display: inline-block;
        overflow-y: scroll;
    }
</style>
