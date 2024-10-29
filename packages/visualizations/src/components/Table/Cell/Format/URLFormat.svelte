<script lang="ts">
    import ShortTextFormat from './ShortTextFormat.svelte';

    export let rawValue: unknown;
    export let display = (v: string) => v;
    export let target: HTMLAnchorElement['target'] = '_blank';
    export let rel = 'nofollow noreferrer noopener';

    function format(v: unknown) {
        try {
            // eslint-disable-next-line no-new
            new URL(v as string);
            return display(v as string);
        } catch (_) {
            // eslint-disable-next-line no-console
            console.warn(`ODS Dataviz SDK - Table: no url detected, formatting as string`);
            return null;
        }
    }

    $: value = format(rawValue);
</script>

{#if value}
    <a href={value} {rel} {target}>{display(value)}</a>
{:else}
    <ShortTextFormat {rawValue} />
{/if}
