<script lang="ts">
    import { WebGlMap } from 'components/Map';
    import type { GeoFormatProps } from './types';
    import Tooltip from './Tooltip.svelte';

    type $$Props = GeoFormatProps;

    export let value: $$Props['value'];
    export let valueToLabel: $$Props['valueToLabel'] | null = null;
    export let mapOptions: $$Props['mapOptions'] = {};

    let showMap = false;
</script>

<Tooltip
    enabled
    onShow={() => {
        showMap = true;
    }}
    onHide={() => {
        showMap = false;
    }}
>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    {#if valueToLabel && valueToLabel(value)}
        <div class="label">{valueToLabel(value)}</div>
    {/if}
    <!-- To run a WebGl instance only when tooltip is visible -->
    <div slot="tooltipContent" class="table-cell-map-container">
        {#if showMap && value && mapOptions}
            <WebGlMap options={mapOptions} data={value} />
        {/if}
    </div>
</Tooltip>

<style lang="scss">
    .label {
        cursor: pointer;
        text-decoration: underline;
    }
    :global(.table-cell-map-container) {
        width: 360px;
        height: 240px;
        :global(.ods-visualization__map-container) {
            border-radius: 3px;
        }
    }
</style>
