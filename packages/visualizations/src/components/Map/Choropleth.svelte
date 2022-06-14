<svelte:options immutable={true} />

<script>
    import turfBbox from '@turf/bbox';
    import MapRender from './MapRender.svelte';
    import { BLANK } from './mapStyles';
    import { colorShapes, createRenderTooltip, LIGHT_GREY, DARK_GREY } from './utils';

    export let data; // values, and the key to match
    export let options; // contains the shapes to display & match

    let shapes;
    let colorsScale;

    const defaultColorsScale = {
        type: 'gradient',
        colors: {
            start: LIGHT_GREY,
            end: DARK_GREY,
        },
    };

    let aspectRatio;
    let bbox;
    let activeShapes;
    $: ({ shapes, colorsScale = defaultColorsScale, legend, aspectRatio, activeShapes } = options);

    // Choropleth is always display over a blank map, for readability purposes
    const style = BLANK;
    let layer;
    let source;
    let dataBounds;
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
        if (newShapes.type === 'geojson' && !newShapes.geoJson) {
            return;
        }

        if (newShapes.type === 'geojson') {
            const colorValues = values || newShapes.geoJson.features.map(() => ({ y: 0 }));
            const computeColors = colorShapes(newShapes.geoJson, colorValues, newColorScale);
            const coloredShapes = computeColors.geoJson;
            dataBounds = computeColors.bounds;

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

            bbox = turfBbox(newShapes.geoJson);
        } else {
            console.error('Unknown shapes type', newShapes.type);
        }
    }

    $: computeSourceLayerAndBboxes(data.value, shapes, colorsScale);
    $: renderTooltip = createRenderTooltip(data?.value, options);
</script>

<MapRender
    {style}
    {source}
    {layer}
    {aspectRatio}
    {dataBounds}
    {colorsScale}
    {legend}
    {renderTooltip}
    {bbox}
    {activeShapes}
/>

<style>
</style>
