<script lang="ts">
    import type { Column } from '../types';

    import Format, { isValidRawValue } from './Format';

    export let rawValue: unknown;
    export let column: Column;

    $: ({ dataFormat, options = {} } = column);
</script>

<!-- To display a format value, rawValue must be different from undefined or null -->
<td class={`table-data--${dataFormat}`}>
    {#if isValidRawValue(rawValue)}
        <svelte:component this={Format[dataFormat]} {rawValue} {options} />
    {/if}
</td>
