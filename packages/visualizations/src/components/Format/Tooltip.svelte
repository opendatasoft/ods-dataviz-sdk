<script lang="ts">
    import type { Content, Instance } from 'tippy.js';
    import tippy from 'components/utils/tippy';

    export let enabled = false;
    export let className: string | null = null;
    export let onShow: ((instance: Instance) => void) | null = null;
    export let onHide: ((instance: Instance) => void) | null = null;
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
            ...(onShow && { onShow }),
            ...(onHide && { onHide }),
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
