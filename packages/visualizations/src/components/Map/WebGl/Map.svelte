<script lang="ts">
    import maplibre from 'maplibre-gl';
    import { onMount, createEventDispatcher } from 'svelte';
    import type { Map } from 'maplibre-gl';
    import { baseOptions, initializeResizer, buildPublicInterface } from './map';
    import { BLANK } from '../mapStyles';

    let container: HTMLElement;
    let map: Map;

    const onResize = () => {
        const bounds = map.getBounds();
        map.setMaxBounds(null);
        map.fitBounds(bounds);
    };

    const dispatch = createEventDispatcher();

    onMount(() => {
        map = new maplibre.Map({
            container,
            style: BLANK,
            ...baseOptions,
        });

        map.on('load', () => {
            initializeResizer({ container, onResize });
            const publicInterface = buildPublicInterface(map);
            dispatch('load', {
                publicInterface,
            });
        });

        return () => {
            if (map) {
                map.remove();
            }
        };
    });
</script>

<div id="map" bind:this={container} />

<style>
    #map {
        height: 400px;
    }

    @supports (aspect-ratio: auto) {
        #map {
            height: auto;
            aspect-ratio: var(--aspect-ratio);
        }
    }
</style>
