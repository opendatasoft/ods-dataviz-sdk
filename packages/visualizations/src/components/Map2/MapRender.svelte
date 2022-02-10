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


let container;
let map;
let mapReady = false;
let mapId = Math.floor(Math.random() * 1000);
let sourceId = 'shape-source-' + mapId;
let layerId = 'shape-layer-' + mapId;

$: console.log(mapId, 'MapRender >', {
    bbox, style, source, layer, size,
});


function initializeMap() {
    let start;
    if (bbox) {
        start = getStartingPointForMap(container, bbox);
        console.log('start', start);
    } else {
        start = {
            center: [3.5, 46],
            zoom: 5
        };
    }
    
    map = new maplibregl.Map({
        container,
        style,
        ...start,
    });

    const nav = new maplibregl.NavigationControl();
    //map.addControl(nav, 'top-left');

    map.on('load', () => {
        console.log(mapId, 'Map ready')
        mapReady = true;
    })
}

function updateSourceAndLayer(source, layer) {
    if (source && layer) {
        console.log(mapId, 'updateSourceAndLayer', {source, layer})
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
console.log('binding on', sourceId);
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
    if (e.isSourceLoaded && e.sourceId === sourceId) {
        console.log(mapId, 'sourceLoadingCallback');
        const renderedFeatures = map.queryRenderedFeatures(bbox, {
            layers: [layerId],
        });
        if (!bbox) {
            bbox = computeBoundingBoxFromGeoJsonFeatures(renderedFeatures);

            map.fitBounds(bbox, {
                animate: false,
            }).once('moveend', () => {
                // Restrict interactions to these bounds
                map.setMaxBounds(map.getBounds());
            });
        } else {
            map.setMaxBounds(map.getBounds());
        }
                
        // Restrict zoom max
        // TODO test perfs
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

<div id="map" class={`map--size-${size}`} bind:this={container}></div>

<style>
#map {

}

.map--size-single {
    height: 400px;
}

.map--size-main {
    height: 400px;
}

.map--size-side {
    height: 160px;
    border: solid 5px white;
    flex-grow: 1;
}
</style>