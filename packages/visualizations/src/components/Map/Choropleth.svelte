<svelte:options immutable={true} />

<script>
    import turfBbox from '@turf/bbox';
    import MapRender from './MapRender.svelte';
    import { BLANK } from './mapStyles';
    import { colorShapes, LIGHT_GREY, DARK_GREY } from './utils';

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

    const defaultEmptyValueColor = '#cccccc';

    let aspectRatio;
    let renderTooltip;
    let bbox;
    let activeShapes;

    // Used to apply a chosen color for shapes without values (default: #cccccc)
    let emptyValueColor;

    const defaultInteractive = true;
    $: ({
        shapes,
        colorsScale = defaultColorsScale,
        legend,
        aspectRatio,
        activeShapes,
        interactive = defaultInteractive,
        emptyValueColor = defaultEmptyValueColor,
    } = options);

    // Choropleth is always display over a blank map, for readability purposes
    const style = BLANK;
    let layer;
    let source;
    let dataBounds;
    /*
    type: 'geojson',
    geoJson: {}
}
later
shapes: {
    type: 'vtiles',
    url: ''
}
*/
    function computeSourceLayerAndBboxes(values = [], newShapes, newColorScale) {
        if (newShapes.type === 'geojson' && !newShapes.geoJson) {
            // We don't have everything we need yet
            return;
        }

        if (newShapes.type === 'geojson') {
            const computeColors = colorShapes(
                newShapes.geoJson,
                values,
                newColorScale,
                emptyValueColor
            );
            const coloredShapes = computeColors.geoJson;
            dataBounds = computeColors.bounds;

            renderTooltip = (hoveredFeatureName) => {
                let hoveredFeatureValue = '';
                const matchedFeature = values.find((item) => String(item.x) === hoveredFeatureName);
                if (matchedFeature) {
                    hoveredFeatureValue = matchedFeature.y;
                }
                const format = options?.tooltip?.label;
                if (format) return format(hoveredFeatureName);
                return `${hoveredFeatureName} &mdash; ${hoveredFeatureValue}`;
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

            bbox = turfBbox(newShapes.geoJson);
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
        {renderTooltip}
        {bbox}
        {activeShapes}
        {interactive}
    />
</div>

<style>
</style>
