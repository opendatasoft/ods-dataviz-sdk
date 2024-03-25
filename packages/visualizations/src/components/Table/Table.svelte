<script lang="ts">
    import type { DataFrame } from '../types';
    import type { Column } from './types';
    import { generateId } from '../utils';
    import Header from './Header.svelte';
    import Body from './Body.svelte';

    export let columns: Column[];
    export let records: DataFrame | undefined;
    export let description: string | undefined;

    const tableId = `table-${generateId()}`;

    $: ({ value: records } = data);
    $: ({ columns, title, subtitle, description, source, unstyled, locale, pages } = options);
    $: defaultStyle = !unstyled;
    $: updateLocale(locale);
    /* Preserves paginations controls positioning
    min heigh of table + controls = max-height of row * (number of rows + 1 for headers)
    */
    $: minHeight = pages ? `${MAX_ROW_HEIGHT * (pages.recordsPerPage + 1)}px` : 'none';
</script>

<div>
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
    }

    :global(.ods-dataviz--default) table {
        border-collapse: collapse;
        white-space: nowrap;
        width: inherit;
    }
</style>
