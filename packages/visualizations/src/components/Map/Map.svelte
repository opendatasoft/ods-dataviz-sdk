<script>
import maplibregl from 'maplibre-gl';
import { onMount } from 'svelte';
import { computeBoundingBoxFromGeoJsonFeatures, colorShapes } from './utils';

let container;
let map;
let mapReady = false;

export let data; // values, and the key to match
export let options; // contains the shapes to display & match

$: console.log('Options', options, 'Data', data);

const accessToken = 'nK5vMtSYLFbxt5586mifz7kObCYUTwVwz1rME1nmbrGAiuFMyznkIyDFhVnHhNGr';

onMount(() => {
    map = new maplibregl.Map({
        container,
        style: `https://api.jawg.io/styles/jawg-light.json?access-token=${accessToken}`, // stylesheet location
        center: [3.5, 46], // starting position [lng, lat]
        zoom: 5 // starting zoom
    });
    map.on('load', () => {
        mapReady = true;
    })
});

/* TODO: 
- Compute colors depending on values
- Associate colors to shapes using the keys
- Display shapes
*/

$: {
    if (mapReady && options.shapes && data && data.value) {
        const { shapes, parameters: { shapeKey, dataKey } } = options;

        // Compute the bounds
        const extent = computeBoundingBoxFromGeoJsonFeatures(shapes);
        const coloredShapes = colorShapes(shapes, data.value);

        // Display shapes
        if (map.getLayer('shapes')) {
            map.removeLayer('shapes');
        }

        /*
        if (map.getLayer('labels')) {
            map.removeLayer('labels');
        }
        */

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

        /*
        map.addLayer({
            'id': 'labels',
            'type': 'symbol',
            'source': 'shapes',
            'layout': {
                'text-field': [
                    'format',
                    ['get', 'key'],
                    {
                        'font-scale': 1,
                        'text-color': '#000',
                    }
                ]
            },
            'paint': {
                'text-halo-color': '#fff',
                'text-halo-width': 1,
            } 
        });
        */

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
