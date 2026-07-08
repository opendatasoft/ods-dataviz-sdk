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

    // 'top-left' / 'top-right' float the legend over the map; anything else (incl.
    // the default) keeps the legacy legend below the map.
    $: legendPosition = legend?.position ?? CATEGORY_LEGEND_POSITION.Bottom;
    $: isOverlayLegend =
        !!legend &&
        (legendPosition === CATEGORY_LEGEND_POSITION.TopLeft ||
            legendPosition === CATEGORY_LEGEND_POSITION.TopRight);

    $: cssVarStyles = `--aspect-ratio:${aspectRatio};`;
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
    <div class="main" aria-describedby={description ? mapId.toString() : undefined}>
        {#key options.style}
            <WelGlMap {options} data={data.value} />
        {/key}
        {#if legend && isOverlayLegend}
            <div
                class="legend-overlay"
                class:top-left={legendPosition === CATEGORY_LEGEND_POSITION.TopLeft}
                class:top-right={legendPosition === CATEGORY_LEGEND_POSITION.TopRight}
            >
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
    /* Floating legend overlaid on the map. Positioned with logical insets so it
       mirrors automatically in RTL (top-left <-> top-right). The map controls sit
       in the top-inline-end corner, so the legend keeps clear of them. */
    .legend-overlay {
        position: absolute;
        inset-block-start: 8px;
        z-index: 1;
        max-width: 240px;
        max-height: calc(100% - 16px);
        overflow: auto;
        background: #fff;
        border-radius: 4px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
        padding: 4px 0;
    }
    .legend-overlay.top-left {
        inset-inline-start: 8px;
    }
    .legend-overlay.top-right {
        inset-inline-end: 8px;
    }
    /* Suitable for elements that are used via aria-describedby or aria-labelledby */
    .a11y-invisible-description {
        display: none;
    }
</style>
