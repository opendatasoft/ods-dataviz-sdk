<script lang="ts">
    import { isValidRawValue } from 'components/Format';
    import BooleanFormat from 'components/Format/BooleanFormat.svelte';
    import DateFormat from 'components/Format/DateFormat.svelte';
    import GeoFormat from 'components/Format/GeoFormat.svelte';
    import ShortTextFormat from 'components/Format/ShortTextFormat.svelte';
    import LongTextFormat from 'components/Format/LongTextFormat.svelte';
    import NumberFormat from 'components/Format/NumberFormat.svelte';
    import URLFormat from 'components/Format/URLFormat.svelte';
    import { DATA_FORMAT } from '../constants';
    import { locale } from '../store';
    import type { Column } from '../types';
    import isColumnOfType from './utils';

    export let rawValue: unknown;
    export let column: Column;
</script>

<!-- To display a format value, rawValue must be different from undefined or null -->
<td class={`table-data--${column.dataFormat}`}>
    {#if isValidRawValue(rawValue)}
        {#if isColumnOfType(column, DATA_FORMAT.boolean)}
            <BooleanFormat {rawValue} {...column.options} />
        {:else if isColumnOfType(column, DATA_FORMAT.date)}
            <DateFormat {rawValue} {...column?.options} locale={$locale} />
        {:else if isColumnOfType(column, DATA_FORMAT.geo)}
            <GeoFormat {rawValue} {...column.options} />
        {:else if isColumnOfType(column, DATA_FORMAT.shortText)}
            <ShortTextFormat {rawValue} {...column.options} />
        {:else if isColumnOfType(column, DATA_FORMAT.longText)}
            <LongTextFormat {rawValue} {...column.options} />
        {:else if isColumnOfType(column, DATA_FORMAT.number)}
            <NumberFormat {rawValue} {...column.options} locale={$locale} />
        {:else if isColumnOfType(column, DATA_FORMAT.url)}
            <URLFormat {rawValue} {...column.options} />
        {/if}
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
    :global(.ods-dataviz--default td.table-data--long-text > span),
    :global(.ods-dataviz--default td.table-data--short-text),
    :global(.ods-dataviz--default td.table-data--url) {
        text-overflow: ellipsis;
        overflow: hidden;
        width: max-content;
        min-width: 40px;
        max-width: 240px;
    }
    :global(.ods-dataviz--default td.table-data--long-text > span) {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
        white-space: pre-wrap;
    }
    :global(.ods-dataviz--default td.table-data--number) {
        text-align: right;
    }
</style>
