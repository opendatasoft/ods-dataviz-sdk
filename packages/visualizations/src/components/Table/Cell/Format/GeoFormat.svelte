<script lang="ts">
    import { WebGlMap } from 'components/Map';
    import type { WebGlMapOptions, WebGlMapData } from 'components/Map';

    export let rawValue: unknown;
    export let display = (v: unknown) => v;
    export let mapOptions: WebGlMapOptions;
    export let sources: (v: unknown) => WebGlMapData['sources'] = () => ({});
    export let layers: (v: unknown) => WebGlMapData['layers'] = () => [];

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
        <div class="table-cell-map-container">
            <WebGlMap options={mapOptions} {data} />
        </div>
    {/if}
</div>

<style>
    .label {
        cursor: pointer;
        text-decoration: underline;
    }
    .table-cell-map-container {
        width: 100%;
        height: 250px;
    }
</style>
