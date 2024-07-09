<script lang="ts">
    import type { LngLatBoundsLike } from 'maplibre-gl';
    import { onDestroy, onMount } from 'svelte';

    import createDeepEqual from 'stores/createDeepEqual';

    import Map from './WebGl';
    import {
        getCenterZoomOptions,
        getMapLayers,
        getMapOptions,
        getMapSources,
        getMapStyle,
        getPopupConfigurationByLayers,
    } from './utils';
    import type { WebGlMapData, WebGlMapOptions } from './types';

    export let options: WebGlMapOptions;
    export let data: WebGlMapData = {};

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

<div class="ods-visualization__map-container" bind:this={container} />

<style>
    .ods-visualization__map-container {
        height: 100%;
        width: 100%;
    }
    .ods-visualization__map-container :global(canvas) {
        cursor: default;
    }

    /* To add classes programmatically in svelte we will use a global selector.
    We place it inside a local selector to obtain some encapsulation and avoid side effects */

    /* --- POPUP ---  */
    .ods-visualization__map-container :global(.maplibregl-popup) {
        /* To be above map controls (z-index: 2)*/
        z-index: 3;
        height: auto;
        max-height: 100%;
        box-sizing: border-box;
    }
    .ods-visualization__map-container :global(.maplibregl-popup--as-sidebar),
    .ods-visualization__map-container :global(.maplibregl-popup--as-modal) {
        flex-direction: column;
        transform: translate(0px, 0px) !important;
        padding: 13px 13px 0px 13px;
    }

    .ods-visualization__map-container :global(.maplibregl-popup--as-modal) {
        width: 100%;
    }
    .ods-visualization__map-container :global(.maplibregl-popup--as-sidebar) {
        /* 300px for content and 26px for padding */
        width: calc(300px + 26px);
    }

    .ods-visualization__map-container :global(.maplibregl-popup--as-tooltip) {
        width: 300px;
        max-height: 50%;
    }

    /* --- POPUP TIP ---  */
    .ods-visualization__map-container
        :global(.maplibregl-popup--as-sidebar > .maplibregl-popup-tip),
    .ods-visualization__map-container :global(.maplibregl-popup--as-modal > .maplibregl-popup-tip) {
        display: none;
    }

    /* --- POPUP CONTENT ---  */
    .ods-visualization__map-container :global(.maplibregl-popup > .maplibregl-popup-content) {
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
    :global(.ods-visualization__map-popup-feature-content),
    :global(.ods-visualization__map-popup-feature-content--loading) {
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
    :global(.maplibregl-popup--as-tooltip .ods-visualization__map-popup-navigation-close-button),
    :global(.maplibregl-popup--as-tooltip
            .ods-visualization__map-popup-navigation-controls-offset) {
        display: none;
    }

    /* --- POPUP NAVIGATION CONTROLS ---  */
    :global(.ods-visualization__map-popup-navigation-controls) {
        --navigation-button-size: 36px;
        position: relative;
        display: flex;
        justify-content: flex-end;
        gap: 6px;
        margin: 6px;
        max-height: var(--navigation-button-size);
    }
    :global(.ods-visualization__map-popup-arrows-wrapper) {
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    :global(.ods-visualization__map-popup-navigation-controls-offset) {
        width: var(--navigation-button-size);
        flex-shrink: 0;
    }

    :global(.ods-visualization__map-popup-navigation-arrow-button) {
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
    :global(.ods-visualization__map-popup-navigation-arrow-button:disabled) {
        cursor: not-allowed;
    }
    :global(.ods-visualization__map-popup-navigation-arrow-button-icon) {
        width: 6px;
        height: 6px;
        border-top: 2px solid;
        border-left: 2px solid;
    }

    :global(#prevButton.ods-visualization__map-popup-navigation-arrow-button
            .ods-visualization__map-popup-navigation-arrow-button-icon) {
        transform: rotate(-45deg);
    }

    :global(#nextButton.ods-visualization__map-popup-navigation-arrow-button
            .ods-visualization__map-popup-navigation-arrow-button-icon) {
        transform: rotate(135deg);
    }

    :global(.ods-visualization__map-popup-navigation-arrow-button:disabled
            .ods-visualization__map-popup-navigation-arrow-button-icon) {
        opacity: 0.5;
    }

    :global(.ods-visualization__map-popup-navigation-close-button) {
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
    :global(.ods-visualization__map-popup-navigation-close-button-icon) {
        position: relative;
        display: block;
        width: 14px;
        height: 14px;
    }

    :global(.ods-visualization__map-popup-navigation-close-button-icon:before),
    :global(.ods-visualization__map-popup-navigation-close-button-icon:after) {
        position: absolute;
        left: 6px;
        content: '';
        height: 100%;
        width: 2px;
        border-radius: 2px;
        background-color: #333;
    }
    :global(.ods-visualization__map-popup-navigation-close-button-icon:before) {
        transform: rotate(45deg);
    }
    :global(.ods-visualization__map-popup-navigation-close-button-icon:after) {
        transform: rotate(-45deg);
    }

    /* --- CONTROLS --- */
    .ods-visualization__map-container :global(.maplibregl-ctrl.maplibregl-ctrl-group) {
        margin-top: 13px;
        margin-right: 13px;
        box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.26);
    }
</style>
