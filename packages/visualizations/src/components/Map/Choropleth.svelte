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
    let colorsScale;

    let aspectRatio;
    $: ({ shapes, colorsScale, legend, aspectRatio, tooltip } = options);

    let renderTooltipDescription;

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
        if ((newShapes.type === 'geojson' && !newShapes.geoJson) || !values) {
            // We don't have everything we need yet
            return;
        }

        if (newShapes.type === 'geojson') {
            const computeColors = colorShapes(newShapes.geoJson, values, newColorScale);
            const coloredShapes = computeColors.geoJson;
            dataBounds = computeColors.bounds;

            renderTooltipDescription = (hoveredFeatureName) => {
                const hoveredFeatureValue = values.find(
                    (item) => item.x.toString() === hoveredFeatureName
                ).y;
                const format = options?.tooltip?.label;
                if (format) return format(hoveredFeatureName);
                return `${hoveredFeatureName} - ${hoveredFeatureValue}`;
            };

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

    $: computeSourceLayerAndBboxes(data.value, shapes, colorsScale);
</script>

<div>
    <MapRender
        {style}
        {source}
        {layer}
        {aspectRatio}
        {dataBounds}
        {colorsScale}
        {legend}
        {renderTooltipDescription}
    />
</div>

<style>
</style>
