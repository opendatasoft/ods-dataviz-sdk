<svelte:options immutable={true} />

<script lang="ts">
    import type { BBox } from 'geojson';
    import type { LngLatBoundsLike, LngLatLike, MapOptions, StyleSpecification, GestureOptions } from 'maplibre-gl';
    import { onDestroy, onMount } from 'svelte';
    import CategoryLegend from '../Legend/CategoryLegend.svelte';
    import type { CategoryLegend as CategoryLegendType } from '../Legend/types';
    import SourceLink from '../utils/SourceLink.svelte';
    import type { Source } from '../types';

    import Map from './Map';
    import { getCenterZoomOptions } from './utils';
    import type { PopupsConfiguration } from './types';

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

    export let popupsConfiguration: PopupsConfiguration;

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
    $: map.setPopupsConfiguration(popupsConfiguration);
    $: map.jumpTo(getCenterZoomOptions({ zoom, center }));
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
    .map-card :global(.poi-map__popup) {
        /* To be above map controls (z-index: 2)*/
        z-index: 3;
        /* 26px is for its padding */
        max-height: calc(100% - 26px);
        height: auto;
        overflow-y: auto;
    }
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
    /* Add a more opacity and blur effect on map when cooperative gesture is shown */
    .map-card :global(.maplibregl-cooperative-gesture-screen) {
        background: rgba(0,0,0,0.6);
        backdrop-filter: blur(2px);
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
