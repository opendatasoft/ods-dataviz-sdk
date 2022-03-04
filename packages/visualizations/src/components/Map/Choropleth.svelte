<svelte:options immutable={true} />

<script>
import MapRender from './MapRender.svelte';
import { BLANK } from './mapStyles';
import { colorShapes, mapKeyToColor } from './utils';

export let data; // values, and the key to match
export let options; // contains the shapes to display & match

$: console.log('Choropleth >', {
    data, options,
})

let shapes, colorScale;
$: ({ shapes, colorScale, aspectRatio } = options);

// Choropleth is always display over a blank map, for readability purposes
const style = BLANK;
let layer;
let source;

/*
shapes: {
    type: 'geojson',
    geoJson: {}
}
later
shapes: {
    type: 'vtiles',
    url: ''
}
*/
function computeSourceLayerAndBboxes(values, shapes, colorScale) {
    if (
        shapes.type === 'geojson' && !shapes.geoJson || !values
    ) {
        // We don't have everything we need yet
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
    } else {
        console.error('Unknown shapes type', shapes.type);
    }
}

$: computeSourceLayerAndBboxes(data.value, shapes, colorScale);

</script>

<div>
<MapRender style={style} source={source} layer={layer} aspectRatio={aspectRatio}/>
</div>

<style>

</style>