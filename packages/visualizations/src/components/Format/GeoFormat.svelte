<script lang="ts">
    import type { Content } from 'tippy.js';

    import { WebGlMap } from 'components/Map';
    import tippy from 'components/utils/tippy';
    import type { GeoFormatProps } from './types';

    type $$Props = GeoFormatProps;

    export let value: $$Props['value'];
    export let valueToLabel: $$Props['valueToLabel'] | null = null;
    export let mapOptions: $$Props['mapOptions'] = {};

    let tooltipContent: Content;
    let showMap = false;
</script>

<div
    role="button"
    tabindex="0"
    use:tippy={{
        content: tooltipContent,
        theme: 'ods-visualization-table',
        delay: [500, 0],
        duration: [275, 0],
        maxWidth: 'none',
        onShow: () => {
            showMap = true;
        },
        onHide: () => {
            showMap = false;
        },
    }}
>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="label">{valueToLabel && valueToLabel(value)}</div>
    <!-- To run a WebGl instance only when tooltip is visible -->
    {#if showMap && value && mapOptions}
        <div bind:this={tooltipContent} class="table-cell-map-container">
            <WebGlMap options={mapOptions} data={value} />
        </div>
    {/if}
</div>

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
