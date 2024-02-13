<script lang="ts">
    import { warn } from './utils';

    export let rawValue: unknown;
    export let target = '_blank';

    function displayValue(v: unknown) {
        try {
            // eslint-disable-next-line no-new
            new URL(v as string);
            return v as string;
        } catch (error) {
            warn(v, 'URL');
            return null;
        }
    }

    $: value = displayValue(rawValue);
</script>

{#if value}
    <a href={value} target={target || '_blank'}>{value}</a>
{:else}
    {rawValue}
{/if}
