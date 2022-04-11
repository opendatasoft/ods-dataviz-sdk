<svelte:options immutable={true} />

<script>
    import MapRender from './MapRender.svelte';
    import { BLANK } from './mapStyles';
    import { colorShapes } from './utils';

    export let data; // values, and the key to match
    export let options; // contains the shapes to display & match

    $: console.log('Choropleth >', {
        data,
        options,
    });

    let shapes;
    let colorScale;
    let colorMode;
    let aspectRatio;
    $: ({ shapes, colorScale, aspectRatio, colorMode } = options);

    // Choropleth is always display over a blank map, for readability purposes
    const style = BLANK;
    let layer;
    let source;
    let colorStepper;

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
    function computeSourceLayerAndBboxes(values, newShapes, newColorScale) {
        if ((newShapes.type === 'geojson' && !newShapes.geoJson) || !values) {
            // We don't have everything we need yet
            return;
        }

        if (newShapes.type === 'geojson') {
            const computeColors = colorShapes(newShapes.geoJson, values, newColorScale, colorMode);
            const coloredShapes = computeColors.geoJson;
            colorStepper = computeColors.steps;

            source = {
                type: 'geojson',
                data: coloredShapes,
            };

            layer = {
                type: 'fill',
                layout: {},
                paint: {
                    'fill-color': ['get', 'color'],
                    'fill-opacity': 0.8,
                    'fill-outline-color': '#fff',
                },
            };
        } else {
            console.error('Unknown shapes type', newShapes.type);
        }
    }

    $: computeSourceLayerAndBboxes(data.value, shapes, colorScale);
</script>

<div>
    <MapRender {style} {source} {layer} {aspectRatio} {colorScale} {colorStepper} {options} {colorMode} />
</div>

<style>
</style>
