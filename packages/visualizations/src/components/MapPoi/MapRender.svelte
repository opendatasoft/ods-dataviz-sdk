<svelte:options immutable={true} />

<script lang="ts">
    import type { BBox } from 'geojson';
    import type { LngLatBoundsLike, MapOptions, StyleSpecification } from 'maplibre-gl';
    import { onDestroy, onMount } from 'svelte';
    import CategoryLegend from '../Legend/CategoryLegend.svelte';
    import type { CategoryLegend as CategoryLegendType } from '../Legend/types';

    import Map from './Map';

    // Base style, sources and layers
    export let style: MapOptions['style'];
    export let sources: StyleSpecification['sources'];
    export let layers: StyleSpecification['layers'];

    // Options
    export let bbox: BBox;
    export let aspectRatio: number;
    export let interactive: boolean;
    export let title: string | undefined;
    export let subtitle: string | undefined;
    export let legend: CategoryLegendType | undefined;
    export let description: string | undefined;

    // Used in front of console and error messages to debug multiple maps on a same page
    const mapId = Math.floor(Math.random() * 1000);

    let container: HTMLElement;
    const map = new Map();

    $: map.toggleInteractivity(interactive ? 'enable' : 'disable');
    $: map.setBbox(bbox);
    $: map.setSourcesAndLayers(sources, layers);
    $: cssVarStyles = `--aspect-ratio:${aspectRatio};`;

    // Lifecycle
    onMount(() => map.initialize(style, container, { bounds: bbox as LngLatBoundsLike }));
    onDestroy(() => map.remove());
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
