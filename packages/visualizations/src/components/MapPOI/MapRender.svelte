<svelte:options immutable={true} />

<script lang="ts">
    import maplibregl, {
        Map as MapType,
        SourceSpecification,
        StyleSpecification,
        NavigationControl,
        MapSourceDataEvent,
        LngLatLike,
        LngLatBoundsLike,
        MapLayerMouseEvent,
    } from 'maplibre-gl';
    import type { BBox } from 'geojson';

    import { onMount } from 'svelte';
    import type {
        POIMapLayer,
        MapRenderTooltipFunction,
    } from './types';
    import { BLANK } from './mapStyles';

    // maplibre style (basemap)
    export let style: StyleSpecification = BLANK;
    // maplibre source config
    export let source: SourceSpecification;
    // maplibre layer config
    export let layer: POIMapLayer;
    // bounding box to start from, and restrict to it
    export let bbox: BBox | undefined;
    $: currentBbox = bbox;
    // Used to render tooltips on hover
    export let renderTooltip: MapRenderTooltipFunction;

    const hoverPopup = new maplibregl.Popup({
        closeOnClick: false,
        closeButton: false,
        className: 'tooltip-on-hover',
    }).trackPointer();

    let container: HTMLElement;
    let map: MapType;
    // Used to add navigation control to map
    let nav: NavigationControl;

    let mapReady = false;

    // Used in front of console and error messages to debug multiple maps on a same page
    const mapId = Math.floor(Math.random() * 1000);
    const sourceId = `shape-source-${mapId}`;
    const layerId = `shape-layer-${mapId}`;

    function initializeMap() {
        const defaultCenter: LngLatLike = [3.5, 46];
        const start = {
            center: defaultCenter,
            zoom: 5,
        };

        map = new maplibregl.Map({
            container,
            style,
            ...start,
        });

        nav = new maplibregl.NavigationControl({ showCompass: false });

        map.addControl(nav, 'top-right');

        map.on('load', () => {
            mapReady = true;
        });

        return () => map.remove();
    }

    function sourceLoadingCallback(e: MapSourceDataEvent) {
        // sourceDataType can be "visibility" or "metadata", in which case it's not about the data itself
        if (e.isSourceLoaded && e.sourceId === sourceId && !e.sourceDataType) {
            map.querySourceFeatures(
                sourceId,
                // The type forces you to pass a filter parameter in the option, but it's not required by the real code
                // https://github.com/maplibre/maplibre-gl-js/issues/1393
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                {
                    sourceLayer: layer['source-layer'] || layerId, // FIXME: This may not the best way to do it
                }
            );
            map.off('sourcedata', sourceLoadingCallback);
        }
    }

    const setBbox = (box: BBox | undefined) => {
        if (!box) {
            // zoom-out to bounds defined in the initialization
            map.setZoom(map.getMinZoom());
            return;
        }
        // Cancel any saved max bounds to properly fitBounds
        map.setMaxBounds(null);
        // Using padding, keep enough room for controls (zoom) to make sure they don't hide anything
        map.fitBounds(box as LngLatBoundsLike, {
            animate: false,
            padding: 40,
        });
        // Set new map max bounds after bbox changes
        map.setMaxBounds(map.getBounds());
    };

    function addTooltip(e: MapLayerMouseEvent) {
        if (e.features) {
            const tooltipDescription = renderTooltip(e.features[0]);
            if (tooltipDescription) {
                if (hoverPopup.isOpen()) {
                    hoverPopup.setLngLat(e.lngLat).setHTML(tooltipDescription);
                } else {
                    hoverPopup.setLngLat(e.lngLat).setHTML(tooltipDescription).addTo(map);
                }
            }
        }
    }

    function removeTooltip() {
        hoverPopup.remove();
    }

    function updateSourceAndLayer(newSource: SourceSpecification, newLayer: POIMapLayer) {
        if (newSource && newLayer) {
            if (map.getLayer(layerId)) {
                map.removeLayer(layerId);
            }

            if (map.getSource(sourceId)) {
                map.removeSource(sourceId);
            }

            map.addSource(sourceId, newSource);
            map.addLayer({
                ...newLayer,
                id: layerId,
                source: sourceId,
            });
            // Handle tooltip display
            map.off('mousemove', layerId, addTooltip);
            map.off('mouseleave', layerId, removeTooltip);

            map.on('mousemove', layerId, addTooltip);
            map.on('mouseleave', layerId, removeTooltip);
            map.on('sourcedata', sourceLoadingCallback);
        }
    }

    // Lifecycle
    onMount(initializeMap);

    $: if (mapReady) {
        updateSourceAndLayer(source, layer);
    }
    $: if (mapReady && currentBbox) {
        setBbox(currentBbox);
    }
</script>

<figure class="map-card maps-container" >

    <div class="main">
        <div id="map" bind:this={container} />
    </div>
</figure>

<style>
    #map {
        height: 400px;
    }
    .map-card {
        display: flex;
        flex-direction: column;
        margin: 0;
        position: relative;
    }
    .main {
        flex-grow: 1;
        position: relative;
        display: block;
    }
</style>
