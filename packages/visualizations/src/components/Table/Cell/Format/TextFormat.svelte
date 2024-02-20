<script lang="ts">
    import type { LongTextColumn, ShortTextColumn } from '../../types';
    import { warn } from './utils';

    export let rawValue: unknown;
    export let format: (LongTextColumn | ShortTextColumn)['dataFormat'];

    function getDisplayValue(v: unknown) {
        if (typeof v !== 'string') {
            warn(v, 'text');
        }
        return v;
    }

    $: value = getDisplayValue(rawValue);
</script>

{#if format === 'long-text'}
    <!-- Wrap value to style properly line clamp -->
    <div>{value}</div>
{:else}
    {value}
{/if}

<style lang="scss">
    div {
        text-overflow: ellipsis;
        overflow: hidden;
        width: max-content;
        min-width: 40px;
        max-width: 240px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
        white-space: pre-wrap;
    }
</style>
