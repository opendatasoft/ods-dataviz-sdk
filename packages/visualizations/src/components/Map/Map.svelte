<svelte:options immutable={true} />

<script>
import maplibregl from 'maplibre-gl';
import { onMount } from 'svelte';
import { computeBoundingBoxFromGeoJsonFeatures, colorShapes } from './utils';
import { BLANK } from './mapStyles';

import { 
    dataStore, optionsStore, 
    shapeRenderingStore, basemapStyleStore, 
    colorScaleStore, shapesStore } from './store';

let container;
let map;
let mapReady = false;
let currentStyle;

export let data; // values, and the key to match
export let options; // contains the shapes to display & match

$: console.log('Options', options, 'Data', data);

$: optionsStore.set(options);
$: dataStore.set(data?.value);

$: console.log('>> datastore', $dataStore);
$: console.log('>> optionsStore', $optionsStore);

$: console.log('>> basemapStyleStore', $basemapStyleStore);

$: console.log('>> shapesStore', $shapesStore);
$: console.log('>> colorScaleStore', $colorScaleStore);
$: console.log('>> shapeRenderingStore', $shapeRenderingStore);


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
        // First load
        //updateShapeRendering($shapeRenderingStore);
        updateShapeRendering($dataStore, $shapesStore, $colorScaleStore);
    })
});

$: updateBasemapStyle($basemapStyleStore);

function updateBasemapStyle(basemapStyle) {
    if (mapReady) {
        const newStyle = basemapConfigToStyle(basemapStyle);
        map.setStyle(newStyle);
        // Changing the style resets the map
        //map.once('styledata', () => updateShapeRendering($shapeRenderingStore));
        map.once('styledata', () => updateShapeRendering($dataStore, $shapesStore, $colorScaleStore));
    }
}


// $: updateShapeRendering($shapeRenderingStore);
//function updateShapeRendering({values, shapes, colorScale}) {

$: updateShapeRendering($dataStore, $shapesStore, $colorScaleStore);

function updateShapeRendering(values, shapes, colorScale) {
    console.log('updateShapeRendering', values, shapes, colorScale)
    if (mapReady && values && shapes) {
        console.log('refresh data');

        // Compute the bounds
        const extent = computeBoundingBoxFromGeoJsonFeatures(shapes);
        const coloredShapes = colorShapes(shapes, values, colorScale);

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

/*
let currentData;
let currentShapes;
let currentColorScale;

$: {
    // Detect situations where a redraw is necessary
    // TODO: Why does Svelte's reactive stuff triggers even when the values don't seem to have changed? is it only on the base object and not
    // on leafs?
    //console.log('reactive refresh data'); 
    if (data?.value !== currentData || options.shapes !== currentShapes || options.colorScale !== currentColorScale) {
        refreshData(data?.value, options.shapes, options.colorScale);
        currentData = data?.value;
        currentShapes = options.shapes;
        currentColorScale = options.colorScale;
    }
}

function refreshData(newData, newShapes, colorScale) {
    if (mapReady && newData && newShapes) {
        console.log('refresh data');

        // Compute the bounds
        const extent = computeBoundingBoxFromGeoJsonFeatures(newShapes);
        const coloredShapes = colorShapes(newShapes, newData, colorScale);

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
*/
</script>

<div class="map">
    <div class="map-container" bind:this={container}></div>
</div>

<style>
.map-container {
    height: 400px;
}
</style>
