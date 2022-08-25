<script>
    import gj2Svg from 'geojson2svg';
    import bbox from '@turf/bbox';
    import rewind from '@mapbox/geojson-rewind';

    import { geoEqualEarth, geoPath } from 'd3-geo';

    const DPR = window.devicePixelRatio || 1;

    export let data;
    export let options;

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
        const res = await fetch(
            `https://data.opendatasoft.com/api/v2/catalog/datasets/georef-france-commune-arrondissement-municipal@public/exports/geojson?where=reg_name=%22${reg}%22`
        );
        const gj = await res.json();
        return gj;
    };

    const projection = geoEqualEarth();
    let canvasElement;

    const d3canvas = async (reg) => {
        const gj = rewind(await getShapes(reg), true);
        const pop = await getData(reg);

        const ctx = canvasElement.getContext('2d');
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 0.1;
        ctx.fillStyle = 'blue';
        const makePath = geoPath(projection.fitSize([DPR * 100, DPR * 100], gj), ctx);

        gj.features.forEach((f) => {
            ctx.globalAlpha = pop[f.properties.com_code[0]];
            ctx.beginPath();
            makePath(f);
            ctx.fill();
            ctx.stroke();
        });
    };

    const d3path = async (reg) => {
        // const gj = await getShapes(reg);
        const gj = rewind(await getShapes(reg), true);
        const pop = await getData(reg);

        const makePath = geoPath(projection.fitSize([100, 100], gj));
        const paths = gj.features.map((f) => ({
            path: makePath(f),
            opacity: pop[f.properties.com_code[0]],
        }));
        return paths;
    };

    const g2svg = async (reg) => {
        const gj = await getShapes(reg);
        const pop = await getData(reg);

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
        console.timeEnd('convert render');
        return shapes;
    };

    $: d3canvas('Martinique');
    // let d3s = Promise.all([d3path('Martinique'), d3path('Guadeloupe'), d3path('Guyane')]);
    // let g2s = Promise.all([g2svg('Martinique'), g2svg('Guadeloupe'), g2svg('Guyane')]);
</script>

<h1>d3-geo canvas</h1>
<canvas
    height={DPR * 100}
    width={DPR * 100}
    style="width: 100px; height: 100px"
    bind:this={canvasElement}
/>

<!-- <h1>d3-geo svg</h1>
{#await d3s then droms}
    {#each droms as shapes}
        <svg
            class="d3"
            xmlns="http://www.w3.org/2000/svg"
            height="100"
            width="100"
            viewBox={`0 0 100 100`}
            style="stroke: black; stroke-width: 0.1px; fill: none;"
        >
            {#each shapes as shape}
                <path d={shape.path} opacity={shape.opacity} fill="blue" />
            {/each}
        </svg>
    {/each}
{/await}

<h1>Pop DROM</h1>
<div>
    {#await g2s then droms}
        {#each droms as shapes}
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
        {/each}
    {/await}
</div> -->
<style>
    div {
        display: flex;
        justify-content: flex-start;
    }

    svg {
        margin: 3px;
    }
</style>
