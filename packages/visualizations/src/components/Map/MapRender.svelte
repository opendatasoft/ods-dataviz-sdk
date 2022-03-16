<svelte:options immutable={true} />

<script>
    /*
TODO:
- Restrict movement:
    - Block minZoom to the initial one after fitting the bbox
    - Compute maxZoom based on the smallest extent when using queryFeature restricted to this bbox
- Display the map based on style, source, layer, refresh when one changes
- Adapt display based on the size of the map (single, main, side)
*/
    import maplibregl from 'maplibre-gl';
    import { onMount, onDestroy } from 'svelte';
    import { debounce } from 'lodash';
    import {
        computeBoundingBoxFromGeoJsonFeatures,
        computeMaxZoomFromGeoJsonFeatures,
    } from './utils';

    // maplibre style (basemap)
    export let style;
    // maplibre source config
    export let source;
    // maplibre layer config
    export let layer;

    // aspect ratio based on width, by default equal to 1
    export let aspectRatio = 1;
    $: cssVarStyles = `--aspect-ratio:${aspectRatio};`;

    let container;
    let map;
    // bounding box to start from, and restrict to it
    let bbox;
    let mapReady = false;
    // Used to add a listener to resize map on container changes, canceled on destroy
    let resizer;

    // Used in front of console messages to debug multiple maps on a same page
    const mapId = Math.floor(Math.random() * 1000);
    const sourceId = `shape-source-${mapId}`;
    const layerId = `shape-layer-${mapId}`;

    $: console.log(mapId, 'MapRender >', {
        style,
        source,
        layer,
    });

    function fitMapToBbox(newBbox) {
        // Cancel saved max bounds to properly fitBounds
        map.setMaxBounds(null);
        map.fitBounds(newBbox, {
            animate: false,
            padding: 10,
        });
        // Rest min zoom and movement
        map.setMaxBounds(map.getBounds());
    }

    function initializeMap() {
        const start = {
            center: [3.5, 46],
            zoom: 5,
        };

        map = new maplibregl.Map({
            container,
            style,
            ...start,
        });

        // Set a resizeObserver to resize map on container size changes
        resizer = new ResizeObserver(
            debounce(() => {
                map.resize();
                if (bbox) {
                    fitMapToBbox(bbox);
                }
            }, 100)
        );

        resizer.observe(container);

        const nav = new maplibregl.NavigationControl();
        map.addControl(nav, 'top-left');

        map.on('load', () => {
            mapReady = true;
        });
    }

    function sourceLoadingCallback(e) {
        if (e.isSourceLoaded && e.sourceId === sourceId && e.sourceDataType !== 'metadata') {
            console.log(mapId, 'sourceLoadingCallback');
            const renderedFeatures = map.querySourceFeatures(sourceId, { sourceLayer: layerId });
            // Compute the bounding box of things currently displayed
            bbox = computeBoundingBoxFromGeoJsonFeatures(renderedFeatures);
            fitMapToBbox(bbox);

            // Restrict zoom max
            if (renderedFeatures.length) {
                const maxZoom = computeMaxZoomFromGeoJsonFeatures(container, renderedFeatures);
                map.setMaxZoom(maxZoom);
            }

            map.off('sourcedata', sourceLoadingCallback);
        }
    }

    function updateSourceAndLayer(newSource, newLayer) {
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

            map.on('sourcedata', sourceLoadingCallback);
        }
    }

    function updateStyle(newStyle) {
        if (mapReady) {
            map.setStyle(newStyle);
            // Changing the style resets the map
            map.once('styledata', () => updateSourceAndLayer(source, layer));
        }
    }

    // Lifecycle
    onMount(initializeMap);

    $: {
        if (mapReady) {
            updateSourceAndLayer(source, layer);
        }
    }

    $: updateStyle(style);

    onDestroy(() => resizer?.disconnect());
</script>

<div id="map" bind:this={container} style={cssVarStyles} />

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
</style>
