<svelte:options immutable={true} />

<script>
import maplibregl from 'maplibre-gl';
import { onMount } from 'svelte';
import { computeBoundingBoxFromGeoJsonFeatures, colorShapes, mapKeyToColor } from './utils';
import { BLANK } from './mapStyles';

let container;
let map;
let mapReady = false;

export let data; // values, and the key to match
export let options; // contains the shapes to display & match

$: console.log('Options', options, 'Data', data);

let shapes, basemapStyle, colorScale;
$: ({ shapes, basemapStyle, colorScale } = options);

/*
$: console.log('options > shapes changed', shapes);
$: console.log('options > basemapStyle changed', basemapStyle);
$: console.log('options > colorScale changed', colorScale);
*/

function basemapConfigToStyle(basemapStyle) {
    return basemapStyle || BLANK;
}

// Initial mount
onMount(() => {
    map = new maplibregl.Map({
        container,
        style: basemapConfigToStyle(options.basemapStyle),
        center: [3.5, 46], // starting position [lng, lat]
        zoom: 5 // starting zoom
    });

    const nav = new maplibregl.NavigationControl();
    map.addControl(nav, 'top-left');

    map.on('load', () => {
        mapReady = true;
        // First load
        updateShapeRendering(data.value, shapes, colorScale);
    })
});


// Updates when the options change
$: updateBasemapStyle(basemapStyle);

$: updateShapeRendering(data.value, shapes, colorScale);

// Rendering functions
function updateBasemapStyle(basemapStyle) {
    if (mapReady) {
        const newStyle = basemapConfigToStyle(basemapStyle);
        map.setStyle(newStyle);
        // Changing the style resets the map
        map.once('styledata', () => updateShapeRendering(data.value, shapes, colorScale));
    }
}

function updateShapeRendering(values, shapes, colorScale) {
    if (mapReady && values && shapes && (shapes.type === 'geojson' && shapes.geoJson || shapes.type === 'vtiles' && shapes.url)) {
        console.log('refresh data');

        // Display shapes
        if (map.getLayer('shapes')) {
            map.removeLayer('shapes');
        }

        if (map.getSource('shapes')) {
            map.removeSource('shapes');
        }

        if (shapes.type === 'geojson') {
            const coloredShapes = colorShapes(shapes.geoJson, values, colorScale);

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
        } else if (shapes.type === 'vtiles') {
            map.addSource('shapes', {
                type: 'vector',
                tiles: [
                    shapes.url
                ]
            });

            const keyToColor = mapKeyToColor(values, colorScale);

            const matchExpression = [
                'match',
                ['get', 'key'],
            ];

            Object.entries(keyToColor).forEach(e => matchExpression.push(...e));
            matchExpression.push('#cccccc'); // Default fallback color

            console.log('match', matchExpression);

            map.addLayer({
                'id': 'shapes',
                'type': 'fill',
                'source': 'shapes',
                'source-layer': 'poc-communes-fr-for-vtiles-70dezo',
                'layout': {},
                'paint': {
                    'fill-color': matchExpression,
                    'fill-opacity': 0.8,
                    'fill-outline-color': '#fff',
                }
            });
        }

        // TODO: This should happen whenever the drawn shapes are different, not when we just change the colors or values
        // TODO: How to compute the extent for vtiles? We should compute it based on which shapes we colored, maybe using queryFeatures?
        const sourceLoadingCallback = (e) => {
            if (e.isSourceLoaded) {
                // This gets all the drawn features; maybe in some cases we'd need a filter? (e.g. we show all cities
                // but only color some of them, and want to fit on them)
                const renderedFeatures = map.queryRenderedFeatures();

                // Use the same code path for geojson and vtiles; maybe it's worth using directly the geojson source when available (to be
                // benchmarked)
                const extent = computeBoundingBoxFromGeoJsonFeatures({
                    "type": "FeatureCollection",
                    "features": renderedFeatures
                });
                map.fitBounds(extent, {
                    animate: false,
                });
                // Restrict interactions to these bounds
                map.setMaxBounds(map.getBounds());
                        
                // TODO: Restrict zoom max:
                // - either by computing the zoom that fits the smallest shape
                // - any other idea?

                map.off('sourcedata', 'shapes', sourceLoadingCallback);
            }
        }
        map.on('sourcedata', 'shapes', sourceLoadingCallback);
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
