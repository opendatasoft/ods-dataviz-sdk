<script lang="ts">
    import { geoPath, GeoProjection } from 'd3-geo';
    import { pick } from 'lodash';
    import type { Feature, FeatureCollection } from 'geojson';

    export let projection: GeoProjection;
    export let featureCollection: FeatureCollection;
    export let style: string;
    export let svgProps: { [key: string]: string };

    let width: number = 0;
    let height: number = 0;

    const extractProps = (f: Feature) => {
        const svgAttributes = Object.keys(svgProps);
        const getProperty = (attr: string) => [attr, f?.properties[svgProps[attr]]];
        return Object.fromEntries(svgAttributes.map(getProperty));
    };

    $: fittedProjection = projection.fitSize([height, width], featureCollection);
    $: makePath = geoPath(fittedProjection);
    $: paths =
        featureCollection.features.map((f: Feature) => ({
            d: makePath(f),
            ...extractProps(f),
        })) || [];
    $: console.log(paths);
</script>

<div bind:clientWidth={width} bind:clientHeight={height}>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        {height}
        {width}
        {style}
        viewBox={`0 0 ${height} ${width}`}
    >
        {#each paths as path}
            <path {...path} />
        {/each}
    </svg>
</div>

<!-- markup (zero or more items) goes here -->
<style>
    div {
        width: 100%;
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
    }
</style>
