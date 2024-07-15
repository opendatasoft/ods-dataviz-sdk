<script lang="ts">
    import type { Instance } from 'tippy.js';

    import tippy from 'components/utils/tippy';
    import { warn } from './utils';

    export let rawValue: string;
    export let display = (v: string) => v;
    export let alt = '';
    export let loadingMessage = 'Loading...';
    export let errorMessage = 'Error while fetching image';

    let tooltipContent: Element;
    let image: HTMLImageElement | null = null;
    let imageLoaded = false;
    let hasError = false;

    async function loadImage(tippyInstance: Instance) {
        if (image !== null || hasError) return;
        image = new Image();
        image.src = rawValue;
        try {
            await image.decode();
            image.alt = alt;
            image.classList.add('ods-viz-table-image');
            imageLoaded = true;
        } catch (error) {
            warn(rawValue, 'Image');
            hasError = true;
        }
        tippyInstance.setContent(tooltipContent);
    }
</script>

<div
    role="button"
    tabindex="0"
    use:tippy={{
        content: tooltipContent,
        theme: 'ods-viz-table',
        delay: [500, 0],
        duration: [275, 0],
        maxWidth: 'none',
        onTrigger(instance) {
            loadImage(instance);
        },
    }}
>
    <div class="ods-viz-image-label">{display(rawValue)}</div>
    <div bind:this={tooltipContent}>
        {#if imageLoaded}
            {@html image?.outerHTML}
        {:else if hasError}
            <div class="ods-viz-image-error-container">
                {errorMessage}
            </div>
        {:else}
            <div class="ods-viz-image-loading-container">
                {loadingMessage}
            </div>
        {/if}
    </div>
</div>

<style lang="scss">
    div[role='button'] {
        display: inline-block;
    }
    :global(.ods-viz-image-label) {
        cursor: pointer;
        text-decoration: underline;
    }
    :global(.ods-viz-table-image) {
        object-fit: contain;
        border-radius: 3px;
        width: 360px;
        height: 240px;
    }
</style>
