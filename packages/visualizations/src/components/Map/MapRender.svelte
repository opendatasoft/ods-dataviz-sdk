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
import { onMount } from 'svelte';
import { computeBoundingBoxFromGeoJsonFeatures, computeMaxZoomFromGeoJsonFeatures, getStartingPointForMap } from './utils';

// maplibre style (basemap)
export let style;
// maplibre source config
export let source;
// maplibre layer config
export let layer;

// aspect ratio based on width, by default equal to 1
export let aspectRatio = 1;

$: console.log('aspectRatio >', {
    aspectRatio,
})

$: cssVarStyles = `--aspect-ratio:${aspectRatio};`;

let container;
let map;
let bbox;
let mapReady = false;
// Used in front of console messages to debug multiple maps on a same page
let mapId = Math.floor(Math.random() * 1000);
let sourceId = 'shape-source-' + mapId;
let layerId = 'shape-layer-' + mapId;

$: console.log(mapId, 'MapRender >', {
    style, source, layer,
});


function initializeMap() {
    let start;

    start = {
        center: [3.5, 46],
        zoom: 5
    };

    map = new maplibregl.Map({
        container,
        style,
        ...start,
    });

    const nav = new maplibregl.NavigationControl();
    //map.addControl(nav, 'top-left');

    map.on('load', () => {
        mapReady = true;
    })
}

function updateSourceAndLayer(source, layer) {
    if (source && layer) {
        if (map.getLayer(layerId)) {
            map.removeLayer(layerId);
        }

        if (map.getSource(sourceId)) {
            map.removeSource(sourceId);
        }

        map.addSource(sourceId, source);
        map.addLayer({
            ...layer,
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

function sourceLoadingCallback(e) {
    if (e.isSourceLoaded && e.sourceId === sourceId && e.sourceDataType !== "metadata") {
        console.log(mapId, 'sourceLoadingCallback');
        const renderedFeatures = map.queryRenderedFeatures({
            layers: [layerId],
        });

        // Compute the bounding box of things currently displayed
        bbox = computeBoundingBoxFromGeoJsonFeatures(renderedFeatures);

        map.fitBounds(bbox, {
            animate: false,
        });

        // Rest min zoom and movement
        map.setMaxBounds(map.getBounds());

        // Restrict zoom max
        if (renderedFeatures.length) {
            const maxZoom = computeMaxZoomFromGeoJsonFeatures(container, renderedFeatures);
            map.setMaxZoom(maxZoom);
        }

        map.off('sourcedata', sourceLoadingCallback);
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

</script>

<div id="map" bind:this={container} style={cssVarStyles}></div>

<style>
#map {
    aspect-ratio: var(--aspect-ratio);
    /* height: 400px; */
}
</style>