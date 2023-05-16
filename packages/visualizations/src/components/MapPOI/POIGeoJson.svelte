<script lang="ts">
    import turfBbox from '@turf/bbox';
    import { debounce } from 'lodash';
    import type { SourceSpecification, StyleSpecification } from 'maplibre-gl';
    import type { BBox, FeatureCollection } from 'geojson';
    import MapRender from './MapRender.svelte';
    import { BLANK } from './mapStyles';
    import { VOID_BOUNDS, computeTooltip, computeBaseRoundMarkerLayer } from './utils';
    import { DEFAULT_LAYERS_PARAMS } from './constants';
    import type {
        POIMapOptions,
        POIMapDataValue,
        POIMapLayer,
        MapRenderTooltipFunctionPOI,
        LayerParams,
    } from './types';

    export let data: { value: POIMapDataValue[] }; // values, and the key to match
    export let options: POIMapOptions; // contains the shapes to display & match

    let shapes: FeatureCollection;

    let renderTooltip: MapRenderTooltipFunctionPOI;
    // Used to determine the shapes key
    const matchKey = 'key';

    let bbox: BBox | undefined;

    let layerParams: LayerParams | undefined;
    let aspectRatio: number | undefined;
    let interactive: boolean;

    // Here style will set the basemap
    let style: StyleSpecification | string;
    let layers: POIMapLayer[];
    let source: SourceSpecification;

    const defaultInteractive = true;

    $: ({
        shapes, style = BLANK, bbox, layerParams, aspectRatio, interactive=defaultInteractive,
    } = options);
    let renderedBbox = bbox || VOID_BOUNDS;

    function computeSourceLayerAndBboxes(newShapes: FeatureCollection) {
        source = {
            type: 'geojson',
            data: newShapes,
        };
        // layers will be stored in an array as it will be needed to add more than one layer to display different geometries
        layers = layerParams
                ? [computeBaseRoundMarkerLayer(layerParams.colors, layerParams.matchValues, layerParams.matchKey)]
                : [DEFAULT_LAYERS_PARAMS];
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
    <MapRender {style} {source} {layers} bbox={renderedBbox} {renderTooltip} {aspectRatio} {interactive}/>
</div>

<style>
</style>
