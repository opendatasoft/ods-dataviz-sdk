<script lang="ts">
    import turfBbox from '@turf/bbox';
    import type { SourceSpecification, StyleSpecification } from 'maplibre-gl';
    import type { BBox, FeatureCollection } from 'geojson';
    import { debounce } from 'lodash';
    import MapRender from './MapRender.svelte';
    import { BLANK } from './mapStyles';
    import { VOID_BOUNDS, computeBaseRoundMarkerLayer, computeTooltip } from './utils';
    import { DEFAULT_LAYERS_PARAMS } from './constants';
    import type { PoiMapOptions, PoiMapLayer, LayerParams, TooltipOptions } from './types';

    export let data: { value: FeatureCollection }; // values and geo points to display
    export let options: PoiMapOptions;

    let bbox: BBox | undefined;

    let layerParams: LayerParams | undefined;
    let aspectRatio: number | undefined;
    let interactive: boolean;

    // Here style will set the basemap
    let style: StyleSpecification | string;
    let layers: PoiMapLayer[];
    let source: SourceSpecification;

    let tooltip: TooltipOptions;

    const defaultInteractive = true;

    $: ({
        style = BLANK,
        bbox,
        layerParams,
        aspectRatio,
        interactive = defaultInteractive,
        tooltip = {},
    } = options);

    $: ({ fixed = false } = tooltip);

    let renderedBbox = bbox || VOID_BOUNDS;

    function computeSourceLayers(newShapes: FeatureCollection) {
        source = {
            type: 'geojson',
            data: newShapes,
            // We need a feature id to handle hover state
            promoteId: 'featureId',
        };
        // layers will be stored in an array as it will be needed to add more than one layer to display different geometries
        return layerParams
            ? [
                  computeBaseRoundMarkerLayer(
                      layerParams.colors,
                      layerParams.matchValues,
                      layerParams.matchKey
                  ),
              ]
            : [DEFAULT_LAYERS_PARAMS];
    }

    $: if (data.value) {
        layers = computeSourceLayers(data.value);
        // We need to check that features are not empty before computing bbox through turf,
        // if they are empty (through filtering for example) we fallback
        // to bbox from options (or if bbox is undefined we keep VOID_BOUNDS from initialization)
        if (data.value.features.length > 0) {
            renderedBbox = bbox || turfBbox(data.value);
        }
    }

    $: renderTooltip = debounce((hoveredFeature) => computeTooltip(hoveredFeature, options), 10, {
        leading: true,
    });
</script>

<div>
    <MapRender
        {style}
        {source}
        {layers}
        bbox={renderedBbox}
        {aspectRatio}
        {interactive}
        {renderTooltip}
        {fixed}
        {data}
    />
</div>

<style>
</style>
