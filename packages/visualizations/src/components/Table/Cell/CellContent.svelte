<script lang="ts">
    import { isValidValue } from 'components/Format';
    import BooleanFormat from 'components/Format/BooleanFormat.svelte';
    import DateFormat from 'components/Format/DateFormat.svelte';
    import GeoFormat from 'components/Format/GeoFormat.svelte';
    import TextFormat from 'components/Format/TextFormat.svelte';
    import NumberFormat from 'components/Format/NumberFormat.svelte';
    import URLFormat from 'components/Format/URLFormat.svelte';
    import ImageFormat from 'components/Format/ImageFormat.svelte';
    import { DATA_FORMAT } from '../constants';
    import { locale, debugWarnings } from '../store';
    import type { Column } from '../types';
    import { isColumnOfType, getOptions, getValue } from './utils';

    export let record: Record<string, unknown>;
    export let column: Column;
</script>

<div class={`cell-content table-data--${column.dataFormat}`}>
    {#if isValidValue(getValue(column, record))}
        {#if isColumnOfType(column, DATA_FORMAT.boolean)}
            <BooleanFormat
                value={getValue(column, record)}
                {...getOptions(column, record)}
                debugWarnings={$debugWarnings}
            />
        {:else if isColumnOfType(column, DATA_FORMAT.date)}
            <DateFormat
                value={getValue(column, record)}
                {...getOptions(column, record)}
                locale={$locale}
                debugWarnings={$debugWarnings}
            />
        {:else if isColumnOfType(column, DATA_FORMAT.geo)}
            <GeoFormat value={getValue(column, record)} {...getOptions(column, record)} />
        {:else if isColumnOfType(column, DATA_FORMAT.shortText)}
            <TextFormat
                value={getValue(column, record)}
                {...getOptions(column, record)}
                debugWarnings={$debugWarnings}
            />
        {:else if isColumnOfType(column, DATA_FORMAT.longText)}
            <span>
                <TextFormat
                    value={getValue(column, record)}
                    {...getOptions(column, record)}
                    debugWarnings={$debugWarnings}
                />
            </span>
        {:else if isColumnOfType(column, DATA_FORMAT.number)}
            <NumberFormat
                value={getValue(column, record)}
                {...getOptions(column, record)}
                locale={$locale}
                debugWarnings={$debugWarnings}
            />
        {:else if isColumnOfType(column, DATA_FORMAT.image)}
            <ImageFormat
                value={getValue(column, record)}
                {...getOptions(column, record)}
                debugWarnings={$debugWarnings}
            />
        {:else if isColumnOfType(column, DATA_FORMAT.url)}
            <URLFormat
                value={getValue(column, record)}
                {...getOptions(column, record)}
                debugWarnings={$debugWarnings}
            />
        {/if}
    {/if}
</div>

<style>
    /* Wrapper div to allow position: relative while the <td> has sticky,
        so that the ::after can have position: absolute */
    :global(.ods-dataviz--default .cell-content) {
        position: relative;
        padding: var(--spacing-75);
        overflow: visible;
    }

    :global(.ods-dataviz--default div.table-header--number) {
        text-align: right;
    }
    /* to be improved in the formatting story */
    :global(.ods-dataviz--default div.table-data--long-text > span),
    :global(.ods-dataviz--default div.table-data--short-text),
    :global(.ods-dataviz--default div.table-data--url) {
        text-overflow: ellipsis;
        overflow: hidden;
        width: max-content;
        min-width: 40px;
        max-width: 240px;
    }
    :global(.ods-dataviz--default div.table-data--long-text > span) {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
        white-space: pre-wrap;
    }
    :global(.ods-dataviz--default div.table-data--number) {
        text-align: right;
    }
</style>
