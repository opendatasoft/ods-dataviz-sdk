<svelte:options immutable={true} />

<script lang="ts">
    import maplibregl, {
        Map as MapType,
        SourceSpecification,
        StyleSpecification,
        NavigationControl,
        MapSourceDataEvent,
        LngLatLike,
        LngLatBoundsLike,
    } from 'maplibre-gl';
    import type { BBox } from 'geojson';

    import { onMount } from 'svelte';
    import type { PoiMapLayer } from './types';
    import { BLANK } from '../Map/mapStyles';

    // maplibre style (basemap)
    export let style: StyleSpecification | string = BLANK;
    // maplibre source config
    export let source: SourceSpecification;
    // maplibre layer config
    export let layers: PoiMapLayer[];
    // array of created layer ids
    let storedLayerIds: string[] = [];
    // bounding box to start from, and restrict to it
    export let bbox: BBox | undefined;
    $: currentBbox = bbox;
    // aspect ratio based on width, by default equal to 1
    export let aspectRatio = 1;
    $: cssVarStyles = `--aspect-ratio:${aspectRatio};`;
    // option to disable map interactions
    export let interactive: boolean;

    let container: HTMLElement;
    let map: MapType;
    // Used to add navigation control to map
    let nav: NavigationControl;

    let mapReady = false;

    // Used in front of console and error messages to debug multiple maps on a same page
    const mapId = Math.floor(Math.random() * 1000);
    const sourceId = `shape-source-${mapId}`;
    const layerId = `shape-layer-${mapId}`;

    function initializeMap() {
        const defaultCenter: LngLatLike = [3.5, 46];
        const start = {
            center: defaultCenter,
            zoom: 5,
        };

        map = new maplibregl.Map({
            container,
            style,
            ...start,
        });

        nav = new maplibregl.NavigationControl({ showCompass: false });

        map.addControl(nav, 'top-right');

        map.on('load', () => {
            mapReady = true;
        });

        return () => map.remove();
    }

    function sourceLoadingCallback(e: MapSourceDataEvent) {
        // sourceDataType can be "visibility" or "metadata", in which case it's not about the data itself
        if (e.isSourceLoaded && e.sourceId === sourceId && !e.sourceDataType) {
            map.querySourceFeatures(
                sourceId,
                // The type forces you to pass a filter parameter in the option, but it's not required by the real code
                // https://github.com/maplibre/maplibre-gl-js/issues/1393
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                {
                    sourceLayer: layerId, // FIXME: This may not the best way to do it
                }
            );
            map.off('sourcedata', sourceLoadingCallback);
        }
    }

    const setBbox = (box: BBox | undefined) => {
        if (!box) {
            // zoom-out to bounds defined in the initialization
            map.setZoom(map.getMinZoom());
            return;
        }
        // Cancel any saved max bounds to properly fitBounds
        map.setMaxBounds(null);
        // Using padding, keep enough room for controls (zoom) to make sure they don't hide anything
        map.fitBounds(box as LngLatBoundsLike, {
            animate: false,
            padding: 40,
        });
    };

    function handleInteractivity(isInteractive: boolean) {
        if (isInteractive) {
            // Enable all user interaction handlers
            // Another way to disable all user handlers is to pass the option interactive = false on map creation
            // But it doesn't allow to change it afterwards
            // Id est it forces you to recreate another map if you want to change that option
            map.boxZoom.enable();
            map.doubleClickZoom.enable();
            map.dragPan.enable();
            map.dragRotate.enable();
            map.keyboard.enable();
            map.scrollZoom.enable();
            map.touchZoomRotate.enable();

            // Add navigation control to map
            if (!map.hasControl(nav)) {
                map.addControl(nav, 'top-right');
            }
        } else {
            // Disable all user interaction handlers
            map.boxZoom.disable();
            map.doubleClickZoom.disable();
            map.dragPan.disable();
            map.dragRotate.disable();
            map.keyboard.disable();
            map.scrollZoom.disable();
            map.touchZoomRotate.disable();

            // Remove navigation control from map
            if (map.hasControl(nav)) {
                map.removeControl(nav);
            }
            // Reset map Bbox to reset zoom
            if (mapReady && bbox) {
                setBbox(currentBbox);
            }
        }
    }

    function updateSourceAndLayer(newSource: SourceSpecification, newLayer: PoiMapLayer[]) {
        if (newSource && newLayer) {
            // Remove all custom layers but keep maplibre other style layers
            // Must be done before removing Source used by layers
            if (storedLayerIds.length > 0) {
                storedLayerIds.forEach((customLayerId) => map.removeLayer(customLayerId));
                storedLayerIds = [];
            }

            if (map.getSource(sourceId)) {
                map.removeSource(sourceId);
            }
            map.addSource(sourceId, newSource);
            newLayer.forEach((layer, i) => {
                const uniqueLayerId = `${layerId}-${i}`;
                map.addLayer({
                    ...layer,
                    id: uniqueLayerId,
                    source: sourceId,
                });
                storedLayerIds.push(uniqueLayerId);
                map.on('sourcedata', sourceLoadingCallback);
            });
        }
    }

    // Lifecycle
    onMount(initializeMap);

    $: if (mapReady) {
        updateSourceAndLayer(source, layers);
    }
    $: if (mapReady) {
        handleInteractivity(interactive);
    }
    $: if (mapReady && currentBbox) {
        setBbox(currentBbox);
    }
</script>

<figure class="map-card maps-container" style={cssVarStyles}>
    <div class="main">
        <div id="map" bind:this={container} />
    </div>
</figure>

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
    .map-card {
        display: flex;
        flex-direction: column;
        margin: 0;
        position: relative;
    }
    /* To add classes programmatically in svelte we will use a global selector. We place it inside a local selector to obtain some encapsulation and avoid side effects */
    .map-card :global(.tooltip-on-hover > .maplibregl-popup-content) {
        border-radius: 6px;
        box-shadow: 0px 6px 13px rgba(0, 0, 0, 0.26);
        padding: 13px;
    }
    .map-card :global(.tooltip-on-hover .maplibregl-popup-tip) {
        border-top-color: transparent;
        border-bottom-color: transparent;
        border-left-color: transparent;
        border-right-color: transparent;
    }

    .main {
        aspect-ratio: var(--aspect-ratio);
        flex-grow: 1;
        position: relative;
        display: block;
    }
</style>
