<script lang="ts">
    import ShortTextFormat from './ShortTextFormat.svelte';
    import { isValidUrl } from './utils';

    export let rawValue: unknown;
    export let display = (v: string) => v;
    export let target: HTMLAnchorElement['target'] = '_blank';
    export let rel = 'nofollow noreferrer noopener';

    $: format = (v: unknown) => {
        if (isValidUrl(v)) {
            return {
                text: display(v),
                href: v,
            };
        }
        // eslint-disable-next-line no-console
        console.warn(`ODS Dataviz SDK - Table: no url detected in ${v}. Formatting as string.`);
        return { text: null, href: null };
    };

    $: ({ text, href } = format(rawValue));
</script>

{#if text}
    <a {href} {rel} {target}>{text}</a>
{:else}
    <ShortTextFormat {rawValue} {display} />
{/if}
