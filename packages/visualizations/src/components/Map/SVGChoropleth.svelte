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

    let extent = [180, 90, -180, -90];

    const getData = async (reg) => {
        const res = await fetch(
            `https://data.opendatasoft.com/api/v2/catalog/datasets/geoflar-communes-2015@public/records?rows=100&where=%22${reg}%22`
        );
        const data = await res.json();
        const maxPop = Math.max(...data.records.map((record) => record.record.fields.population));

        const pop = Object.fromEntries(
            data.records.map((record) => [
                record.record.fields.insee_com,
                record.record.fields.population / maxPop,
            ])
        );
        return pop;
    };

    const getShapes = async (reg) => {
        const pop = await getData(reg);
        const res = await fetch(
            `https://data.opendatasoft.com/api/v2/catalog/datasets/georef-france-commune-arrondissement-municipal@public/exports/geojson?where=reg_name=%22${reg}%22`
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
            viewportSize: { height: 50, width: 50 },
        });
        const shapes = gj.features.map((feature) => {
            return {
                opacity: pop[feature.properties.com_code[0]],
                svg: converter.convert(feature),
            };
        });
        return shapes;
    };

    let martinique = getShapes('Martinique');
    let guadeloupe = getShapes('Guadeloupe');
    let reunion = getShapes('La Réunion');
    let guyanne = getShapes('Guyane');
    const droms = [martinique, guadeloupe, guyanne, reunion];
</script>

<h1>Pop DROM</h1>
<div>
    {#each droms as drom}
        {#await drom}
            <p>downloading</p>
        {:then shapes}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                style="stroke: black; stroke-width: 0.1px; fill: none;"
                viewBox={`0 0 ${extent[2]} ${extent[3]}`}
                preserveAspectRatio="xMidYMid meet"
                height="50"
                width="50"
            >
                {#each shapes as shape}
                    <g fill="blue" style={`opacity: ${shape.opacity}`}>
                        {@html shape.svg}
                    </g>
                {/each}
            </svg>
        {/await}
    {/each}
</div>

<style>
    div {
        display: flex;
        justify-content: flex-start;
    }

    svg {
        margin: 3px;
    }
</style>
