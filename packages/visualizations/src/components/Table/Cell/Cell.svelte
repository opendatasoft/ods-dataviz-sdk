<script lang="ts">
    import type { Column } from '../types';
    import Format, { isValidRawValue } from './Format';

    export let isLoading: boolean | undefined;
    export let rawValue: unknown | undefined;
    export let column: Column;

    $: ({ dataFormat, options = {} } = column);
</script>

<!-- To display a format value, rawValue must be different from undefined or null -->
<td class={`table-data--${dataFormat}`}>
    {#if isLoading}
        <div />
    {:else if isValidRawValue(rawValue)}
        <svelte:component this={Format[dataFormat]} {rawValue} {...options} />
    {/if}
</td>

<style>
    :global(.ods-dataviz--default td) {
        text-align: left;
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

    div {
        min-height: 21px;
        width: 100%;
        background-color: #f6f8fb;
        border-radius: 3px;
        overflow: hidden;
        position: relative;
    }
    div::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 60%;
        height: 100%;
        background-color: #cbd2db;
        filter: blur(26px);
        animation: move 800ms linear 0s infinite alternate both;
    }

    @keyframes move {
        0% {
            transform: translateX(-100%);
        }
        100% {
            transform: translateX(200%);
        }
    }
</style>
