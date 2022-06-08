<svelte:options immutable={true} />

<script lang="ts">
    import { onDestroy, onMount } from 'svelte';
    import { debounce } from 'lodash';
    import type { DataBounds, ColorsScale, LegendVariant } from '../types';
    import { defaultCompactLegendNumberFormat } from './formatter';

    // options to customize the component
    export let dataBounds: DataBounds;
    export let colorsScale: ColorsScale;
    export let variant: LegendVariant;
    export let title: string;

    // the part below is related to labels rotation
    let legendWidth: number;
    let colorBoxWidth: number;
    const labelsWidth: number[] = [];
    let maxLabelsSize: number;
    let numberOfLabels: number;
    let displayVertical: boolean;
    const handleLabelRotation = (): void => {
        if (colorsScale.type === 'palette' && labelsWidth.length !== 0) {
            const availableWidthPerLabel: number = legendWidth / numberOfLabels - 3;
            colorBoxWidth = legendWidth / numberOfLabels;
            numberOfLabels = colorsScale.type === 'palette' ? colorsScale.colors.length + 1 : 2;
            maxLabelsSize = labelsWidth.reduce((a, b) => Math.max(a, b));
            if (availableWidthPerLabel < maxLabelsSize) {
                displayVertical = true;
            } else {
                displayVertical = false;
            }
        }
    };
    const rotationDebounce = debounce(handleLabelRotation, 200);
    onMount(() => handleLabelRotation());
    // Makes rotationDebounce reactive to legendWith and colorScale changes
    $: if (legendWidth) {
        rotationDebounce();
    }
    $: if (colorsScale) {
        rotationDebounce();
    }
    onDestroy(() => rotationDebounce.cancel);
</script>

<div class={`legend-colors legend-colors--${variant}`}>
    {#if title}
        <div class="legend-colors-title">{title}</div>
    {/if}
    {#if colorsScale.type === 'gradient'}
        <!-- Gradient color boxes, no custom labels, only displaying min and max -->
        <div
            class="legend-colors-color-box-gradient"
            style="--legend-color:linear-gradient(to right, {colorsScale.colors.start}, {colorsScale
                .colors.end})"
        />
        <div class="legend-colors-values">
            <div>{defaultCompactLegendNumberFormat(dataBounds.min)}</div>
            <div>{defaultCompactLegendNumberFormat(dataBounds.max)}</div>
        </div>
    {:else if colorsScale.type === 'palette'}
        <!-- Palette color boxes, row display, no labels only displaying palettes steps -->
        <div class="legend-colors-container-palette" bind:clientWidth={legendWidth}>
            <div class="legend-colors-row-color-box-palette">
                {#each colorsScale.colors as color}
                    <div class="legend-colors-color-box-palette" style="--box-color: {color}" />
                {/each}
            </div>
            <div
                class="legend-colors-row-values-palette"
                class:vertical-labels-container={displayVertical}
            >
                {#each colorsScale.colors as _color, i}
                    {#if i === 0}
                        <div
                            bind:clientWidth={labelsWidth[i]}
                            class:vertical-label={displayVertical}
                            style="--label-row-width: {colorBoxWidth}px"
                        >
                            {defaultCompactLegendNumberFormat(dataBounds.min)}
                        </div>
                        <div
                            bind:clientWidth={labelsWidth[i]}
                            class:vertical-label={displayVertical}
                            style="--label-row-width: {colorBoxWidth}px"
                        >
                            {defaultCompactLegendNumberFormat(
                                dataBounds.min +
                                    (dataBounds.max - dataBounds.min) / colorsScale.colors.length
                            )}
                        </div>
                    {:else if i === colorsScale.colors.length - 1}
                        <div
                            bind:clientWidth={labelsWidth[i]}
                            class:vertical-label={displayVertical}
                            style="--label-row-width: {colorBoxWidth}px"
                        >
                            {defaultCompactLegendNumberFormat(dataBounds.max)}
                        </div>
                    {:else}
                        <div
                            bind:clientWidth={labelsWidth[i]}
                            class:vertical-label={displayVertical}
                            style="--label-row-width: {colorBoxWidth}px"
                        >
                            {defaultCompactLegendNumberFormat(
                                dataBounds.min +
                                    ((dataBounds.max - dataBounds.min) /
                                        colorsScale.colors.length) *
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
        width: 250px;
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
    }
    .legend-colors-color-box-palette {
        min-height: 16px;
        width: 100%;
        background: var(--box-color);
        display: flex;
        margin-bottom: 3px;
    }
    .legend-colors-color-box-palette:not(:last-child) {
        margin-right: 1px;
    }
    /* Handle labels rotation */
    .vertical-labels-container {
        margin: 6px -6px;
    }
    .vertical-label {
        transform: rotate(270deg);
        height: var(--label-row-width);
        min-width: var(--label-row-width);
        line-height: var(--label-row-width);
        margin: auto;
        text-align: right;
    }
</style>
