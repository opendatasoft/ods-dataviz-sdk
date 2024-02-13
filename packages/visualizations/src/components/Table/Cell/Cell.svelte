<script lang="ts">
    import type { Column } from '../types';

    import Format, { isValidRawValue } from './Format';

    export let rawValue: unknown;
    export let column: Column;

    $: ({ dataFormat } = column);
</script>

<td class={`table-data--${dataFormat}`}>
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
            <Format.TextFormat {rawValue} />
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
                // FIXME: Arbitrary style; to be refined later
                &--short-text,
                &--url {
                    text-overflow: ellipsis;
                    overflow: hidden;
                    max-width: 150px;
                }
                &--long-text {
                    min-width: 300px;
                    max-width: 500px;
                    white-space: initial;
                }
            }
        }
    }
</style>
