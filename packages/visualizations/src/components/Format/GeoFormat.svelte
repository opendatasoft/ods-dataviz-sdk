<script lang="ts">
    import { run } from 'svelte/legacy';

    import type { Content } from 'tippy.js';

    import { WebGlMap } from 'components/Map';
    import type { WebGlMapData } from 'components/Map';
    import tippy from 'components/utils/tippy';
    import type { GeoFormatProps } from './types';

    type $$Props = GeoFormatProps;

    interface Props {
        rawValue: $$Props['rawValue'];
        display?: $$Props['display'];
        mapOptions?: $$Props['mapOptions'];
        sources?: $$Props['sources'];
        layers?: $$Props['layers'];
    }

    let {
        rawValue,
        display = (v: unknown) => v,
        mapOptions = {},
        sources = () => ({}),
        layers = () => []
    }: Props = $props();

    let tooltipContent: Content = $state();
    let showMap = $state(false);
    let data: WebGlMapData = $state();

    run(() => {
        if (sources && layers) {
            data = {
                sources: sources(rawValue),
                layers: layers(rawValue),
            };
        }
    });
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
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div class="label">{display && display(rawValue)}</div>
    <!-- To run a WebGl instance only when tooltip is visible -->
    {#if showMap && data && mapOptions}
        <div bind:this={tooltipContent} class="table-cell-map-container">
            <WebGlMap options={mapOptions} {data} />
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
