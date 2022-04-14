<svelte:options immutable={true} />

<script lang="ts">
    import type { LegendOptions } from '../types';
    // options to customize the component
    export let dataBounds: { min: number; max: number };
    export let colorsScale: any;
    export let clientWidth: number;
    export let title: string;

    $: cssLegendVarStyles = `--legend-color:linear-gradient(to right, ${colorsScale.colors.start}, ${colorsScale.colors.end});`;
</script>

<div class="{clientWidth <= 375 ? 'legend--fluid' : 'legend--fixed'}" style={cssLegendVarStyles}>
    {#if title}
        <div class="legend-title">{title}</div>
    {/if}
    {#if colorsScale.type === 'gradient'}
        <!-- Gradient color boxex, no custom labels, only displaying min and max -->
        <div class="legend-color-box-gradient" />
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
    .legend--fixed {
        display: flex;
        flex-direction: column;
        width: 20%;
        padding: 13px;
        min-width: 200px;
        font-size: 0.8rem;
    }
    .legend--fluid {
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
    .legend--fixed .legend-values {
        min-width: 206px;
    }
    /* Specific CSS for gradient */
    .legend-color-box-gradient {
        width: 100%;
        min-height: 16px;
        border-radius: 3px;
        background: var(--legend-color);
        margin-bottom: 3px;
    }
    .legend--fixed .legend-color-box-gradient {
        margin-left: 3px;
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
    .legend--fixed .legend-color-box-palette:first-child {
        margin-left: 3px;
    }
    .legend-color-box-palette:not(:last-child) {
        margin-right: 1px;
    }
    .legend--fixed .legend-row-values-palette {
        min-width: 206px;
    }
</style>
