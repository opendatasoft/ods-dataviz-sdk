<script lang="ts">
    import ShortTextFormat from './ShortTextFormat.svelte';
    import { isValidUrl, warn } from './utils';
    import type { URLFormatProps } from './types';

    type $$Props = URLFormatProps;

    export let rawValue: $$Props['rawValue'];
    export let display: $$Props['display'] = (v: string) => v; // cannot be null because of TS/Svelte optional vs undefined
    export let target: $$Props['target'] = '_blank';
    export let rel: $$Props['rel'] = 'nofollow noreferrer noopener';
    export let debugWarnings = false;

    $: format = (v: unknown) => {
        if (isValidUrl(v)) {
            return {
                text: display ? display(v) : v,
                href: v,
            };
        }

        if (debugWarnings) {
            warn(v, 'url');
        }
        return { text: null, href: null };
    };

    $: ({ text, href } = format(rawValue));
</script>

{#if text}
    <a {href} {rel} {target}>{text}</a>
{:else}
    <ShortTextFormat {rawValue} {display} />
{/if}
