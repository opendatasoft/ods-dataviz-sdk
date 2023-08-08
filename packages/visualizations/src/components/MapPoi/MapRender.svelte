<svelte:options immutable={true} />

<script lang="ts">
    import type { BBox } from 'geojson';
    import type { LngLatBoundsLike, MapOptions, StyleSpecification } from 'maplibre-gl';
    import { onDestroy, onMount } from 'svelte';

    import MapPOI from './Map';

    // Base style, sources and layers
    export let style: MapOptions['style'];
    export let sources: StyleSpecification['sources'];
    export let layers: StyleSpecification['layers'];

    // Options
    export let bbox: BBox;
    export let aspectRatio: number;
    export let interactive: boolean;

    let container: HTMLElement;
    const map = new MapPOI();

    $: map.toggleInteractivity(interactive ? 'enable' : 'disable');
    $: map.setBbox(bbox);
    $: map.setStyle(style, { sources, layers });
    $: cssVarStyles = `--aspect-ratio:${aspectRatio};`;

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
    .map-card :global(.tooltip-on-hover > .maplibregl-popup-content) {
        border-radius: 6px;
        box-shadow: 0px 6px 13px rgba(0, 0, 0, 0.26);
        padding: 13px;
    }
    .map-card :global(.tooltip-on-hover .maplibregl-popup-tip) {
        border-top-color: transparent;
        border-bottom-color: transparent;
        border-left-color: transparent;
        border-right-color: transparent;
    }

    .main {
        aspect-ratio: var(--aspect-ratio);
        flex-grow: 1;
        position: relative;
        display: block;
    }
</style>
