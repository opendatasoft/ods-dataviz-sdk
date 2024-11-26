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

<style>
    :global(.ods-dataviz--default td) {
        background-color: white;
        overflow: visible;
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

    div {
        padding: var(--spacing-75);
        position: relative;
        overflow: visible;
    }

    .sticky {
        position: sticky;
        left: var(--sticky-offset);
        border-right: 1px solid var(--border-color);
        z-index: 10;
    }

    /* applies shadow only on the left to avoid eating borders */
    .isHorizontallyScrolled.isLastSticky::after {
        content: '';
        position: absolute;
        top: 0;
        right: -6px;
        height: 100%;
        width: 6px;
        background: linear-gradient(90deg, rgba(0, 0, 0, 0.13), transparent);
    }
</style>
