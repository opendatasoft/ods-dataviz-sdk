<script lang="ts">
    import type { Column } from '../types';
    import Format, { isValidRawValue } from './Format';

    export let rawValue: unknown;
    export let column: Column;
    const defautSize = 'fit-content';

    $: ({ dataFormat, options = {}, size } = column);
    $: columnSizeClass = size ? `table-column-size--${size}` : `table-column-size--${defautSize}`;
</script>

<!-- To display a format value, rawValue must be different from undefined or null -->
<td class={`table-data--${dataFormat} ${columnSizeClass}`}>
    {#if isValidRawValue(rawValue)}
        <svelte:component this={Format[dataFormat]} {rawValue} {...options} />
    {/if}
</td>

<style>
    :global(.ods-dataviz--default td) {
        padding: var(--spacing-75);
    }

    :global(.ods-dataviz--default td.table-header--number) {
        text-align: right;
    }
    /* to be improved in the formatting story */
    :global(.ods-dataviz--default td.table-data--long-text),
    :global(.ods-dataviz--default td.table-data--short-text),
    :global(.ods-dataviz--default td.table-data--url) {
        text-overflow: ellipsis;
        overflow: hidden;
        min-width: 40px;
    }
    :global(.ods-dataviz--default td.table-data--long-text > span),
    :global(.ods-dataviz--default td.table-data--geo > div) {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
        white-space: pre-wrap;
        width: max-content;
        max-width: 100%;
        overflow: hidden;
    }
    :global(.ods-dataviz--default td.table-data--number) {
        text-align: right;
    }
    td.table-column-size--large {
        max-width: 400px;
    }
    td.table-column-size--medium {
        max-width: 200px;
    }
    td.table-column-size--small {
        max-width: 100px;
    }
    td.table-column-size--fit-content {
        max-width: none;
    }
</style>
