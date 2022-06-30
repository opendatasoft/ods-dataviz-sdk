<svelte:options immutable={true} />

<script>
    /*
TODO:
- Restrict movement:
    - Block minZoom to the initial one after fitting the bbox
    - Compute maxZoom based on the smallest extent when using queryFeature restricted to this bbox
- Display the map based on style, source, layer, refresh when one changes
- Adapt display based on the size of the map (single, main, side)
*/
    import maplibregl from 'maplibre-gl';
    import { onMount } from 'svelte';
    import { debounce } from 'lodash';
    import { computeMaxZoomFromGeoJsonFeatures, getFixedTooltips } from './utils';
    import ColorsLegend from '../utils/ColorsLegend.svelte';

    // maplibre style (basemap)
    export let style;
    // maplibre source config
    export let source;
    // maplibre layer config
    export let layer;
    // bounding box to start from, and restrict to it
    export let bbox;

    // option to disable map interactions
    export let interactive;

    // options to display legend
    export let legend;
    export let colorsScale;
    export let dataBounds;
    let clientWidth;
    $: legendVariant = clientWidth <= 375 ? 'fluid' : 'fixed';

    // Used to render tooltips on hover
    export let renderTooltip;
    const hoverPopup = new maplibregl.Popup({
        closeOnClick: false,
        closeButton: false,
        className: 'tooltip-on-hover',
    }).trackPointer();
    // Used to store fixed tooltips displayed on render
    let fixedPopupsList = [];
    // Used to select shapes to activate a tooltip on render
    export let activeShapes;

    // aspect ratio based on width, by default equal to 1
    export let aspectRatio = 1;
    $: cssVarStyles = `--aspect-ratio:${aspectRatio};`;

    let container;
    let map;
    // Used to add navigation control to map
    let nav;

    let mapReady = false;
    // Used to add a listener to resize map on container changes, canceled on destroy
    let resizer;

    // Used in front of console and error messages to debug multiple maps on a same page
    const mapId = Math.floor(Math.random() * 1000);
    const sourceId = `shape-source-${mapId}`;
    const layerId = `shape-layer-${mapId}`;

    function fitMapToBbox(newBbox) {
        // Cancel saved max bounds to properly fitBounds
        map.setMaxBounds(null);
        map.fitBounds(newBbox, {
            animate: false,
            padding: 10,
        });
        // Rest min zoom and movement
        map.setMaxBounds(map.getBounds());
    }

    function initializeMap() {
        const start = {
            center: [3.5, 46],
            zoom: 5,
        };

        map = new maplibregl.Map({
            container,
            style,
            ...start,
        });

        nav = new maplibregl.NavigationControl();

        map.on('load', () => {
            mapReady = true;
        });

        return () => map.remove();
    }

    function initializeResizer() {
        // Set a resizeObserver to resize map on container size changes
        // TODO: Do we really want to reset to the initial bbox each time?
        resizer = new ResizeObserver(
            debounce(() => {
                map.resize();
                if (mapReady && bbox) {
                    fitMapToBbox(bbox);
                }
            }, 100)
        );

        resizer.observe(container);
        // Disconnect the resize onDestroy
        return () => resizer?.disconnect();
    }

    function sourceLoadingCallback(e) {
        // sourceDataType can be "visibility" or "metadata", in which case it's not about the data itself
        if (e.isSourceLoaded && e.sourceId === sourceId && !e.sourceDataType) {
            const renderedFeatures = map.querySourceFeatures(sourceId, { sourceLayer: layerId });

            if (renderedFeatures.length) {
                // Restrict zoom max
                // TODO: We may not catch the smaller shapes if Maplibre discarded them for rendering reasons, so it's a bit risky. Is it worth it?
                // A low-cost approach could be to restrict the zoom scale to an arbitrary value (e.g. only 4 from the max zoom)... or not restrict at all.
                const maxZoom = computeMaxZoomFromGeoJsonFeatures(container, renderedFeatures);
                map.setMaxZoom(maxZoom);
                if (activeShapes?.length > 0 && renderTooltip) {
                    fixedPopupsList = getFixedTooltips(
                        activeShapes,
                        renderedFeatures,
                        renderTooltip
                    );
                }
            }

            map.off('sourcedata', sourceLoadingCallback);
        }
    }

    function addTooltip(e) {
        const description = renderTooltip(e.features[0]);
        if (hoverPopup.isOpen()) {
            hoverPopup.setLngLat(e.lngLat).setHTML(description);
        } else {
            hoverPopup.setLngLat(e.lngLat).setHTML(description).addTo(map);
        }
    }

    function removeTooltip() {
        hoverPopup.remove();
    }

    function handleInteractivity(isInteractive, tooltipRenderer) {
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
                map.addControl(nav, 'top-left');
            }

            // Handle tooltip display
            map.off('mousemove', layerId, addTooltip);
            map.off('mouseleave', layerId, removeTooltip);

            if (tooltipRenderer) {
                map.on('mousemove', layerId, addTooltip);
                map.on('mouseleave', layerId, removeTooltip);
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

            // Remove tooltip
            map.off('mousemove', layerId, addTooltip);
            map.off('mouseleave', layerId, removeTooltip);

            // Remove navigation control from map
            if (map.hasControl(nav)) {
                map.removeControl(nav, 'top-left');
            }
            // Reset map zoom
            if (mapReady && bbox) {
                fitMapToBbox(bbox);
            }
        }
    }

    function updateSourceAndLayer(newSource, newLayer) {
        if (newSource && newLayer) {
            if (map.getLayer(layerId)) {
                map.removeLayer(layerId);
            }

            if (map.getSource(sourceId)) {
                map.removeSource(sourceId);
            }

            map.addSource(sourceId, newSource);
            map.addLayer({
                ...newLayer,
                id: layerId,
                source: sourceId,
            });

            map.on('sourcedata', sourceLoadingCallback);
        }
    }

    function updateStyle(newStyle) {
        if (mapReady) {
            map.setStyle(newStyle);
            // Changing the style resets the map
            map.once('styledata', () => updateSourceAndLayer(source, layer));
        }
    }

    // Lifecycle
    onMount(initializeMap);
    onMount(initializeResizer);

    $: if (mapReady) {
        updateSourceAndLayer(source, layer);
    }
    $: if (mapReady) {
        handleInteractivity(interactive, renderTooltip);
    }
    $: updateStyle(style);
    $: if (mapReady && bbox) {
        fitMapToBbox(bbox);
    }
    $: if (fixedPopupsList?.length > 0 && (activeShapes?.length === 0 || !activeShapes)) {
        fixedPopupsList.forEach((fixedPopup) => fixedPopup.popup.remove());
    }
    $: fixedPopupsList.forEach((fixedPopup) => {
        const { center, description, popup } = fixedPopup;
        popup.setLngLat(center).setHTML(description).addTo(map);
    });
</script>

<figure class="map-card" style={cssVarStyles} bind:clientWidth>
    <div id="map" bind:this={container} />
    {#if legend && dataBounds && clientWidth && mapReady}
        <ColorsLegend {dataBounds} {colorsScale} variant={legendVariant} title={legend.title} />
    {/if}
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
</style>
