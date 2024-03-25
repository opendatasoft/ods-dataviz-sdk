<script lang="ts">
    import type { Column } from '../types';
    import { MAX_ROW_HEIGHT } from '../constants';

    import Format, { isValidRawValue } from './Format';

    export let rawValue: unknown;
    export let column: Column;

    $: ({ dataFormat, options = {} } = column);
</script>

<!-- To display a format value, rawValue must be different from undefined or null -->
<td class={`table-data--${dataFormat}`} style="max-height: {MAX_ROW_HEIGHT}px">
    {#if isValidRawValue(rawValue)}
        <svelte:component this={Format[dataFormat]} {rawValue} {options} />
    {/if}
</td>

<style>
    :global(.ods-dataviz--default) td {
        text-align: left;
        padding: var(--spacing-75);
    }

    :global(.table-header--number) {
        text-align: right;
    }
    /* to be improved in the formatting story */
    :global(.table-data--long-text > span),
    :global(.table-data--short-text),
    :global(.table-data--url) {
        text-overflow: ellipsis;
        overflow: hidden;
        width: max-content;
        min-width: 40px;
        max-width: 240px;
    }
    :global(.table-data--long-text > span) {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
        white-space: pre-wrap;
    }
    :global(.table-data--number) {
        text-align: right;
    }
</style>
