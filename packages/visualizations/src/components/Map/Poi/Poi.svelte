<script lang="ts">
    import CategoryLegend from 'components/Legend/CategoryLegend.svelte';
    import { CATEGORY_LEGEND_POSITION } from 'components/Legend/types';
    import Card from 'components/utils/Card.svelte';
    import WelGlMap from '../WebGl';

    import type { PoiMapProps } from './types';
    import { DEFAULT_ASPECT_RATIO } from './constants';

    // ensure exported type matches declared props
    type $$Props = PoiMapProps;

    export let data: $$Props['data'];
    export let options: $$Props['options'];

    // Used in front of console and error messages to debug multiple maps on a same page
    const mapId = Math.floor(Math.random() * 1000);

    $: ({
        title,
        subtitle,
        description,
        legend,
        links,
        aspectRatio = DEFAULT_ASPECT_RATIO,
    } = options);

    // 'top-left' floats the legend over the map; anything else (incl. the
    // default) keeps the legacy legend below the map.
    $: isOverlayLegend = !!legend && legend.position === CATEGORY_LEGEND_POSITION.topLeft;

    $: cssVarStyles = `--aspect-ratio:${aspectRatio};`;

    // The fullscreen control expands this wrapper (map + legend overlay) rather
    // than the bare map container, so the overlay legend stays visible.
    let mainEl: HTMLElement | undefined;
</script>

<Card
    {title}
    {subtitle}
    {links}
    defaultStyle={false}
    style={cssVarStyles}
    tag="figure"
    className="map-card maps-container ods-dataviz--maps"
>
    <div
        class="main"
        bind:this={mainEl}
        aria-describedby={description ? mapId.toString() : undefined}
    >
        {#key options.style}
            <WelGlMap options={{ ...options, fullscreenContainer: mainEl }} data={data.value} />
        {/key}
        {#if legend && isOverlayLegend}
            <div class="legend-overlay">
                <CategoryLegend legendOptions={legend} />
            </div>
        {/if}
    </div>
    {#if description}
        <p id={mapId.toString()} class="a11y-invisible-description">{description}</p>
    {/if}
    {#if legend && !isOverlayLegend}
        <CategoryLegend legendOptions={legend} />
    {/if}
</Card>

<style>
    .main {
        aspect-ratio: var(--aspect-ratio);
        flex-grow: 1;
        position: relative;
        display: block;
    }
    /* In fullscreen the wrapper fills the screen instead of keeping the card ratio.
       MapLibre falls back to a class-based pseudo fullscreen when the Fullscreen API
       is unavailable (iOS). */
    .main:fullscreen,
    .main:global(.maplibregl-pseudo-fullscreen) {
        aspect-ratio: auto;
    }
    /* Floating legend overlaid on the map. Positioned with logical insets so it
       mirrors automatically in RTL (top-left in LTR, top-right in RTL). */
    .legend-overlay {
        position: absolute;
        inset-block-start: 8px;
        inset-inline-start: 8px;
        z-index: 1;
        max-width: 240px;
        max-height: calc(100% - 16px);
        overflow: auto;
        background: #fff;
        border-radius: 4px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
        padding: 4px 0;
    }
    /* Suitable for elements that are used via aria-describedby or aria-labelledby */
    .a11y-invisible-description {
        display: none;
    }
</style>
