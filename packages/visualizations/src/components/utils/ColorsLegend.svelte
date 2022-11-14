<svelte:options immutable={true} />

<script lang="ts">
    import { onDestroy } from 'svelte';
    import { debounce } from 'lodash';
    import type { DataBounds, ColorScale, LegendVariant } from '../types';
    import { defaultCompactLegendNumberFormat } from './formatter';

    // options to customize the component
    export let dataBounds: DataBounds;
    export let colorScale: ColorScale;
    export let variant: LegendVariant;
    export let title: string | undefined;

    // the part below is related to labels rotation
    let legendWidth: number;
    const labelsWidth: number[] = [];
    const labelsHeight: number[] = [];
    let maxLabelsSize: number;
    let numberOfLabels: number;
    let displayVertical: boolean | undefined;

    const handleLabelRotation = (
        legendW: number,
        labelW: number[],
        labelH: number[],
        colorsScl: ColorScale
    ): void => {
        const isPaletteLegend = colorsScl.type === 'palette';
        const isDomReady = labelH.length !== 0 && labelW.length !== 0 && legendW;
        const checkForRotation = isPaletteLegend && isDomReady;

        if (checkForRotation) {
            numberOfLabels = colorsScl.colors.length + 1;
            const availableWidthPerLabel: number = legendW / numberOfLabels - 3;
            maxLabelsSize = displayVertical ? Math.max(...labelH) : Math.max(...labelW);
            displayVertical = availableWidthPerLabel < maxLabelsSize;
        }
    };

    const rotationDebounce = debounce(handleLabelRotation, 200, { leading: true });
    $: if (labelsWidth.length > 0 && labelsHeight.length > 0 && dataBounds) {
        rotationDebounce(legendWidth, labelsWidth, labelsHeight, colorScale);
    }
    onDestroy(rotationDebounce.cancel);
</script>

<div class={`legend-colors legend-colors--${variant}`}>
    {#if title}
        <div class="legend-colors-title">{title}</div>
    {/if}
    {#if colorScale.type === 'gradient'}
        <!-- Gradient color boxes, no custom labels, only displaying min and max -->
        <div
            class="legend-colors-color-box-gradient"
            style="--legend-color:linear-gradient(to right, {colorScale.colors.start}, {colorScale
                .colors.end})"
        />
        <div class="legend-colors-values">
            <div>{defaultCompactLegendNumberFormat(dataBounds.min)}</div>
            <div>{defaultCompactLegendNumberFormat(dataBounds.max)}</div>
        </div>
    {:else if colorScale.type === 'palette'}
        <!-- Palette color boxes, row display, no labels only displaying palettes steps -->
        <div class="legend-colors-container-palette" bind:clientWidth={legendWidth}>
            <div class="legend-colors-row-color-box-palette">
                {#each colorScale.colors as color}
                    <div class="legend-colors-color-box-palette" style="--box-color: {color}" />
                {/each}
            </div>
            <div
                class="legend-colors-row-values-palette"
                class:vertical-labels-container={displayVertical}
            >
                {#each colorScale.colors as _color, i}
                    {#if i === 0}
                        <div
                            class="label-container"
                            bind:clientWidth={labelsWidth[i]}
                            bind:clientHeight={labelsHeight[i]}
                            class:vertical-label={displayVertical}
                        >
                            {defaultCompactLegendNumberFormat(dataBounds.min)}
                        </div>
                        <div
                            class="label-container"
                            bind:clientWidth={labelsWidth[i]}
                            bind:clientHeight={labelsHeight[i]}
                            class:vertical-label={displayVertical}
                        >
                            {defaultCompactLegendNumberFormat(
                                dataBounds.min +
                                    (dataBounds.max - dataBounds.min) / colorScale.colors.length
                            )}
                        </div>
                    {:else if i === colorScale.colors.length - 1}
                        <div
                            class="label-container"
                            bind:clientWidth={labelsWidth[i]}
                            bind:clientHeight={labelsHeight[i]}
                            class:vertical-label={displayVertical}
                        >
                            {defaultCompactLegendNumberFormat(dataBounds.max)}
                        </div>
                    {:else}
                        <div
                            class="label-container"
                            bind:clientWidth={labelsWidth[i]}
                            bind:clientHeight={labelsHeight[i]}
                            class:vertical-label={displayVertical}
                        >
                            {defaultCompactLegendNumberFormat(
                                dataBounds.min +
                                    ((dataBounds.max - dataBounds.min) / colorScale.colors.length) *
                                        (i + 1)
                            )}
                        </div>
                    {/if}
                {/each}
            </div>
        </div>
    {/if}
</div>

<style>
    .legend-colors {
        display: flex;
        flex-direction: column;
        font-size: 0.8rem;
    }
    .legend-colors--fixed {
        padding: 13px;
        width: 276px;
    }
    .legend-colors--fluid {
        width: 90%;
        padding: 6px;
        margin: auto;
    }
    .legend-colors-title {
        font-weight: 700;
        margin-bottom: 3px;
    }
    .legend-colors-values {
        display: flex;
        justify-content: space-between;
        min-height: 16px;
    }
    /* Specific CSS for gradient */
    .legend-colors-color-box-gradient {
        width: 100%;
        min-height: 16px;
        border-radius: 3px;
        background: var(--legend-color);
        margin-bottom: 3px;
    }
    /* Specific CSS for palette */
    .legend-colors-container-palette {
        display: flex;
        flex-direction: column;
    }
    .legend-colors-row-color-box-palette,
    .legend-colors-row-values-palette {
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
        line-height: 1em; /* for easier alignement */
    }
    .legend-colors-color-box-palette {
        min-height: 16px;
        width: 100%;
        background: var(--box-color);
        display: flex;
        margin-bottom: 6px;
    }
    .legend-colors-color-box-palette:not(:last-child) {
        margin-right: 1px;
    }
    .legend-colors-container-palette .label-container {
        display: flex;
        justify-content: center;
        align-items: flex-start;
    }
    .vertical-label {
        writing-mode: vertical-lr; /* ensure parent height */
        transform: rotate(180deg);
        height: fit-content;
    }
</style>
