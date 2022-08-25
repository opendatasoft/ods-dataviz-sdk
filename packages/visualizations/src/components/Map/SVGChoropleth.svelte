<script>
    import gj2Svg from 'geojson2svg';
    import bbox from '@turf/bbox';
    import rewind from '@mapbox/geojson-rewind';
    import reproject from 'reproject-spherical-mercator';

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
    let canvasElements = {};
    let canvasdl = 0;
    let canvasrender = 0;

    const d3canvas = async (reg) => {
        const dl0 = performance.now();
        const gj = rewind(await getShapes(reg), true);
        const pop = await getData(reg);
        const dl1 = performance.now();
        canvasdl += dl1 - dl0;

        const render0 = performance.now();
        const ctx = canvasElements[reg].getContext('2d');
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
        const render1 = performance.now();
        canvasrender += render1 - render0;
    };

    let pathdl = 0;
    let pathrender = 0;
    const d3path = async (reg) => {
        // const gj = await getShapes(reg);
        const dl0 = performance.now();
        const gj = rewind(await getShapes(reg), true);
        const pop = await getData(reg);
        const dl1 = performance.now();
        pathdl += dl1 - dl0;

        const render0 = performance.now();
        const makePath = geoPath(projection.fitSize([100, 100], gj));
        const paths = gj.features.map((f) => ({
            path: makePath(f),
            opacity: pop[f.properties.com_code[0]],
        }));
        const render1 = performance.now();
        pathrender += render1 - render0;
        return paths;
    };

    let g2sdl = 0;
    let g2srender = 0;
    const g2svg = async (reg) => {
        const dl0 = performance.now();
        const gj = reproject(await getShapes(reg));
        const pop = await getData(reg);
        const dl1 = performance.now();
        g2sdl += dl1 - dl0;

        const render0 = performance.now();
        extent = bbox(gj);
        const converter = gj2Svg({
            mapExtent: {
                left: extent[0],
                bottom: extent[1],
                right: extent[2],
                top: extent[3],
            },
            viewportSize: { height: 100, width: 100 },
        });
        const shapes = gj.features.map((feature) => {
            return {
                opacity: pop[feature.properties.com_code[0]],
                svg: converter.convert(feature),
            };
        });
        const render1 = performance.now();
        g2srender += render1 - render0;
        return shapes;
    };

    const droms = ['Martinique', 'Guadeloupe', 'La Réunion', 'Guyane', 'Mayotte'];
    const renderDroms = (renderFn) => Promise.all(droms.map(renderFn));

    let g2s = renderDroms(g2svg);
    let d3s = renderDroms(d3path);
    renderDroms(d3canvas);
</script>

<h1>d3-geo canvas</h1>
<p>DL: {canvasdl}ms, render: {canvasrender}ms</p>

{#each droms as drom}
    <canvas
        height={DPR * 100}
        width={DPR * 100}
        style="width: 100px; height: 100px"
        bind:this={canvasElements[drom]}
    />
{/each}

<h1>d3-geo svg</h1>
<p>DL: {pathdl}ms, render: {pathrender}ms</p>
{#await d3s then droms}
    {#each droms as shapes}
        <svg
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

<h1>geojson2svg</h1>
<p>DL: {g2sdl}ms, render: {g2srender}ms</p>
{#await g2s then droms}
    {#each droms as shapes}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            style="stroke: black; stroke-width: 0.1px; fill: none;"
            viewBox={`0 0 ${extent[2]} ${extent[3]}`}
            preserveAspectRatio="xMidYMid meet"
            height="100"
            width="100"
        >
            {#each shapes as shape}
                <g fill="blue" style={`opacity: ${shape.opacity}`}>
                    {@html shape.svg}
                </g>
            {/each}
        </svg>
    {/each}
{/await}

<style>
    svg {
        margin: 3px;
    }
</style>
