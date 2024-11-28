<script lang="ts">
    import ShortTextFormat from './ShortTextFormat.svelte';
    import { isValidUrl, warn } from './utils';
    import type { URLFormatProps } from './types';

    type $$Props = URLFormatProps;

    export let rawValue: $$Props['rawValue'];
    export let display: $$Props['display'] = (v: unknown) => v as string;
    export let accessor: $$Props['accessor'] = (v: unknown) => v as string;
    export let target: $$Props['target'] = '_blank';
    export let rel: $$Props['rel'] = 'nofollow noreferrer noopener';
    export let debugWarnings = false;

    $: format = (v: unknown) => {
        if (isValidUrl(v)) {
            return {
                text: display ? display(rawValue) : v,
                href: v,
            };
        }

        if (debugWarnings) {
            warn(v, 'url');
        }
        return { text: null, href: null };
    };

    $: ({ text, href } = format(accessor ? accessor(rawValue) : rawValue));
</script>

{#if text}
    <a {href} {rel} {target}>{text}</a>
{:else}
    <ShortTextFormat {rawValue} {display} />
{/if}

<style></style>
