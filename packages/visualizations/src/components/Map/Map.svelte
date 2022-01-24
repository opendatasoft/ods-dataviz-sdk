<script>
import maplibregl from 'maplibre-gl';
import { onMount } from 'svelte';
import { computeBoundingBoxFromGeoJsonFeatures, colorShapes } from './utils';
import { BLANK } from './mapStyles';

let container;
let map;
let mapReady = false;
let currentStyle;

export let data; // values, and the key to match
export let options; // contains the shapes to display & match

$: console.log('Options', options, 'Data', data);

function basemapConfigToStyle(basemapStyle) {
    return basemapStyle || BLANK;
}

onMount(() => {
    currentStyle = basemapConfigToStyle(options.basemapStyle)
    map = new maplibregl.Map({
        container,
        style: currentStyle,
        center: [3.5, 46], // starting position [lng, lat]
        zoom: 5 // starting zoom
    });

    const nav = new maplibregl.NavigationControl();
    map.addControl(nav, 'top-left');

    map.on('load', () => {
        mapReady = true;
    })
});

$: {
    if (map && mapReady) {
        const newStyle = basemapConfigToStyle(options.basemapStyle);
        // Smart comparison to write here...
        // But for now we support two basemaps with different types, so...
        if (typeof(newStyle) !== typeof(currentStyle)) {
            mapReady = false;
            map.once('styledata', (e) => {
                // This event is called many times, so just reacting to the first one may be an issue
                currentStyle = newStyle;
                mapReady = true;
            })
            if (options.basemapStyle) {
                map.setStyle(options.basemapStyle);
            } else {
                map.setStyle(BLANK);
            }
        }
    }
}

$: {
    if (mapReady && options.shapes && data && data.value) {
        console.log('refresh data');
        //const { shapes, colorScale } = options;

        // Compute the bounds
        const extent = computeBoundingBoxFromGeoJsonFeatures(options.shapes);
        const coloredShapes = colorShapes(options.shapes, data.value, options.colorScale);

        // Display shapes
        if (map.getLayer('shapes')) {
            map.removeLayer('shapes');
        }

        if (map.getSource('shapes')) {
            map.removeSource('shapes');
        }

        map.addSource('shapes', {
            type: 'geojson',
            data: coloredShapes,
        });

        map.addLayer({
            'id': 'shapes',
            'type': 'fill',
            'source': 'shapes',
            'layout': {},
            'paint': {
                'fill-color': ['get', 'color'],
                'fill-opacity': 0.8,
                'fill-outline-color': '#fff',
            }
        });

        map.fitBounds(extent);
    }
}

</script>

<div class="map">
    <div class="map-container" bind:this={container}></div>
</div>

<style>
.map-container {
    height: 400px;
}
</style>
