<svelte:options immutable={true} />

<script lang="ts">
    import type { MapLegendOptions } from '../types';
    // options to customize the component
    export let options: MapLegendOptions;
    export let colorStepper: { min: number; max: number };
    export let colorScale: string | string[];
    export let colorMode: string;

    $: cssLegendVarStyles = `--legend-color:linear-gradient(to right, ${colorScale});`;
</script>

<div class="map-card__legend" style={cssLegendVarStyles}>
    {#if options?.legend?.title}
        <div class="map-card__legend-title">{options.legend.title}</div>
    {/if}
    {#if colorMode === 'gradient'}
        <!-- Gradient color boxex, no custom labels, only displaying min and max -->
        <div class="map-card__legend-color-box-gradient" />
        <div class="map-card__legend-values">
            <div>{colorStepper.min}</div>
            <div>{colorStepper.max}</div>
        </div>
    {:else if colorMode === 'palette'}
        <!-- Palette color boxes, row display, no labels only displaying palettes steps -->
        <div class="map-card__legend-container-palette">
            <div class="map-card__legend-row-palette">
                {#each colorScale as color}
                    <div class="map-card__legend-color-box-palette" style="--box-color: {color}" />
                {/each}
            </div>
            <div class="map-card__legend-row-palette">
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
    .map-card__legend {
        display: flex;
        flex-direction: column;
        width: 20%;
        padding: 13px;
        min-width: 200px;
        font-size: 0.8rem;
    }
    .map-card__legend-title {
        font-weight: 700;
        margin-bottom: 3px;
    }
    .map-card__legend-values {
        display: flex;
        justify-content: space-between;
        width: 100%;
        min-height: 16px;
        min-width: 206px;
    }
    /* Specific CSS for gradient */
    .map-card__legend-color-box-gradient {
        width: 100%;
        min-height: 16px;
        border-radius: 3px;
        background: var(--legend-color);
        margin-left: 3px;
        margin-bottom: 3px;
    }
    /* Specific CSS for palette */
    .map-card__legend-container-palette {
        display: flex;
        flex-direction: column;
    }
    .map-card__legend-row-palette {
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
    }
    .map-card__legend-color-box-palette {
        min-height: 16px;
        width: 100%;
        background: var(--box-color);
        display: flex;
        margin-bottom: 3px;
    }
    .map-card__legend-color-box-palette:not(:last-child) {
        margin-right: 1px;
    }
</style>
