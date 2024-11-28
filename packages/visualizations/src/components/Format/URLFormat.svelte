<script lang="ts">
    import ShortTextFormat from './ShortTextFormat.svelte';
    import { isValidUrl } from './utils';
    import type { URLFormatProps } from './types';

    type $$Props = URLFormatProps;

    export let rawValue: $$Props['rawValue'];
    export let display: $$Props['display'] = (v: string) => v;
    export let target: $$Props['target'] = '_blank';
    export let rel: $$Props['rel'] = 'nofollow noreferrer noopener';

    $: format = (v: unknown) => {
        if (isValidUrl(v)) {
            return {
                text: display && display(v),
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
    <a {href} {rel} {target}>{display && text}</a>
{:else}
    <ShortTextFormat {rawValue} {display} />
{/if}
