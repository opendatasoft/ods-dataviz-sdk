<svelte:options immutable={true} />

<script>
    // options to customize the component
    export let options;
    export let colorStepper;
    export let colorScale;
    export let colorMode;

    function customLegendLabels(min, max, colorScale, index, customLabels) {
        let leftScale;
        let rightScale;
        const startLabel = customLabels[index]?.start || '';
        const middleLabel = customLabels[index]?.middle || ' - ';
        const endLabel = customLabels[index]?.end || '';

        switch (index) {
            case 0:
                leftScale = min;
                rightScale = min + (max - min) / colorScale.length - 1;
                break;
            case colorScale.length - 1:
                leftScale = min + ((max - min) / colorScale.length) * index;
                rightScale = max;
                break;
            default:
                leftScale = min + ((max - min) / colorScale.length) * index;
                rightScale = min + ((max - min) / colorScale.length) * (index + 1) - 1;
                break;
        }
        return `${startLabel}${leftScale}${middleLabel}${rightScale}${endLabel}`;
    }

    $: cssLegendVarStyles = `--legend-color:linear-gradient(to right, ${colorScale});`;
</script>

<div class="map-card__legend" style={cssLegendVarStyles}>
    {#if options.legend.title}
        <div class="map-card__legend-title">{options.legend.title}</div>
    {/if}
    {#if colorMode === 'gradient'}
        <!-- Gradient color box, non custom legend only taking min and max -->
        <div class="map-card__legend-color-box" />
        <div class="map-card__legend-values">
            <div>{colorStepper.min}</div>
            <div>{colorStepper.max}</div>
        </div>
    {:else if colorMode === 'palette'}
        {#if options.legend.customLabels}
            <!-- Palette color boxes, column display, non custom legend only taking palettes steps -->
            <div class="map-card__legend-palette-container">
                {#each colorScale as color, i}
                    <div class="map-card__legend-palette-container-row-vertical">
                        <div
                            class="map-card__legend-color-box-palette-vertical"
                            style="--box-color: {color}"
                        />
                        <div>
                            {customLegendLabels(
                                colorStepper.min,
                                colorStepper.max,
                                colorScale,
                                i,
                                options.legend.customLabels
                            )}
                        </div>
                    </div>
                {/each}
            </div>
        {:else}
            <!-- Palette color boxes, row display, non custom legend only taking palettes steps -->
            <div class="map-card__legend-palette-container">
                <div class="map-card__legend-palette-container-row">
                    {#each colorScale as color}
                        <div
                            class="map-card__legend-color-box-palette"
                            style="--box-color: {color}"
                        />
                    {/each}
                </div>
                <div class="map-card__legend-palette-container-row">
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
    {/if}
</div>

<style>
    .map-card__legend {
        display: flex;
        flex-direction: column;
        position: absolute;
        width: 20%;
        bottom: 0;
        left: 0;
        padding: 6px;
        min-width: 200px;
        font-size: 0.9rem;
    }
    .map-card__legend-title,
    .map-card__legend-values {
        font-size: 0.9rem;
        margin-bottom: 6px;
    }
    .map-card__legend-values {
        display: flex;
        justify-content: space-between;
        width: 100%;
        min-height: 16px;
        min-width: 206px;
    }
    .map-card__legend-color-box {
        width: 100%;
        min-height: 16px;
        border-radius: 3px;
        background: var(--legend-color);
        margin-left: 3px;
    }

    .map-card__legend-palette-container {
        display: flex;
        flex-direction: column;
    }

    .map-card__legend-palette-container-row {
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
    }

    .map-card__legend-palette-container-row-vertical {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
    }
    .map-card__legend-palette-container-row-vertical div:not(:last-child) {
        margin-right: 3px;
    }

    .map-card__legend-color-box-palette {
        min-height: 16px;
        width: 100%;
        background: var(--box-color);
        display: flex;
    }
    .map-card__legend-color-box-palette-vertical {
        height: 18px;
        width: 40px;
        background: var(--box-color);
        border-radius: 3px;
        margin: 3px 0;
        display: flex;
    }
    .map-card__legend-color-box-palette:not(:last-child) {
        margin-right: 3px;
    }
</style>
