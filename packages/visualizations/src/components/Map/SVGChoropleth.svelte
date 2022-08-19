<script>
    import geojsonToSvg from 'geojson-to-svg';
    import gj2Svg from 'geojson2svg';
    import bbox from '@turf/bbox';

    export let data;
    export let options;

    let shapes = {};

    const findBbox = (bbox, coords) => {
        const box = [
            Math.min(bbox[0], coords[0]),
            Math.min(bbox[1], coords[1]),
            Math.max(bbox[2], coords[0]),
            Math.max(bbox[3], coords[1]),
        ];
        return box;
    };

    // const getShapesExtent = (gj) => {
    //     return gj.features.reduce(
    //         (extent, feature) => {
    //             return feature.geometry.coordinates.flat().reduce(findBbox, extent);
    //         },
    //         [180, 90, -180, -90]
    //     );
    // };

    let downloading = true;
    let extent = [180, 90, -180, -90];
    const getWorldShapes = async () => {
        const res = await fetch(
            'https://data.opendatasoft.com/api/v2/catalog/datasets/georef-france-commune-arrondissement-municipal@public/exports/geojson?where=reg_name=%22Martinique%22'
        );
        const gj = await res.json();
        extent = bbox(gj);
        const converter = gj2Svg({
            mapExtent: {
                left: extent[0],
                bottom: extent[1],
                right: extent[2],
                top: extent[3],
            },
            // mapExtent: {
            //     left: -180,
            //     bottom: -90,
            //     right: 180,
            //     top: 90,
            // },
        });
        const svgStr = converter.convert(gj);
        return svgStr;
    };

    let world = getWorldShapes();

    $: ({ shapes } = options);
    $: extent = shapes?.geoJson.features.reduce(
        (extent, feature) => {
            return feature.geometry.coordinates.flat().reduce(findBbox, extent);
        },
        [180, 90, -180, -90]
    );
    $: gjTosvg = geojsonToSvg()
        // .projection(([x, y]) => [x, -y])
        .data(shapes?.geoJson)
        .extent(extent)
        .render();
    $: converter = gj2Svg({
        attributes: ['properties.key'],
        mapExtent: {
            left: extent[0],
            bottom: extent[1],
            right: extent[2],
            top: extent[3],
        },
    });
    $: gjSvg = converter.convert(shapes?.geoJson);
</script>

<!-- <h1>geojson-to-svg</h1>
{@html gjTosvg}

<h1>geojson2svg</h1>
<svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.2"
    style="stroke: black; stroke-width: 1px; fill: none"
>
    {#each gjSvg as str}
        {@html str}
    {/each}
</svg> -->

<h1>world geojson2svg</h1>

{#await world}
    {#if downloading}
        <p>downloading</p>
    {:else}
        <p>rendering</p>
    {/if}
{:then gjSvg}
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.2"
        style="stroke: black; stroke-width: 0.1px; fill: none;"
        height="600px"
        width="800px"
        viewBox={`0 0 ${extent[2]} ${extent[3]}`}
    >
        {#each gjSvg as str}
            {@html str}
        {/each}
    </svg>
{/await}

<style>
</style>
