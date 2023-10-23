<script lang="ts">
    import createDeepEqual from '../../stores/createDeepEqual';

    import MapRender from './MapRender.svelte';

    import type { Async } from '../../types';

    import {
        getMapStyle,
        getMapSources,
        getMapLayers,
        getPopupsConfiguration,
        getMapOptions,
    } from './utils';
    import type { PoiMapData, PoiMapOptions } from './types';

    export let data: Async<PoiMapData>;
    export let options: PoiMapOptions;

    $: style = getMapStyle(options.style);
    $: sources = getMapSources(data.value?.sources);
    $: layers = getMapLayers(data.value?.layers);
    $: popupsConfiguration = getPopupsConfiguration(data.value?.layers);

    $: ({
        bbox: _bbox,
        center: _center,
        zoom,
        minzoom,
        maxzoom,
        title,
        subtitle,
        description,
        legend,
        sourceLink,
        aspectRatio,
        interactive,
        transformRequest,
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
            {popupsConfiguration}
            bbox={$bbox}
            center={$center}
            {zoom}
            {minzoom}
            {maxzoom}
            {title}
            {subtitle}
            {description}
            {legend}
            {sourceLink}
            {aspectRatio}
            {interactive}
            {transformRequest}
        />
    {/key}
</div>

<style>
</style>
