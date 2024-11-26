<script lang="ts">
    import type { Column } from '../types';
    import Format, { isValidRawValue } from './Format';
    import { stickyColumnsOffset, lastStickyColumn } from '../store';

    export let rawValue: unknown;
    export let column: Column;
    export let isHorizontallyScrolled: boolean;

    $: ({ dataFormat, options = {} } = column);
</script>

<!-- To display a format value, rawValue must be different from undefined or null -->
<td
    style={`--sticky-offset: ${$stickyColumnsOffset.get(column.key)}px;`}
    class:sticky={$stickyColumnsOffset.has(column.key)}
    class:isLastSticky={column.key === $lastStickyColumn}
    class:isHorizontallyScrolled
>
    <div class={`table-data--${dataFormat}`}>
        {#if isValidRawValue(rawValue)}
            <svelte:component this={Format[dataFormat]} {rawValue} {...options} />
        {/if}
    </div>
</td>

<style lang="scss">
    @import '../sticky';
    :global(.ods-dataviz--default td) {
        background-color: white;
        overflow: visible;
        padding: 0;
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

    /* Wrapper div to allow position: relative while the <td> has sticky,
        so that the ::after can have position: absolute */
    div {
        position: relative;
        padding: var(--spacing-75);
        overflow: visible;
    }
</style>
