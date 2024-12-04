<script lang="ts">
    import ShortTextFormat from './ShortTextFormat.svelte';
    import { isValidUrl, warn } from './utils';
    import type { URLFormatProps } from './types';
    import Tooltip from './Tooltip.svelte';

    type $$Props = URLFormatProps;

    export let rawValue: $$Props['rawValue'];
    export let display: $$Props['display'] = (v: unknown) => v as string;
    export let accessor: $$Props['accessor'] = (v: unknown) => v as string;
    export let tooltip: $$Props['tooltip'] = () => null;
    export let target: $$Props['target'] = '_blank';
    export let rel: $$Props['rel'] = 'nofollow noreferrer noopener';
    export let debugWarnings = false;

    let showTooltip = false;

    $: format = (v: unknown) => {
        if (isValidUrl(v)) {
            return {
                text: display ? display(rawValue) : v,
                href: v,
                src: tooltip && tooltip(rawValue),
            };
        }

        if (debugWarnings) {
            warn(v, 'url');
        }
        return { text: null, href: null, src: null };
    };

    $: ({ text, href, src } = format(accessor ? accessor(rawValue) : rawValue));
</script>

{#if text}
    <Tooltip
        enabled={!!src}
        onShow={() => {
            showTooltip = true;
        }}
        onHide={() => {
            showTooltip = false;
        }}
    >
        <a {href} {rel} {target}>{text}</a>
        <div slot="tooltipContent" class="image-tooltip-container">
            {#if showTooltip}
                <img {src} alt={text} />
            {/if}
        </div>
    </Tooltip>
{:else}
    <ShortTextFormat {rawValue} {display} />
{/if}

<style>
    :global(.image-tooltip-container img) {
        max-width: 360px;
        max-height: 240px;
        object-fit: contain;
    }
</style>
