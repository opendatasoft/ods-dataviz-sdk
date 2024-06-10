<svelte:options immutable={true} />

<script lang="ts">
    import type { LngLatBoundsLike } from 'maplibre-gl';
    import { onDestroy, onMount } from 'svelte';

    import createDeepEqual from '../../../stores/createDeepEqual';

    import Map from './Map';
    import {
        getCenterZoomOptions,
        getMapLayers,
        getMapOptions,
        getMapSources,
        getMapStyle,
        getPopupConfigurationByLayers,
    } from './utils';
    import type { MapData, MapOptions } from './types';

    export let options: MapOptions;
    export let data: MapData = {};

    $: ({
        bbox: _bbox,
        center: _center,
        zoom,
        minZoom,
        maxZoom,
        interactive,
        images,
        transformRequest,
        cooperativeGestures,
        preserveDrawingBuffer,
    } = getMapOptions(options));

    const bbox = createDeepEqual(_bbox);
    const center = createDeepEqual(_center);
    $: bbox.update(_bbox);
    $: center.update(_center);

    $: style = getMapStyle(options.style);
    $: sources = getMapSources(data.sources);
    $: layers = getMapLayers(data.layers);
    $: popupConfigurationByLayers = getPopupConfigurationByLayers(data.layers);

    let container: HTMLElement;
    const map = new Map();

    const onDisable = () => {
        map.setBbox($bbox);
    };
    $: map.toggleInteractivity(interactive ? 'enable' : 'disable', { onDisable });
    $: map.setBbox($bbox);
    $: map.setMinZoom(minZoom);
    $: map.setMaxZoom(maxZoom);
    $: map.setSourcesAndLayers(sources, layers);
    $: map.setPopupConfigurationByLayers(popupConfigurationByLayers);
    $: map.jumpTo(getCenterZoomOptions({ zoom, center: $center }));
    $: map.loadImages(images);

    // Lifecycle
    onMount(() => {
        const mapOptions = {
            bounds: $bbox as LngLatBoundsLike,
            ...getCenterZoomOptions({ zoom, center: $center }),
            transformRequest,
            minZoom,
            maxZoom,
            cooperativeGestures,
            preserveDrawingBuffer,
        };
        map.initialize(style, container, mapOptions);
    });
    onDestroy(() => map.destroy());
</script>

<div class="map" bind:this={container} />

<style>
    div {
        height: 400px;
    }
    div :global(canvas) {
        cursor: default;
    }

    /* To add classes programmatically in svelte we will use a global selector.
    We place it inside a local selector to obtain some encapsulation and avoid side effects */

    /* --- POPUP ---  */
    :global(.poi-map__popup) {
        /* To be above map controls (z-index: 2)*/
        z-index: 3;
        height: auto;
        max-height: 100%;
        box-sizing: border-box;
        max-width: none !important;
    }
    :global(.poi-map__popup.poi-map__popup--as-sidebar),
    :global(.poi-map__popup.poi-map__popup--as-modal) {
        flex-direction: column;
        transform: translate(0px, 0px) !important;
        padding: 13px 13px 0px 13px;
    }

    :global(.poi-map__popup.poi-map__popup--as-modal) {
        width: 100% !important;
    }
    :global(.poi-map__popup.poi-map__popup--as-sidebar) {
        /* 300px for content and 26px for padding */
        width: calc(300px + 26px) !important;
    }

    :global(.poi-map__popup.poi-map__popup--as-tooltip) {
        width: 300px !important;
        max-height: 50%;
    }

    /* --- POPUP TIP ---  */
    :global(.poi-map__popup.poi-map__popup--as-sidebar > .maplibregl-popup-tip),
    :global(.poi-map__popup.poi-map__popup--as-modal > .maplibregl-popup-tip) {
        display: none;
    }

    /* --- POPUP CONTENT ---  */
    :global(.poi-map__popup > .maplibregl-popup-content) {
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
    :global(.poi-map__popup .poi-map__popup-feature-content),
    :global(.poi-map__popup .poi-map__popup-feature-content--loading) {
        margin: 13px;
    }
    /* Add a more opacity and blur effect on map when cooperative gesture is shown */
    :global(.maplibregl-cooperative-gesture-screen) {
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(2px);
    }

    /* --- POPUP CLOSE BUTTON ---  */
    /* Hide close button and offset when its display is as a tooltip
     * Hidden offset allow to center the arrows wrapper
     */
    :global(.poi-map__popup--as-tooltip .poi-map__popup-navigation-close-button),
    :global(.poi-map__popup--as-tooltip .poi-map__popup-navigation-controls-offset) {
        display: none;
    }

    /* --- POPUP NAVIGATION CONTROLS ---  */
    :global(.poi-map__popup-navigation-controls) {
        --navigation-button-size: 36px;
        position: relative;
        display: flex;
        justify-content: flex-end;
        gap: 6px;
        margin: 6px;
        max-height: var(--navigation-button-size);
    }
    :global(.poi-map__popup-arrows-wrapper) {
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    :global(.poi-map__popup-navigation-controls-offset) {
        width: var(--navigation-button-size);
        flex-shrink: 0;
    }

    :global(.poi-map__popup-navigation-arrow-button) {
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
    :global(.poi-map__popup-navigation-arrow-button:disabled) {
        cursor: not-allowed;
    }
    :global(.poi-map__popup-navigation-arrow-button-icon) {
        width: 6px;
        height: 6px;
        border-top: 2px solid;
        border-left: 2px solid;
    }

    :global(#prevButton.poi-map__popup-navigation-arrow-button
            .poi-map__popup-navigation-arrow-button-icon) {
        transform: rotate(-45deg);
    }

    :global(#nextButton.poi-map__popup-navigation-arrow-button
            .poi-map__popup-navigation-arrow-button-icon) {
        transform: rotate(135deg);
    }

    :global(.poi-map__popup-navigation-arrow-button:disabled
            .poi-map__popup-navigation-arrow-button-icon) {
        opacity: 0.5;
    }

    :global(.poi-map__popup-navigation-close-button) {
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
    :global(.poi-map__popup-navigation-close-button-icon) {
        position: relative;
        display: block;
        width: 14px;
        height: 14px;
    }

    :global(.poi-map__popup-navigation-close-button-icon:before),
    :global(.poi-map__popup-navigation-close-button-icon:after) {
        position: absolute;
        left: 6px;
        content: '';
        height: 100%;
        width: 2px;
        border-radius: 2px;
        background-color: #333;
    }
    :global(.poi-map__popup-navigation-close-button-icon:before) {
        transform: rotate(45deg);
    }
    :global(.poi-map__popup-navigation-close-button-icon:after) {
        transform: rotate(-45deg);
    }

    /* --- CONTROLS --- */
    :global(.maplibregl-ctrl.maplibregl-ctrl-group) {
        margin-top: 13px;
        margin-right: 13px;
        box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.26);
    }
</style>
