<script lang="ts">
    import type { Instance } from 'tippy.js';
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
    let tippyInstance: Instance;
    let tooltipEl: HTMLDivElement;

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
    /* We force setting content a second time after the image has loaded
    and thus has dimensions */
    $: onLoad = () => {
        if (tippyInstance) {
            tippyInstance.setContent(tooltipEl);
        }
    };
</script>

{#if text}
    <Tooltip
        enabled={isValidUrl(thumbnailUrl)}
        onShow={(instance) => {
            showTooltip = true;
            tippyInstance = instance;
        }}
        onHide={() => {
            showTooltip = false;
        }}
    >
        <a {href} {rel} {target}>{text}</a>
        <div slot="tooltipContent" class="image-tooltip-container" bind:this={tooltipEl}>
            {#if showTooltip}
                <img src={thumbnailUrl} alt={text} on:load={onLoad} />
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
