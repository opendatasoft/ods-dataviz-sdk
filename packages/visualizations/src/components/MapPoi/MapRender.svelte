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
    export let preserveDrawingBuffer: boolean;
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
    $: map.setPopupConfigurationByLayers(popupConfigurationByLayers);
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
            preserveDrawingBuffer,
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

    /* To add classes programmatically in svelte we will use a global selector.
    We place it inside a local selector to obtain some encapsulation and avoid side effects */

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
        max-height: 50%;
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
        padding: 0px;
        border-radius: 6px;
        max-height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        box-sizing: border-box;
        box-shadow: 0 6px 13px 0 rgba(0, 0, 0, 0.26);
    }
    .map-card :global(.poi-map__popup .poi-map__popup-feature-content),
    .map-card :global(.poi-map__popup .poi-map__popup-feature-content--loading) {
        margin: 13px;
    }
    /* Add a more opacity and blur effect on map when cooperative gesture is shown */
    .map-card :global(.maplibregl-cooperative-gesture-screen) {
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(2px);
    }

    /* --- POPUP CLOSE BUTTON ---  */
    /* Hide close button and offset when its display is as a tooltip
     * Hidden offset allow to center the arrows wrapper
     */
    .map-card :global(.poi-map__popup--as-tooltip .poi-map__popup-navigation-close-button),
    .map-card :global(.poi-map__popup--as-tooltip .poi-map__popup-navigation-controls-offset) {
        display: none;
    }

    /* --- POPUP NAVIGATION CONTROLS ---  */
    .map-card :global(.poi-map__popup-navigation-controls) {
        --navigation-button-size: 36px;
        position: relative;
        display: flex;
        justify-content: flex-end;
        gap: 6px;
        margin: 6px;
        max-height: var(--navigation-button-size);
    }
    .map-card :global(.poi-map__popup-arrows-wrapper) {
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .map-card :global(.poi-map__popup-navigation-controls-offset) {
        width: var(--navigation-button-size);
        flex-shrink: 0;
    }

    .map-card :global(.poi-map__popup-navigation-arrow-button) {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0px;
        width: var(--navigation-button-size);
        height: var(--navigation-button-size);
        background: none;
        border: none;
        cursor: pointer;
    }
    .map-card :global(.poi-map__popup-navigation-arrow-button:disabled) {
        cursor: not-allowed;
    }
    .map-card :global(.poi-map__popup-navigation-arrow-button-icon) {
        width: 6px;
        height: 6px;
        border-top: 2px solid;
        border-left: 2px solid;
    }
    .map-card
        :global(#prevButton.poi-map__popup-navigation-arrow-button
            .poi-map__popup-navigation-arrow-button-icon) {
        transform: rotate(-45deg);
    }
    .map-card
        :global(#nextButton.poi-map__popup-navigation-arrow-button
            .poi-map__popup-navigation-arrow-button-icon) {
        transform: rotate(135deg);
    }

    .map-card
        :global(.poi-map__popup-navigation-arrow-button:disabled
            .poi-map__popup-navigation-arrow-button-icon) {
        opacity: 0.5;
    }

    .map-card :global(.poi-map__popup-navigation-close-button) {
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--navigation-button-size);
        height: var(--navigation-button-size);
        padding: 0px;
        border: none;
        background: none;
        cursor: pointer;
        flex-shrink: 0;
    }
    .map-card :global(.poi-map__popup-navigation-close-button-icon) {
        position: relative;
        display: block;
        width: 14px;
        height: 14px;
    }

    .map-card :global(.poi-map__popup-navigation-close-button-icon:before),
    .map-card :global(.poi-map__popup-navigation-close-button-icon:after) {
        position: absolute;
        left: 6px;
        content: '';
        height: 100%;
        width: 2px;
        border-radius: 2px;
        background-color: #333;
    }
    .map-card :global(.poi-map__popup-navigation-close-button-icon:before) {
        transform: rotate(45deg);
    }
    .map-card :global(.poi-map__popup-navigation-close-button-icon:after) {
        transform: rotate(-45deg);
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
