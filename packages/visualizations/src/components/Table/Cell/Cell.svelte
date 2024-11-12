<script lang="ts">
    import type { Column } from '../types';
    import Format, { isValidRawValue } from './Format';
    import ZoomIcon from './ZoomIcon.svelte';

    export let rawValue: unknown;
    export let column: Column;
    export let onClick: (() => void) | null;
    export let isRowHovered = false;

    $: ({ dataFormat, options = {} } = column);
</script>

<!-- To display a format value, rawValue must be different from undefined or null -->
<td class={`table-data--${dataFormat}`}>
    <div class="cell-wrapper">
        {#if onClick}
            <button on:click={onClick} class:visible={isRowHovered}>
                <ZoomIcon />
            </button>
        {/if}
        <div class="value-container">
            {#if isValidRawValue(rawValue)}
                <svelte:component this={Format[dataFormat]} {rawValue} {...options} />
            {/if}
        </div>
    </div>
</td>

<style>
    .cell-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 6px;
    }
    .value-container {
        flex-shrink: 1;
        overflow: hidden;
        text-overflow: ellipsis;
    }
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

    :global(.ods-dataviz--default) button {
        background-color: transparent;
        color: #142e7b;
        border-radius: 50%;
        height: 28px;
        width: 28px;
        margin-right: 3px;
        padding: 6px;
        border: none;
        box-shadow: none;
        display: flex;
        justify-content: center;
        align-items: center;
        visibility: hidden;
    }

    :global(.ods-dataviz--default) button:hover {
        background-color: #e2e6ee;
        cursor: pointer;
    }

    :global(.ods-dataviz--default) button.visible {
        visibility: visible;
    }
</style>
