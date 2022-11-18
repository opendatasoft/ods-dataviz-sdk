<script lang="ts">
    import type { FeatureCollection } from 'geojson';
    import type { ColorScale } from '../../types';

    export let data: { value: ChoroplethDataValue[] };
    export let shapes: FeatureCollection;
    export let colorScale: ColorScale;
</script>

<div on:click>
    <SvgChoropleth {data} options={{ shapes, colorScale }} />
</div>

<style>
    div {
        height: 60px;
        width: 60px;
        padding: 3px;
    }
</style>
