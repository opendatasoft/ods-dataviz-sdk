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
        MapLayerMouseEvent,
    } from 'maplibre-gl';
    import type { BBox } from 'geojson';

    import { onMount } from 'svelte';
    import type { POIMapLayer, MapRenderTooltipFunctionPOI } from './types';
    import { BLANK } from '../Map/mapStyles';

    // maplibre style (basemap)
    export let style: StyleSpecification | string = BLANK;
    // maplibre source config
    export let source: SourceSpecification;
    // maplibre layer config
    export let layers: POIMapLayer[];
    // bounding box to start from, and restrict to it
    export let bbox: BBox | undefined;
    $: currentBbox = bbox;
    // Used to render tooltips on hover
    export let renderTooltip: MapRenderTooltipFunctionPOI;
    // aspect ratio based on width, by default equal to 1
    export let aspectRatio = 1;
    $: cssVarStyles = `--aspect-ratio:${aspectRatio};`;
    // option to disable map interactions
    export let interactive: boolean;

    const hoverPopup = new maplibregl.Popup({
        closeOnClick: false,
        closeButton: false,
        className: 'tooltip-on-hover',
    }).trackPointer();

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

    function getAllCustomLayersIds() {
        const mapLayers = map.getStyle().layers;
        if (mapLayers.length > 0) {
                return mapLayers
                    .filter((layer) => layer.id.includes(layerId))
                    .map((layer) => layer.id);
            }
        return [];
    };

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

    function addTooltip(e: MapLayerMouseEvent) {
        if (e.features) {
            const tooltipDescription = renderTooltip(e.features[0]);
            if (tooltipDescription) {
                if (hoverPopup.isOpen()) {
                    hoverPopup.setLngLat(e.lngLat).setHTML(tooltipDescription);
                } else {
                    hoverPopup.setLngLat(e.lngLat).setHTML(tooltipDescription).addTo(map);
                }
            }
        }
    }

    function removeTooltip() {
        hoverPopup.remove();
    }

    function handleInteractivity(
        isInteractive: boolean,
        computeTooltip?: MapRenderTooltipFunctionPOI
    ) {
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

            const customLayersIds = getAllCustomLayersIds();
            if (customLayersIds.length > 0) {
                customLayersIds.forEach((customLayerId) => {
                     // Handle tooltip display
                    map.off('mousemove', customLayerId, addTooltip);
                    map.off('mouseleave', customLayerId, removeTooltip);

                    if (computeTooltip) {
                        map.on('mousemove', customLayerId, addTooltip);
                        map.on('mouseleave', customLayerId, removeTooltip);
                    }
                });
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

            const customLayersIds = getAllCustomLayersIds();
            if (customLayersIds.length > 0) {
                customLayersIds.forEach((customLayerId) => {
                    // Remove tooltip
                    map.off('mousemove', customLayerId, addTooltip);
                    map.off('mouseleave', customLayerId, removeTooltip);
                });
            }

            // Remove navigation control from map
            if (map.hasControl(nav)) {
                map.removeControl(nav);
            }
            // Reset map Bbox to reset zoom
            if (mapReady && bbox) {
                setBbox(currentBbox);
            }
        }
    };

    function updateSourceAndLayer(newSource: SourceSpecification, newLayer: POIMapLayer[]) {
        if (newSource && newLayer) {
            // Remove all custom layers but keep maplibre other style layers
            // Must be done before removing Source used by layers

            const customLayersIds = getAllCustomLayersIds();
            if (customLayersIds.length > 0) {
                customLayersIds.forEach((customLayerId) => map.removeLayer(customLayerId));
            }

            if (map.getSource(sourceId)) {
                map.removeSource(sourceId);
            }
            map.addSource(sourceId, newSource);
            newLayer.forEach((layer, i) => {
                map.addLayer({
                    ...layer,
                    id: `${layerId}-${i}`,
                    source: sourceId,
                });
                // Handle tooltip display
                map.off('mousemove', `${layerId}-${i}`, addTooltip);
                map.off('mouseleave', `${layerId}-${i}`, removeTooltip);

                map.on('mousemove', `${layerId}-${i}`, addTooltip);
                map.on('mouseleave', `${layerId}-${i}`, removeTooltip);
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
        handleInteractivity(interactive, renderTooltip);
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
