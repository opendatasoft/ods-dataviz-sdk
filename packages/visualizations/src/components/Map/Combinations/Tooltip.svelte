<script lang="ts">
    export let label = '';
    let containerElement: HTMLDivElement;
    let x: number;
    let y: number;
    let hovered = false;

    function showTooltip() {
        hovered = true;
        x = containerElement.offsetLeft;
        y = containerElement.offsetTop + containerElement.offsetHeight + 2;
    }

    function hideTooltip() {
        hovered = false;
    }
</script>

<div
    class="tooltip-container"
    bind:this={containerElement}
    on:mouseover={showTooltip}
    on:focus={showTooltip}
    on:mouseleave={hideTooltip}
>
    <slot />
</div>

{#if hovered}
    <div class="tooltip" style="top: {y}px; left: {x}px;">
        {label}
    </div>
{/if}

<style>
    .tooltip-container {
        flex: 1;
    }
    .tooltip {
        position: absolute;
        z-index: 100;
        padding: 6px;
        border-radius: 6px;
        box-shadow: 0px 6px 13px rgba(0, 0, 0, 0.26);
        background: white;
        font-size: 0.875rem;
        color: #565656;
    }
</style>
