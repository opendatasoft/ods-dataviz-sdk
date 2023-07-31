<script lang="ts">
    import { onMount } from 'svelte';
    import type { StyleSpecification } from 'maplibre-gl';

    import MapRender from './MapRender.svelte';

    import { getJsonStyle, getMapLayers, getMapOptions, getMapStyle } from './utils';
    import type { PoiMapData, PoiMapOptions } from './types';
    import type { Async } from '../../types';

    export let data: Async<PoiMapData>;
    export let options: PoiMapOptions;

    let jsonStyle: StyleSpecification | undefined;
    let sources: StyleSpecification['sources'] | undefined;
    let layers: StyleSpecification['layers'] | undefined;

    onMount(async () => {
        jsonStyle = await getJsonStyle(data?.value?.style);
    });

    $: sources = data?.value?.sources;
    $: layers = getMapLayers(options.layers);
    $: style = getMapStyle(jsonStyle, { sources, layers });

    // Enrich options with default values
    $: computedOptions = getMapOptions(options);
</script>

<div>
    {#if style}
        <MapRender {style} {...computedOptions} />
    {/if}
</div>

<style>
</style>
