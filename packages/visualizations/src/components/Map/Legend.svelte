<svelte:options immutable={true} />

<script lang="ts">
    import type { DataBounds, ColorsScale } from '../types';
    // options to customize the component
    export let dataBounds: DataBounds;
    export let colorsScale: ColorsScale;
    export let clientWidth: number;
    export let title: string;
</script>

<div class="legend {clientWidth <= 375 ? 'legend--fluid' : 'legend--fixed'}">
    {#if title}
        <div class="legend-title">{title}</div>
    {/if}
    {#if colorsScale.type === 'gradient'}
        <!-- Gradient color boxes, no custom labels, only displaying min and max -->
        <div
            class="legend-color-box-gradient"
            style="--legend-color:linear-gradient(to right, {colorsScale.colors.start}, {colorsScale
                .colors.end})"
        />
        <div class="legend-values">
            <div>{dataBounds.min}</div>
            <div>{dataBounds.max}</div>
        </div>
    {:else if colorsScale.type === 'palette'}
        <!-- Palette color boxes, row display, no labels only displaying palettes steps -->
        <div class="legend-container-palette">
            <div class="legend-row-color-box-palette">
                {#each colorsScale.colors as color}
                    <div class="legend-color-box-palette" style="--box-color: {color}" />
                {/each}
            </div>
            <div class="legend-row-values-palette">
                {#each colorsScale.colors as color, i}
                    {#if i === 0}
                        <div>{dataBounds.min}</div>
                        <div>
                            {dataBounds.min +
                                (dataBounds.max - dataBounds.min) / colorsScale.colors.length}
                        </div>
                    {:else if i === colorsScale.colors.length - 1}
                        <div>{dataBounds.max}</div>
                    {:else}
                        <div>
                            {dataBounds.min +
                                ((dataBounds.max - dataBounds.min) / colorsScale.colors.length) *
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
        font-size: 0.8rem;
    }
    .legend--fixed {
        padding: 13px;
        width: 200px;
    }
    .legend--fluid {
        width: 90%;
        padding: 6px;
        margin: auto;
    }
    .legend-title {
        font-weight: 700;
        margin-bottom: 3px;
    }
    .legend-values {
        display: flex;
        justify-content: space-between;
        min-height: 16px;
    }
    /* Specific CSS for gradient */
    .legend-color-box-gradient {
        width: 100%;
        min-height: 16px;
        border-radius: 3px;
        background: var(--legend-color);
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
    .legend-color-box-palette:not(:last-child) {
        margin-right: 1px;
    }
</style>
