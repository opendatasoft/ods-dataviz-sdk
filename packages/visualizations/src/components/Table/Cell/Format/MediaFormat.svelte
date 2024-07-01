<script lang="ts">
    import tippy from '../../../utils/tippy';

    export let rawValue: string;
    export let display = (v: string) => v;
    export let alt = (v: string) => '';

    let tooltipContent;
    let mimeType = null;

    async function getMimeType(url: string) {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            mimeType = response.headers.get('Content-Type');
        } catch (_) {
            mimeType = null;
        }
    }

    $: isImage = /^image\//.test(mimeType);
    $: getMimeType(rawValue);
</script>

{#if isImage}
    <div
        role="button"
        tabindex="0"
        use:tippy={{
            content: tooltipContent,
            theme: 'ods-visualization-table',
            delay: [500, 0],
            duration: [275, 0],
            maxWidth: 'none',
        }}
    >
        <div class="ods-visualization-table__media-label">{display(rawValue)}</div>
        <div bind:this={tooltipContent}>
            <img loading="lazy" src={rawValue} alt={alt(rawValue)} />
        </div>
    </div>
{:else}
    <a href={rawValue} target="_blank">{display(rawValue)}</a>
{/if}

<style lang="scss">
    div[role='button'] {
        display: inline-block;
    }
    .ods-visualization-table__media-label {
        cursor: pointer;
        text-decoration: underline;
    }
    img {
        object-fit: contain;
        border-radius: 3px;
        width: 360px;
        height: 240px;
    }
</style>
