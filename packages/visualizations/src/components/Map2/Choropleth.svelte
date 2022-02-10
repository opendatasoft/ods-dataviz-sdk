<svelte:options immutable={true} />

<script>
import MapRender from './MapRender.svelte';
import { basemapConfigToStyle, colorShapes, mapKeyToColor } from './utils';

export let data; // values, and the key to match
export let options; // contains the shapes to display & match

$: console.log('Choropleth >', {
    data, options,
})
/*
TODO:
- From data and options, compute:
    - The style attribute
    - Source & Layer attributes
        - Calculated from data, options.shapes, and options.shapeColor
    - bbox for each sub-map
        - either passed as a parameter (multiple maps)
        - or computed from the data itself (typically in the same pass at the source and layer)
- Create MapRender instances from this:
    - Typically only one map
    - If multiple maps, they all share style, source, layer, but the bbox changes
    - TBD: It's probably worth it to further restrict source and/or layer based on the bbox, if efficient,
      because nothing is shared between maplibre instances
*/

let shapes, basemapStyle, colorScale;
$: ({ shapes, basemapStyle, colorScale, boundingBoxes } = options);

let style;
let layer;
let source;

function computeStyle(basemap) {
    style = basemapConfigToStyle(basemap);
}

function computeSourceLayerAndBboxes(values, shapes, colorScale) {
    // if (mapReady && values && shapes && (shapes.type === 'geojson' && shapes.geoJson || shapes.type === 'vtiles' && shapes.url)) {
    if (
        shapes.type === 'geojson' && !shapes.geoJson
        || shapes.type === 'vtiles' && !shapes.url
        || !values
    ) {
        // Something's missing for now
        return;
    }

    if (shapes.type === 'geojson') {
        const coloredShapes = colorShapes(shapes.geoJson, values, colorScale);

        source = {
            type: 'geojson',
            data: coloredShapes,
        };

        layer = {
            'type': 'fill',
            'layout': {},
            'paint': {
                'fill-color': ['get', 'color'],
                'fill-opacity': 0.8,
                'fill-outline-color': '#fff',
            }
        };
    } else if (shapes.type === 'vtiles') {
        source = {
            type: 'vector',
            tiles: [
                shapes.url
            ]
        };

        const keyToColor = mapKeyToColor(values, colorScale);

        const matchExpression = [
            'match',
            ['get', 'key'],
        ];

        Object.entries(keyToColor).forEach(e => matchExpression.push(...e));
        matchExpression.push('#cccccc'); // Default fallback color

        layer = {
            'type': 'fill',
            'source-layer': 'poc-communes-fr-for-vtiles-70dezo',
            'layout': {},
            'paint': {
                'fill-color': matchExpression,
                'fill-opacity': 0.8,
                'fill-outline-color': '#fff',
            }
        };
    }
}

$: computeStyle(basemapStyle);
$: computeSourceLayerAndBboxes(data.value, shapes, colorScale);

</script>

<div>
{#if !boundingBoxes || boundingBoxes.length <= 1}
<MapRender size="single" style={style} source={source} layer={layer} bbox={boundingBoxes ? boundingBoxes[0] : null} />
{:else}
<div style="position: relative">
    <MapRender size="main" style={style} source={source} layer={layer} bbox={boundingBoxes[0]} />
    <div style="display: flex">
        {#each boundingBoxes.slice(1) as bbox}
        <MapRender size="side" style={style} source={source} layer={layer} bbox={bbox} />
        {/each}
    </div>
</div>
{/if}
</div>

<style>

</style>