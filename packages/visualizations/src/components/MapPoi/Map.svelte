<script lang="ts">
    import createDeepEqual from '../../stores/createDeepEqual';

    import MapRender from './MapRender.svelte';

    import type { Async } from '../../types';

    import {
        getMapStyle,
        getMapSources,
        getMapLayers,
        getPopupConfigurationByLayers,
        getMapOptions,
    } from './utils';
    import type { MapPoiProps, PoiMapData, PoiMapOptions } from './types';

    // ensure exported type matches declared props
    type $$Props = MapPoiProps;

    export let data: Async<PoiMapData>;
    export let options: PoiMapOptions;

    $: ({ style: styleOptions } = options);
    $: style = getMapStyle(styleOptions);
    $: sources = getMapSources(data.value?.sources);
    $: layers = getMapLayers(data.value?.layers);
    $: popupConfigurationByLayers = getPopupConfigurationByLayers(data.value?.layers);

    $: ({
        bbox: _bbox,
        center: _center,
        zoom,
        minZoom,
        maxZoom,
        title,
        subtitle,
        description,
        legend,
        sourceLink,
        aspectRatio,
        interactive,
        images,
        transformRequest,
        cooperativeGestures,
    } = getMapOptions(options));

    const bbox = createDeepEqual(_bbox);
    const center = createDeepEqual(_center);
    $: bbox.update(_bbox);
    $: center.update(_center);
</script>

<div>
    {#key style}
        <MapRender
            {style}
            {sources}
            {layers}
            {popupConfigurationByLayers}
            bbox={$bbox}
            center={$center}
            {zoom}
            {minZoom}
            {maxZoom}
            {title}
            {subtitle}
            {description}
            {legend}
            {sourceLink}
            {aspectRatio}
            {interactive}
            {images}
            {transformRequest}
            {cooperativeGestures}
        />
    {/key}
</div>
