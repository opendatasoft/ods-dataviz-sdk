<script lang="ts">
    import TextFormat from './TextFormat.svelte';
    import { isValidUrl, warn } from './utils';
    import type { URLFormatProps } from './types';

    type $$Props = URLFormatProps;

    export let value: $$Props['value'];
    export let valueToLabel: $$Props['valueToLabel'] = (v: string) => v; // cannot be null because of TS/Svelte optional vs undefined
    export let target: $$Props['target'] = '_blank';
    export let rel: $$Props['rel'] = 'nofollow noreferrer noopener';
    export let debugWarnings = false;

    $: format = (v: unknown) => {
        if (isValidUrl(v)) {
            return {
                text: valueToLabel ? valueToLabel(v) : v,
                href: v,
            };
        }

        warn(v, 'url', debugWarnings);
        return { text: null, href: null };
    };

    $: ({ text, href } = format(value));
</script>

{#if text}
    <a {href} {rel} {target}>{text}</a>
{:else}
    <TextFormat {value} {valueToLabel} />
{/if}
