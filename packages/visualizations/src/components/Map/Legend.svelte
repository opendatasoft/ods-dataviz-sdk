<svelte:options immutable={true} />

<script lang="ts">
    import type { LegendOptions } from '../types';
    // options to customize the component
    export let options: LegendOptions;
    export let colorStepper: { min: number; max: number };
    export let colorScale: string | string[];
    export let colorMode: string;
    export let clientWidth: number;

    $: cssLegendVarStyles = `--legend-color:linear-gradient(to right, ${colorScale});`;
</script>

<div class="{clientWidth <= 375 ? 'legend--small' : 'legend'}" style={cssLegendVarStyles}>
    {#if options?.legend?.title}
        <div class="legend-title">{options.legend.title}</div>
    {/if}
    {#if colorMode === 'gradient'}
        <!-- Gradient color boxex, no custom labels, only displaying min and max -->
        <div class="legend-color-box-gradient" />
        <div class="legend-values">
            <div>{colorStepper.min}</div>
            <div>{colorStepper.max}</div>
        </div>
    {:else if colorMode === 'palette'}
        <!-- Palette color boxes, row display, no labels only displaying palettes steps -->
        <div class="legend-container-palette">
            <div class="legend-row-color-box-palette">
                {#each colorScale as color}
                    <div class="legend-color-box-palette" style="--box-color: {color}" />
                {/each}
            </div>
            <div class="legend-row-values-palette">
                {#each colorScale as color, i}
                    {#if i === 0}
                        <div>{colorStepper.min}</div>
                        <div>
                            {colorStepper.min +
                                (colorStepper.max - colorStepper.min) / colorScale.length}
                        </div>
                    {:else if i === colorScale.length - 1}
                        <div>{colorStepper.max}</div>
                    {:else}
                        <div>
                            {colorStepper.min +
                                ((colorStepper.max - colorStepper.min) / colorScale.length) *
                                    (i + 1)}
                        </div>
                    {/if}
                {/each}
            </div>
        </div>
    {/if}
</div>

<style>
    .legend {
        display: flex;
        flex-direction: column;
        width: 20%;
        padding: 13px;
        min-width: 200px;
        font-size: 0.8rem;
    }
    .legend--small {
        display: flex;
        flex-direction: column;
        width: 90%;
        padding: 6px;
        font-size: 0.8rem;
        margin: auto;
    }
    .legend-title {
        font-weight: 700;
        margin-bottom: 3px;
    }
    .legend-values {
        display: flex;
        justify-content: space-between;
        width: 100%;
        min-height: 16px;
    }
    .legend .legend-values {
        min-width: 206px;
    }
    /* Specific CSS for gradient */
    .legend-color-box-gradient {
        width: 100%;
        min-height: 16px;
        border-radius: 3px;
        background: var(--legend-color);
        margin-left: 3px;
        margin-bottom: 3px;
    }
    /* Specific CSS for palette */
    .legend-container-palette {
        display: flex;
        flex-direction: column;
    }
    .legend-row-color-box-palette,
    .legend-row-values-palette {
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
    }
    .legend-color-box-palette {
        min-height: 16px;
        width: 100%;
        background: var(--box-color);
        display: flex;
        margin-bottom: 3px;
    }
    .legend-color-box-palette:first-child {
        margin-left: 3px;
    }
    .legend-color-box-palette:not(:last-child) {
        margin-right: 1px;
    }
    .legend .legend-row-values-palette {
        min-width: 206px;
    }
</style>
