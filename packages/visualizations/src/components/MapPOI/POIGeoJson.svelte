<script lang="ts">
    import turfBbox from '@turf/bbox';
    import { debounce } from 'lodash';
    import type { SourceSpecification } from 'maplibre-gl';
    import type { BBox, FeatureCollection } from 'geojson';
    import MapRender from './MapRender.svelte';
    import { BLANK } from './mapStyles';
    import { VOID_BOUNDS, computeTooltip, computeLayers } from './utils';
    import type {
        POIMapOptionsB,
        POIMapDataValue,
        POIMapLayer,
        MapRenderTooltipFunctionPOI,
        LayersParams,
    } from './types';

    export let data: { value: POIMapDataValue[] }; // values, and the key to match
    export let options: POIMapOptionsB; // contains the shapes to display & match

    let shapes: FeatureCollection;

    let renderTooltip: MapRenderTooltipFunctionPOI;
    // Used to determine the shapes key
    const matchKey = 'key';

    let bbox: BBox | undefined;

    let layerParams: LayersParams[];

    $: ({ shapes, bbox, layerParams = [] } = options);
    // Here style will set the basemap
    const style = BLANK;
    let layers: POIMapLayer[];
    let source: SourceSpecification;
    let renderedBbox = bbox || VOID_BOUNDS;

    function computeSourceLayerAndBboxes(newShapes: FeatureCollection) {
        source = {
            type: 'geojson',
            data: newShapes,
        };
        layers = computeLayers(layerParams);
        renderedBbox = bbox || turfBbox(newShapes) || VOID_BOUNDS;
    }

    $: if (shapes) {
        computeSourceLayerAndBboxes(shapes);
    }
    $: renderTooltip = debounce(
        (hoveredFeature) => computeTooltip(hoveredFeature, data.value, options, matchKey),
        10,
        { leading: true }
    );
</script>

<div>
    <MapRender {style} {source} {layers} bbox={renderedBbox} {renderTooltip} />
</div>

<style>
</style>
