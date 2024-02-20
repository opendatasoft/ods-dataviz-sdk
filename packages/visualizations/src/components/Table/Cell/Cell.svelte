<script lang="ts">
    import type { Column } from '../types';

    import Format, { isValidRawValue } from './Format';

    export let rawValue: unknown;
    export let column: Column;

    const title =
        ['short-text', 'long-text'].includes(column.dataFormat) && typeof rawValue === 'string'
            ? rawValue
            : undefined;

    $: ({ dataFormat } = column);
</script>

<td class={`table-data--${dataFormat}`} {title}>
    <!-- To format, rawValue must be different from undefined or null -->
    {#if isValidRawValue(rawValue)}
        {#if column.dataFormat === 'url'}
            <Format.URLFormat {rawValue} target={column.target} />
        {:else if column.dataFormat === 'number'}
            <Format.NumberFormat {rawValue} options={column.options} />
        {:else if column.dataFormat === 'date'}
            <Format.DateFormat {rawValue} options={column.options} />
        {:else if column.dataFormat === 'boolean'}
            <Format.BooleanFormat {rawValue} />
        {:else if column.dataFormat === 'long-text' || column.dataFormat === 'short-text'}
            <Format.TextFormat {rawValue} format={column.dataFormat} />
        {/if}
    {/if}
</td>

<style lang="scss">
    :global(.ods-dataviz-sdk-table--default) {
        td {
            padding: var(--spacing-75);
            font-weight: normal;
            text-align: left;
            &.table-data {
                &--number {
                    text-align: right;
                }
                &--short-text,
                &--url {
                    text-overflow: ellipsis;
                    overflow: hidden;
                    width: max-content;
                    min-width: 40px;
                    max-width: 240px;
                }
            }
        }
    }
</style>
