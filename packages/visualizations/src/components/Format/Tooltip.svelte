<script lang="ts">
    import type { Content } from 'tippy.js';
    import tippy from 'components/utils/tippy';

    export let enabled = false;
    export let className: string | null = null;
    export let onShow: () => void;
    export let onHide: () => void;
    let tooltipContent: Content;
</script>

{#if enabled}
    <div
        role="button"
        class={className}
        tabindex="0"
        use:tippy={{
            content: tooltipContent,
            theme: 'ods-visualization-table',
            delay: [500, 0],
            duration: [275, 0],
            maxWidth: 'none',
            onShow,
            onHide,
        }}
    >
        <slot />
        <div bind:this={tooltipContent}>
            <slot name="tooltipContent" />
        </div>
    </div>
{:else}
    <slot />
{/if}
