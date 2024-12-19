<script lang="ts">
    import { geoMercator } from 'd3-geo';
    import { mapKeyToColor, getDataBounds, colorShapes } from '../utils';
    import { DEFAULT_COLORSCALE, DEFAULT_COLORS, EMPTY_FC } from '../constants';
    import Map from './Map.svelte';

    import type { ChoroplethGeoJsonProps } from '../types';

    // ensure exported type matches declared props
    type $$Props = ChoroplethGeoJsonProps;

    interface Props {
        data: $$Props['data'];
        options: $$Props['options'];
    }

    let { data, options }: Props = $props();

    let {
        shapes,
        colorScale = DEFAULT_COLORSCALE,
        emptyValueColor = DEFAULT_COLORS.Default,
    } = $derived(options);
    let colorMapping = $derived(mapKeyToColor(
        data.value,
        getDataBounds(data.value),
        colorScale,
        emptyValueColor
    ));
    let coloredShapes = $derived(shapes
        ? colorShapes({
              featureCollection: shapes,
              colorMapping,
              emptyValueColor,
          })
        : EMPTY_FC);
</script>

<Map
    projection={geoMercator()}
    featureCollection={coloredShapes}
    svgProps={{ fill: 'color' }}
    style="stroke: black; stroke-width: 0.1px; fill: none;"
/>

<style>
</style>
