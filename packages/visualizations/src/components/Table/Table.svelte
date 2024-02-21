<script lang="ts">
    import type { Async } from '../../types';
    import type { TableData, TableOptions } from './types';

    import { generateId } from '../utils';

    import SourceLink from '../utils/SourceLink.svelte';
    import Header from './Header.svelte';
    import Body from './Body.svelte';

    export let data: Async<TableData>;
    export let options: TableOptions;

    const tableId = `table-${generateId()}`;

    $: ({ value: records } = data);
    $: ({ columns, title, subtitle, description, source } = options);
</script>

<div class="container">
    <div class="header">
        {#if title}
            <h3>{title}</h3>
        {/if}
        {#if subtitle}
            <p>{subtitle}</p>
        {/if}
    </div>
    <div class="table-wrapper">
        <table aria-describedby={description ? tableId : undefined}>
            <Header {columns} />
            {#if records}
                <Body {records} {columns} />
            {/if}
        </table>
    </div>
    {#if description}
        <p id={tableId} class="a11y-invisible-description">{description}</p>
    {/if}
    {#if source}
        <SourceLink {source} />
    {/if}
</div>

<style>
    .container {
        --spacing-50: 6px;
        --spacing-75: 9px;
        --spacing-100: 13px;

        --text-color: var(--ods-sdk-table-text-color, #565656);
        --border-color: var(--ods-sdk-table-border-color, #cbd2db);
        --header-text-color: var(--ods-sdk-table-header-text-color, #3c3c3c);
        --header-background-color: var(--ods-sdk-table-header-background-color, #f2f3f8);
        --header-border-bottom-color: var(--ods-sdk-table-header-border-bottom-color, #dee5ef);
        --active-row-background-color: var(--ods-sdk-table-active-row-background-color, #f6f8fb);

        /* FIXME: Only using flex style to center source link */
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        width: 100%;
    }
    .header {
        margin-bottom: var(--spacing-100);
    }
    .header h3,
    .header p {
        margin: 0;
    }
    .table-wrapper {
        border: solid 1px var(--border-color);
        border-radius: var(--spacing-50);
        overflow-x: auto;
        overscroll-behavior-x: none;
        width: inherit;
        max-width: 100%;
        margin-bottom: var(--spacing-100);
    }
    table {
        border-collapse: collapse;
        color: var(--text-color);
        white-space: nowrap;
        width: inherit;
    }
    :global(.container th),
    :global(.container td) {
        padding: var(--spacing-75);
        font-weight: normal;
        text-align: left;
    }
    :global(.container th) {
        color: var(--header-text-color);
        background-color: var(--header-background-color);
    }
    :global(.container thead) {
        border-bottom: 2px solid var(--header-border-bottom-color);
    }
    :global(.container tbody tr:not(:last-child)) {
        border-bottom: 1px solid var(--border-color);
    }
    :global(.container tbody tr:hover) {
        background-color: var(--active-row-background-color);
    }
    /* Suitable for elements that are used via aria-describedby or aria-labelledby */
    .a11y-invisible-description {
        display: none;
    }
</style>
