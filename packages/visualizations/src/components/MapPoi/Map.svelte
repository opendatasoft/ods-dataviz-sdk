<script lang="ts">
    import type { BBox } from 'geojson';

    import MapRender from './MapRender.svelte';

    import type { Async } from '../../types';

    import {
        getMapStyle,
        getMapSources,
        getMapLayers,
        getPopupsConfiguration,
        getMapOptions,
    } from './utils';
    import type { Center, PoiMapData, PoiMapOptions } from './types';

    export let data: Async<PoiMapData>;
    export let options: PoiMapOptions;

    let bbox: BBox;
    let previousBbox: BBox;

    let center: Center;
    let previousCenter: Center;

    $: style = getMapStyle(options.style);
    $: sources = getMapSources(data.value?.sources);
    $: layers = getMapLayers(data.value?.layers);
    $: popupsConfiguration = getPopupsConfiguration(data.value?.layers);

    $: ({
        bbox: currentBbox,
        zoom,
        center: currentCenter,
        title,
        subtitle,
        description,
        legend,
        sourceLink,
        aspectRatio,
        interactive,
    } = getMapOptions(options));

    /*
     * As options is an object, current bbox updates when options changes
     * We want to trigger an update to MapRender only if bbox value changes, not its reference.
     */
    $: {
        // Update bbox only if different from previous bbox
        if (
            currentBbox &&
            (!previousBbox || currentBbox.some((bound, index) => bound !== previousBbox[index]))
        ) {
            bbox = currentBbox;
            previousBbox = currentBbox;
        }
    }

    // Same thing as above for center
    $: {
        if (
            currentCenter &&
            (!previousCenter ||
                currentCenter.some((point, index) => point !== previousCenter[index]))
        ) {
            center = currentCenter;
            previousCenter = currentCenter;
        }
    }
</script>

<div>
    {#key style}
        <MapRender
            {style}
            {sources}
            {layers}
            {popupsConfiguration}
            {bbox}
            {center}
            {zoom}
            {title}
            {subtitle}
            {description}
            {legend}
            {sourceLink}
            {aspectRatio}
            {interactive}
        />
    {/key}
</div>

<style>
</style>
