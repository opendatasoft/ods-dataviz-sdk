<script lang="ts">
    import { warn } from './utils';

    export let rawValue: unknown;
    export let display = (v: string) => v;
    export let target: HTMLAnchorElement['target'] = '_blank';

    function format(v: unknown) {
        try {
            // eslint-disable-next-line no-new
            new URL(v as string);
            return v as string;
        } catch (error) {
            warn(v, 'URL');
            return null;
        }
    }

    $: value = format(rawValue);
</script>

{#if value}
    <a href={value} {target}>{display(value)}</a>
{:else}
    {rawValue}
{/if}
