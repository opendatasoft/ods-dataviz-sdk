<script lang="ts">
    import TextFormat from './TextFormat.svelte';
    import { isValidUrl, warn } from './utils';
    import type { URLFormatProps } from './types';
    import Tooltip from './Tooltip.svelte';

    type $$Props = URLFormatProps;

    export let value: $$Props['value'];
    export let valueToLabel: $$Props['valueToLabel'] = (v: string) => v; // cannot be null because of TS/Svelte optional vs undefined
    export let thumbnailUrl: $$Props['thumbnailUrl'] = '';
    export let target: $$Props['target'] = '_blank';
    export let rel: $$Props['rel'] = 'nofollow noreferrer noopener';
    export let debugWarnings = false;

    let showTooltip = false;

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
    <Tooltip
        enabled={isValidUrl(thumbnailUrl)}
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
                <img src={thumbnailUrl} alt={text} />
            {/if}
        </div>
    </Tooltip>
{:else}
    <TextFormat {value} {valueToLabel} />
{/if}

<style>
    :global(.image-tooltip-container img) {
        max-width: 360px;
        max-height: 240px;
        object-fit: contain;
    }
</style>
