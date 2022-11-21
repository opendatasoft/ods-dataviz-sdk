<svelte:options immutable={true} />

<script lang="ts">
    import maplibregl, {
        Map as MapType,
        SourceSpecification,
        StyleSpecification,
        NavigationControl,
        LngLatBoundsLike,
        MapSourceDataEvent,
        MapLayerMouseEvent,
        LngLatLike,
        FilterSpecification,
    } from 'maplibre-gl';
    import { onMount } from 'svelte';
    import { debounce } from 'lodash';
    import type { BBox } from 'geojson';
    import { computeMaxZoomFromGeoJsonFeatures, getFixedTooltips } from '../utils';
    import ColorsLegend from '../../utils/ColorsLegend.svelte';
    import type { ColorScale, DataBounds, LegendVariant } from '../../types';
    import type {
        ChoroplethFixedTooltipDescription,
        MapLayer,
        MapRenderTooltipFunction,
        MapLegend,
    } from '../types';

    // maplibre style (basemap)
    export let style: StyleSpecification;
    // maplibre source config
    export let source: SourceSpecification;
    // maplibre layer config
    export let layer: MapLayer;
    // bounding box to start from, and restrict to it
    export let bbox: BBox | undefined;
    export let viewBox: BBox | undefined = bbox;
    // option to disable map interactions
    export let interactive: boolean;
    // options to display legend
    export let legend: MapLegend | undefined;
    export let colorScale: ColorScale;
    export let dataBounds: DataBounds;
    export let attribution: string | undefined;
    // Used to render tooltips on hover
    export let renderTooltip: MapRenderTooltipFunction;
    // Used to select shapes to activate a tooltip on render
    export let activeShapes: string[] | undefined;
    // aspect ratio based on width, by default equal to 1
    export let aspectRatio = 1;
    // Used to filter the rendered features
    export let filterExpression: FilterSpecification | undefined | null = null;
    // Used to determine on which key match data and shapes
    export let matchKey: string;

    let clientWidth: number;
    let legendVariant: LegendVariant;
    $: legendVariant = clientWidth <= 375 ? 'fluid' : 'fixed';

    // Used to store fixed tooltips displayed on render
    // FIXME: This may not be useful anymore, and is very tied to Choropleth right now
    let fixedPopupsList: ChoroplethFixedTooltipDescription[] = [];

    $: cssVarStyles = `--aspect-ratio:${aspectRatio};`;

    let container: HTMLElement;
    let map: MapType;
    // Used to add navigation control to map
    let nav: NavigationControl;

    let mapReady = false;
    // Used to add a listener to resize map on container changes, canceled on destroy
    let resizer: ResizeObserver;

    const hoverPopup = new maplibregl.Popup({
        closeOnClick: false,
        closeButton: false,
        className: 'tooltip-on-hover',
    }).trackPointer();

    // Used in front of console and error messages to debug multiple maps on a same page
    const mapId = Math.floor(Math.random() * 1000);
    const sourceId = `shape-source-${mapId}`;
    const layerId = `shape-layer-${mapId}`;

    const fitBox = (box: BBox | LngLatBoundsLike) => {
        map.fitBounds(box as LngLatBoundsLike, {
            animate: false,
            padding: 10,
        });
    };

    const setViewBox = (box: BBox | undefined) => {
        if (!box) {
            // zoom-out to bounds defined in the initialization
            map.setZoom(map.getMinZoom());
            return;
        }
        fitBox(box);
    };

    function setMaxBounds(bounds: BBox) {
        // Cancel any saved max bounds to properly fitBounds
        map.setMaxBounds(null);
        fitBox(bounds);
        // Reset min zoom and movement
        map.setMaxBounds(map.getBounds());
    }

    function initializeMap() {
        const defaultCenter: LngLatLike = [3.5, 46];
        const start = {
            center: defaultCenter,
            zoom: 5,
            customAttribution: attribution,
        };

        map = new maplibregl.Map({
            container,
            style,
            ...start,
        });

        nav = new maplibregl.NavigationControl({});

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
                if (mapReady && viewBox) {
                    setViewBox(viewBox);
                }
            }, 100)
        );

        resizer.observe(container);
        // Disconnect the resize onDestroy
        return () => resizer?.disconnect();
    }

    function sourceLoadingCallback(e: MapSourceDataEvent) {
        // sourceDataType can be "visibility" or "metadata", in which case it's not about the data itself
        if (e.isSourceLoaded && e.sourceId === sourceId && !e.sourceDataType) {
            const renderedFeatures = map.querySourceFeatures(
                sourceId,
                // The type forces you to pass a filter parameter in the option, but it's not required by the real code
                // https://github.com/maplibre/maplibre-gl-js/issues/1393
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                {
                    sourceLayer: layer['source-layer'] || layerId, // FIXME: This may not the best way to do it
                }
            );
            if (renderedFeatures.length) {
                // Restrict zoom max only works for geojson for now
                // TODO: We may not catch the smaller shapes if Maplibre discarded them for rendering reasons, so it's a bit risky. Is it worth it?
                // A low-cost approach could be to restrict the zoom scale to an arbitrary value (e.g. only 4 from the max zoom)... or not restrict at all.
                if (e.source.type === 'geojson') {
                    const maxZoom = computeMaxZoomFromGeoJsonFeatures(
                        container,
                        renderedFeatures,
                        matchKey
                    );
                    map.setMaxZoom(maxZoom);
                }
                if (activeShapes && activeShapes.length > 0 && renderTooltip) {
                    fixedPopupsList = getFixedTooltips(
                        activeShapes,
                        renderedFeatures,
                        renderTooltip,
                        matchKey
                    );
                }
            }

            map.off('sourcedata', sourceLoadingCallback);
        }
    }

    function addTooltip(e: MapLayerMouseEvent) {
        if (e.features) {
            const description = renderTooltip(e.features[0]);
            if (description) {
                if (hoverPopup.isOpen()) {
                    hoverPopup.setLngLat(e.lngLat).setHTML(description);
                } else {
                    hoverPopup.setLngLat(e.lngLat).setHTML(description).addTo(map);
                }
            }
        }
    }

    function removeTooltip() {
        hoverPopup.remove();
    }

    function handleInteractivity(
        isInteractive: boolean,
        computeTooltip?: MapRenderTooltipFunction
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
                map.addControl(nav, 'top-left');
            }

            // Handle tooltip display
            map.off('mousemove', layerId, addTooltip);
            map.off('mouseleave', layerId, removeTooltip);

            if (computeTooltip) {
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
                map.removeControl(nav);
            }
            // Reset map zoom
            if (mapReady && bbox) {
                setMaxBounds(bbox);
            }
        }
    }

    function updateSourceAndLayer(newSource: SourceSpecification, newLayer: MapLayer) {
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
            if (filterExpression) {
                map.setFilter(layerId, filterExpression);
            }
            map.on('sourcedata', sourceLoadingCallback);
        }
    }

    function updateStyle(newStyle: StyleSpecification) {
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
    $: if (mapReady) {
        setViewBox(viewBox);
    }
    $: if (fixedPopupsList?.length > 0 && (activeShapes?.length === 0 || !activeShapes)) {
        fixedPopupsList.forEach((fixedPopup) => fixedPopup.popup.remove());
    }
    $: fixedPopupsList.forEach((fixedPopup) => {
        const { center, description, popup } = fixedPopup;
        popup
            .setLngLat(center as LngLatLike)
            .setHTML(description)
            .addTo(map);
    });
</script>

<figure class="map-card" style={cssVarStyles} bind:clientWidth>
    <div id="map" bind:this={container} />
    {#if legend && dataBounds && clientWidth && mapReady}
        <ColorsLegend {dataBounds} {colorScale} variant={legendVariant} title={legend.title} />
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
