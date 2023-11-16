<svelte:options immutable={true} />

<script lang="ts">
    import type { BBox } from 'geojson';
    import type {
        LngLatBoundsLike,
        LngLatLike,
        MapOptions,
        StyleSpecification,
        GestureOptions,
    } from 'maplibre-gl';
    import { onDestroy, onMount } from 'svelte';
    import CategoryLegend from '../Legend/CategoryLegend.svelte';
    import type { CategoryLegend as CategoryLegendType } from '../Legend/types';
    import SourceLink from '../utils/SourceLink.svelte';
    import type { Source } from '../types';

    import Map from './Map';
    import { getCenterZoomOptions } from './utils';
    import type { PopupConfigurationByLayers, PoiMapOptions } from './types';

    // Base style, sources and layers
    export let style: MapOptions['style'];
    export let sources: StyleSpecification['sources'];
    export let layers: StyleSpecification['layers'];
    export let transformRequest: MapOptions['transformRequest'];

    // Options
    export let bbox: BBox | undefined;
    export let zoom: number | undefined;
    export let minZoom: number | undefined;
    export let maxZoom: number | undefined;
    export let center: LngLatLike | undefined;
    export let images: PoiMapOptions['images'];
    export let aspectRatio: number;
    export let interactive: boolean;
    export let title: string | undefined;
    export let subtitle: string | undefined;
    export let legend: CategoryLegendType | undefined;
    export let description: string | undefined;
    export let cooperativeGestures: boolean | GestureOptions | undefined;
    // Data source link
    export let sourceLink: Source | undefined;

    // Used in front of console and error messages to debug multiple maps on a same page
    const mapId = Math.floor(Math.random() * 1000);

    export let popupConfigurationByLayers: PopupConfigurationByLayers;

    let container: HTMLElement;
    const map = new Map();

    const onDisable = () => {
        map.setBbox(bbox);
    };

    $: map.toggleInteractivity(interactive ? 'enable' : 'disable', { onDisable });
    $: map.setBbox(bbox);
    $: map.setMinZoom(minZoom);
    $: map.setMaxZoom(maxZoom);
    $: map.setSourcesAndLayers(sources, layers);
    $: map.setpopupConfigurationByLayers(popupConfigurationByLayers);
    $: map.jumpTo(getCenterZoomOptions({ zoom, center }));
    $: map.loadImages(images);
    $: cssVarStyles = `--aspect-ratio:${aspectRatio};`;

    // Lifecycle
    onMount(() => {
        const options = {
            bounds: bbox as LngLatBoundsLike,
            ...getCenterZoomOptions({ zoom, center }),
            transformRequest,
            minZoom,
            maxZoom,
            cooperativeGestures,
        };
        map.initialize(style, container, options);
    });
    onDestroy(() => map.destroy());
</script>

<figure class="map-card maps-container" style={cssVarStyles}>
    {#if title || subtitle}
        <figcaption>
            {#if title}
                <h3>
                    {title}
                </h3>
            {/if}
            {#if subtitle}
                <p>
                    {subtitle}
                </p>
            {/if}
        </figcaption>
    {/if}
    <div class="main" aria-describedby={description ? mapId.toString() : undefined}>
        <div id="map" bind:this={container} />
    </div>
    {#if description}
        <p id={mapId.toString()} class="a11y-invisible-description">{description}</p>
    {/if}
    {#if legend}
        <CategoryLegend legendOptions={legend} />
    {/if}
    {#if sourceLink}
        <SourceLink source={sourceLink} />
    {/if}
</figure>

<style>
    #map {
        height: 400px;
    }
    #map :global(canvas) {
        cursor: default;
    }
    @supports (aspect-ratio: auto) {
        #map {
            height: auto;
            aspect-ratio: var(--aspect-ratio);
        }
    }
    .map-card {
        display: flex;
        flex-direction: column;
        margin: 0;
        position: relative;
    }
    figcaption {
        margin: 0 0 1em 0;
    }
    figcaption p,
    figcaption h3 {
        margin: 0;
    }

    /* To add classes programmatically in svelte we will use a global selector. We place it inside a local selector to obtain some encapsulation and avoid side effects */

    /* --- POPUP ---  */
    .map-card :global(.poi-map__popup) {
        /* To be above map controls (z-index: 2)*/
        z-index: 3;
        height: auto;
        max-height: 100%;
        box-sizing: border-box;
        max-width: none !important;
    }
    .map-card :global(.poi-map__popup.poi-map__popup--as-sidebar),
    .map-card :global(.poi-map__popup.poi-map__popup--as-modal) {
        flex-direction: column;
        transform: translate(0px, 0px) !important;
        padding: 13px 13px 0px 13px;
    }

    .map-card :global(.poi-map__popup.poi-map__popup--as-modal) {
        width: 100% !important;
    }
    .map-card :global(.poi-map__popup.poi-map__popup--as-sidebar) {
        /* 300px for content and 26px for padding */
        width: calc(300px + 26px) !important;
    }

    .map-card :global(.poi-map__popup.poi-map__popup--as-tooltip) {
        width: 300px !important;
    }

    /* --- POPUP TIP ---  */
    .map-card :global(.poi-map__popup.poi-map__popup--as-sidebar > .maplibregl-popup-tip),
    :global(.poi-map__popup.poi-map__popup--as-modal > .maplibregl-popup-tip) {
        display: none;
    }

    /* --- POPUP CONTENT ---  */
    .map-card :global(.poi-map__popup > .maplibregl-popup-content) {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        padding: 13px;
        border-radius: 6px;
        max-height: 100%;
        overflow-y: auto;
        box-sizing: border-box;
        box-shadow: 0 6px 13px 0 rgba(0, 0, 0, 0.26);
    }
    /* Add a more opacity and blur effect on map when cooperative gesture is shown */
    .map-card :global(.maplibregl-cooperative-gesture-screen) {
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(2px);
    }

    /* --- POPUP CLOSE BUTTON ---  */
    .map-card :global(.maplibregl-popup-close-button) {
        font-size: 16px;
        padding: 0;
        width: 24px;
        height: 24px;
        margin-bottom: 13px;
        position: relative;
        order: -1;
        flex-shrink: 0;
        left: calc(100% - 26px);
    }
    .map-card :global(.maplibregl-popup-close-button:hover) {
        background-color: transparent;
    }
    /* Hide close button when content is loading or when its display is as a tooltip */
    .map-card :global(.poi-map__popup--loading .maplibregl-popup-close-button),
    .map-card :global(.poi-map__popup--as-tooltip .maplibregl-popup-close-button) {
        display: none;
    }

    /* --- CONTROLS --- */
    .map-card :global(.maplibregl-ctrl.maplibregl-ctrl-group) {
        margin-top: 13px;
        margin-right: 13px;
        box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.26);
    }
    .main {
        aspect-ratio: var(--aspect-ratio);
        flex-grow: 1;
        position: relative;
        display: block;
    }
    /* Suitable for elements that are used via aria-describedby or aria-labelledby */
    .a11y-invisible-description {
        display: none;
    }
</style>
