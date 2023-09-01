<script lang="ts">
    import MapRender from './MapRender.svelte';

    import type { Async } from '../../types';

    import { getMapStyle, getMapSources, getMapLayers, getMapOptions } from './utils';
    import type { PoiMapData, PoiMapOptions } from './types';

    export let data: Async<PoiMapData>;
    export let options: PoiMapOptions;

    $: style = getMapStyle(options.style);
    $: sources = getMapSources(data.value?.sources);
    $: layers = getMapLayers(data.value?.layers);

    $: computedOptions = getMapOptions(options);
</script>

<div>
    {#key style}
        <MapRender {style} {sources} {layers} {...computedOptions} />
    {/key}
</div>

<style>
</style>
