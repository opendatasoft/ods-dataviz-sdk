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
import { computeBoundingBoxFromGeoJsonFeatures, computeMaxZoomFromGeoJsonFeatures } from './utils';

// bounding box to start from, and restrict to it
export let bbox;
// maplibre style (basemap)
export let style;
// maplibre source config
export let source;
// maplibre layer config
export let layer;
// single, main, side
export let size;

$: console.log('MapRender >', {
    bbox, style, source, layer, size,
})

let container;
let map;
let mapReady = false;

function initializeMap() {
    map = new maplibregl.Map({
        container,
        style,
        center: [3.5, 46], // starting position [lng, lat]
        zoom: 5 // starting zoom
    });

    const nav = new maplibregl.NavigationControl();
    map.addControl(nav, 'top-left');

    map.on('load', () => {
        mapReady = true;
    })
}

function updateSourceAndLayer(source, layer) {
    if (source && layer) {
        if (map.getLayer('shapes')) {
            map.removeLayer('shapes');
        }

        if (map.getSource('shapes')) {
            map.removeSource('shapes');
        }
        // FIXME add id and source so that the hardcoded name "shape" is the responsability of the component
        map.addSource('shapes', source);
        map.addLayer(layer);

        map.on('sourcedata', 'shapes', sourceLoadingCallback);
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
    if (e.isSourceLoaded) {
        // FIXME: use the bbox
        const renderedFeatures = map.queryRenderedFeatures();
        if (!bbox) {
            bbox = computeBoundingBoxFromGeoJsonFeatures(renderedFeatures);
        }
        map.fitBounds(bbox, {
            animate: false,
        });
        // Restrict interactions to these bounds
        map.setMaxBounds(map.getBounds());
                
        // Restrict zoom max
        // TODO test perfs
        const maxZoom = computeMaxZoomFromGeoJsonFeatures(renderedFeatures);
        map.setMaxZoom(maxZoom);

        map.off('sourcedata', 'shapes', sourceLoadingCallback);
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

<div>
    <div id="map" bind:this={container}></div>
</div>

<style>
#map {
    height: 400px;
}
</style>