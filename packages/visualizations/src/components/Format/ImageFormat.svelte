<script lang="ts">
    import type { Content } from 'tippy.js';
    import tippy from 'components/utils/tippy';
    import ShortTextFormat from './ShortTextFormat.svelte';
    import { isValidUrl, warn } from './utils';
    import type { ImageFormatProps } from './types';

    type $$Props = ImageFormatProps;

    export let rawValue: $$Props['rawValue'];
    export let display: $$Props['display'] = (v: unknown) => v as string;
    export let accessor: $$Props['accessor'] = (v: unknown) => v as string;
    export let debugWarnings = false;

    let tooltipContent: Content;
    let showPreview = false;

    $: format = (v: unknown) => {
        if (isValidUrl(v)) {
            return {
                filename: display ? display(rawValue) : v,
                src: v,
            };
        }

        if (debugWarnings) {
            warn(v, 'url');
        }
        return { src: null, filename: null };
    };

    $: ({ filename, src } = format(accessor ? accessor(rawValue) : rawValue));
    $: console.table({ rawValue, src, filename });
</script>

{#if src}
    <div
        role="button"
        tabindex="0"
        use:tippy={{
            content: tooltipContent,
            theme: 'ods-visualization-table',
            delay: [500, 0],
            duration: [275, 0],
            maxWidth: 'none',
            onShow: () => {
                showPreview = true;
            },
            onHide: () => {
                showPreview = false;
            },
        }}
    >
        <a href={src} rel="nofollow noreferrer noopener" target="_blank">{filename}</a>
        {#if showPreview}
            <div bind:this={tooltipContent}>
                <img {src} alt={filename} />
            </div>
        {/if}
    </div>
{:else}
    <ShortTextFormat {rawValue} {display} />
{/if}

<!-- markup (zero or more items) goes here -->

<style>
    img {
        max-width: 300px;
        max-height: 300px;
        object-fit: contain;
    }
</style>
