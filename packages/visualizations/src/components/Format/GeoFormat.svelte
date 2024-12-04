<script lang="ts">
    import { WebGlMap } from 'components/Map';
    import type { WebGlMapData } from 'components/Map';
    import type { GeoFormatProps } from './types';
    import Tooltip from './Tooltip.svelte';

    type $$Props = GeoFormatProps;

    export let rawValue: $$Props['rawValue'];
    export let display: $$Props['display'] = (v: unknown) => v as string;
    export let accessor: $$Props['accessor'] = (v: unknown) => v as WebGlMapData;
    export let mapOptions: $$Props['mapOptions'] = {};
    export let sources: $$Props['sources'] = () => ({});
    export let layers: $$Props['layers'] = () => [];

    let data: WebGlMapData;
    let showTooltip = false;

    $: if (sources && layers) {
        const value = accessor ? accessor(rawValue) : rawValue;
        data = {
            sources: sources(value),
            layers: layers(value),
        };
    }
</script>

<Tooltip
    enabled
    onShow={() => {
        showTooltip = true;
    }}
    onHide={() => {
        showTooltip = false;
    }}
>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="label">{display && display(rawValue)}</div>
    <!-- To run a WebGl instance only when tooltip is visible -->
    <div slot="tooltipContent" class="map-tooltip-container">
        {#if showTooltip && data && mapOptions}
            <WebGlMap options={mapOptions} {data} />
        {/if}
    </div>
</Tooltip>

<style lang="scss">
    .label {
        cursor: pointer;
        text-decoration: underline;
    }
    :global(.map-tooltip-container) {
        width: 360px;
        height: 240px;
        :global(.ods-visualization__map-container) {
            border-radius: 3px;
        }
    }
</style>
