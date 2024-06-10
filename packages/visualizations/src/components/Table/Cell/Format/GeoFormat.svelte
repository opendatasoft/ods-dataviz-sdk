<script lang="ts">
    import Map from '../../../utils/Map';
    import type { MapOptions, MapData } from '../../../utils/Map/types';

    export let rawValue: unknown;
    export let display = (v: unknown) => v;
    export let mapOptions: MapOptions;
    export let sources: (v: unknown) => MapData['sources'] = () => ({});
    export let layers: (v: unknown) => MapData['layers'] = () => [];

    let showMap = false;

    $: data = {
        sources: sources(rawValue),
        layers: layers(rawValue),
    };

    function onLabelClick() {
        showMap = !showMap;
    }
</script>

<div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="label" on:click={onLabelClick}>{display(rawValue)}</div>
    {#if showMap}
        <Map options={mapOptions} {data} />
    {/if}
</div>

<style>
    .label {
        cursor: pointer;
        text-decoration: underline;
    }
</style>
