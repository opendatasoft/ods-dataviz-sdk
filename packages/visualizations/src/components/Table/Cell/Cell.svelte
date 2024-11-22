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
    export let isHorizontallyScrolled: boolean;
    export let columnIndex: number;

    $: ({ dataFormat, options = {} } = column);
</script>

<!-- To display a format value, rawValue must be different from undefined or null -->
<td
    style={`--sticky-offset: ${$stickyCloumnsOffset[columnIndex]}px;`}
    class={`table-data--${dataFormat}`}
    class:sticky={column?.sticky}
    class:isLastSticky={columnIndex === $stickyCloumnsOffset.length -1}
    class:isHorizontallyScrolled
>
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
        background-color: white;
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

    .sticky {
        position: sticky;
        left: var(--sticky-offset);
        border-right: 1px solid var(--border-color);
    }

    /* applies shadow only on the left to avoid eating borders */
    .isHorizontallyScrolled.isLastSticky::after {
        content: "";
        position: absolute;
        top: 0;
        right: -6px;
        height: 100%;
        width: 6px;
        background: linear-gradient(90deg, rgba(0,0,0,0.13), transparent);
    }
</style>
