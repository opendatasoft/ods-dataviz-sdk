<script lang="ts">
    import turfBbox from '@turf/bbox';
    import type { SourceSpecification, StyleSpecification } from 'maplibre-gl';
    import type { BBox, FeatureCollection } from 'geojson';
    import MapRender from './MapRender.svelte';
    import { BLANK } from './mapStyles';
    import { VOID_BOUNDS, computeBaseRoundMarkerLayer } from './utils';
    import { DEFAULT_LAYERS_PARAMS } from './constants';
    import type { PoiMapOptions, PoiMapLayer, LayerParams } from './types';

    export let data: FeatureCollection; // values, and the key to match
    export let options: PoiMapOptions; // contains the shapes to display & match

    let bbox: BBox | undefined;

    let layerParams: LayerParams | undefined;
    let aspectRatio: number | undefined;
    let interactive: boolean;

    // Here style will set the basemap
    let style: StyleSpecification | string;
    let layers: PoiMapLayer[];
    let source: SourceSpecification;

    const defaultInteractive = true;

    $: ({
        style = BLANK,
        bbox,
        layerParams,
        aspectRatio,
        interactive = defaultInteractive,
    } = options);
    let renderedBbox = bbox || VOID_BOUNDS;

    function computeSourceLayerAndBboxes(newShapes: FeatureCollection) {
        source = {
            type: 'geojson',
            data: newShapes,
        };
        // layers will be stored in an array as it will be needed to add more than one layer to display different geometries
        layers = layerParams
            ? [
                  computeBaseRoundMarkerLayer(
                      layerParams.colors,
                      layerParams.matchValues,
                      layerParams.matchKey
                  ),
              ]
            : [DEFAULT_LAYERS_PARAMS];
        renderedBbox = bbox || turfBbox(newShapes) || VOID_BOUNDS;
    }

    $: if (data) {
        computeSourceLayerAndBboxes(data);
    }
</script>

<div>
    <MapRender {style} {source} {layers} bbox={renderedBbox} {aspectRatio} {interactive} />
</div>

<style>
</style>
