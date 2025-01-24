<script lang="ts">
    import { isValidUrl } from './utils';
    import type { ImageFormatProps } from './types';
    import Tooltip from './Tooltip.svelte';
    import UrlFormat from './URLFormat.svelte';

    type $$Props = ImageFormatProps;

    export let value: $$Props['value'];
    export let valueToLabel: $$Props['valueToLabel'] = (v: string) => v; // cannot be null because of TS/Svelte optional vs undefined
    export let alt: $$Props['alt'] = '';
    export let target: $$Props['target'] = '_blank';
    export let rel: $$Props['rel'] = 'nofollow noreferrer noopener';
    export let debugWarnings = false;

    let showTooltip = false;
</script>

<!-- Instantiate tooltip only if it's valid URL, but waring is made in URLFormat -->
{#if isValidUrl(value)}
    <Tooltip
        enabled={!!value}
        onShow={() => {
            showTooltip = true;
        }}
        onHide={() => {
            showTooltip = false;
        }}
    >
        <UrlFormat {value} {valueToLabel} {target} {rel} {debugWarnings} />
        <div slot="tooltipContent" class="image-tooltip-container">
            {#if showTooltip}
                <img src={value} {alt} />
            {/if}
        </div>
    </Tooltip>
{:else}
    <UrlFormat {value} {valueToLabel} {target} {rel} {debugWarnings} />
{/if}

<style>
    :global(.image-tooltip-container img) {
        max-width: 360px;
        max-height: 240px;
        object-fit: contain;
    }
</style>
