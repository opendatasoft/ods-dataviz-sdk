<script lang="ts">
    import type { Async } from '../../types';
    import type { TableData, TableOptions } from './types';

    import { generateId } from '../utils';

    import SourceLink from '../utils/SourceLink.svelte';
    import Header from './Header.svelte';
    import Body from './Body.svelte';
    import parseTheme from './utils/theme';

    export let data: Async<TableData>;
    export let options: TableOptions;

    const tableId = `table-${generateId()}`;

    $: ({ value: records } = data);
    // FIXME: Eslint is in conflict with prettier
    // eslint-disable-next-line object-curly-newline
    $: ({ columns, title, subtitle, description, source, theme } = options);

    $: style = parseTheme(theme);
</script>

<div class="container" {style}>
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

        /* FIXME: Only using flex style to center source link */
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
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
        max-width: 100%;
        margin-bottom: var(--spacing-100);
    }
    table {
        border-collapse: collapse;
        color: var(--text-color);
        white-space: nowrap;
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
        border-bottom: 2px solid var(--header-border-color);
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
