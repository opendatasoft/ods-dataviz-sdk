<svelte:options immutable={true} />

<script lang="ts">
    import type { BBox } from 'geojson';
    import type { LngLatBoundsLike, MapOptions, StyleSpecification } from 'maplibre-gl';
    import { onDestroy, onMount } from 'svelte';

    import Map from './Map';
    import type { PopupsConfiguration } from './types';

    // Base style, sources and layers
    export let style: MapOptions['style'];
    export let sources: StyleSpecification['sources'];
    export let layers: StyleSpecification['layers'];

    // Options
    export let bbox: BBox;
    export let aspectRatio: number;
    export let interactive: boolean;
    export let popupsConfiguration: PopupsConfiguration;

    let container: HTMLElement;
    const map = new Map();

    $: map.toggleInteractivity(interactive ? 'enable' : 'disable');
    $: map.setBbox(bbox);
    $: map.setSourcesAndLayers(sources, layers);
    $: map.setPopupsConfiguration(popupsConfiguration);
    $: cssVarStyles = `--aspect-ratio:${aspectRatio};`;

    $: if (interactive === false) {
        map.setBbox(bbox);
    }

    // Lifecycle
    onMount(() => map.initialize(style, container, { bounds: bbox as LngLatBoundsLike }));
    onDestroy(() => map.remove());
</script>

<figure class="map-card maps-container" style={cssVarStyles}>
    <div class="main">
        <div id="map" bind:this={container} />
    </div>
</figure>

<style>
    #map {
        height: 400px;
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
    /* To add classes programmatically in svelte we will use a global selector. We place it inside a local selector to obtain some encapsulation and avoid side effects */
    .map-card :global(.poi-map__popup.poi-map__popup--as-sidebar) {
        /* TO DO: add common stylesheet */
        transform: translate(13px, 13px) !important;
    }
    .map-card :global(.poi-map__popup.poi-map__popup--as-sidebar > .maplibregl-popup-tip) {
        display: none;
    }
    .map-card :global(.poi-map__popup > .maplibregl-popup-content) {
        padding: 13px;
        border-radius: 6px;
        box-shadow: 0 6px 13px 0 rgba(0, 0, 0, 0.26);
    }
    .main {
        aspect-ratio: var(--aspect-ratio);
        flex-grow: 1;
        position: relative;
        display: block;
    }
</style>
