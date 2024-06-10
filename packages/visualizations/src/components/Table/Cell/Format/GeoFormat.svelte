<script lang="ts">
    import MapPOI from "src/components/MapPoi";

    // import { warn } from './utils';

    import Map from "../../../utils/Map";
    import type {MapOptions, MapData} from "../../../utils/Map/types";

    export let rawValue: unknown;
    export let style: StyleSpecification = {version: 8, sources: {}, layers: []}; 
    export let display = (v: unknown) => v;
    export let mapOptions: MapOptions;
    export let sources: (v: unknown) => MapData["sources"] = () => ({});
    export let layers: (v: unknown) => MapData["layers"] = () => [];

    let showMap = false;

    $: data = {
        sources: sources(rawValue),
        layers: layers(rawValue)
    }

</script>

<div>
    <div class="label" on:click={() => showMap = !showMap}>{display(rawValue)}</div>
    {#if showMap}
        <Map options={mapOptions} data={data}  />
    {/if}
</div>

<style>
    .label {
        cursor: pointer;
        text-decoration: underline;
    }
</style>
