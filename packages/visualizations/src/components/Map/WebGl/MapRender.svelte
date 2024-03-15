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
        GestureOptions,
    } from 'maplibre-gl';
    import { onMount } from 'svelte';
    import { debounce } from 'lodash';
    import type { BBox } from 'geojson';
    import SourceLink from '../../utils/SourceLink.svelte';
    import { computeMaxZoomFromGeoJsonFeatures, getFixedTooltips } from '../utils';
    import ColorsLegend from '../../Legend/ColorsLegend.svelte';
    import BackButton from '../../utils/BackButton.svelte';
    import MiniMap from '../../utils/MiniMap.svelte';
    import type { ColorScale, DataBounds, Source } from '../../types';
    import type { LegendVariant } from '../../Legend/types';
    import type {
        ChoroplethFixedTooltipDescription,
        MapLayer,
        MapRenderTooltipFunction,
        MapLegend,
        NavigationMap,
        ChoroplethDataValue,
    } from '../types';

    // maplibre style (basemap)
    export let style: StyleSpecification;
    // maplibre source config
    export let source: SourceSpecification;
    // maplibre layer config
    export let layer: MapLayer;
    // bounding box to start from, and restrict to it
    export let bbox: BBox | undefined;
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
    // Title of the map
    export let title: string | undefined;
    // Subtitle of the map
    export let subtitle: string | undefined;
    // Accessibility description
    export let description: string | undefined;
    // Navigation maps
    export let navigationMaps: NavigationMap[] | undefined;
    export let data: { value: ChoroplethDataValue[] };
    // Data source link
    export let sourceLink: Source | undefined;
    export let cooperativeGestures: boolean | GestureOptions | undefined;
    // Fixed max bounds that will overide the automatic map.getBounds when setting the bbox
    export let fixedMaxBounds: LngLatBoundsLike | undefined | null = null;

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
    $: currentBbox = bbox;
    // Used to add a listener to resize map on container changes, canceled on destroy
    let resizer: ResizeObserver;

    const hoverPopup = new maplibregl.Popup({
        closeOnClick: false,
        closeButton: false,
        className: 'tooltip-on-hover',
    }).trackPointer();

    const CURSOR = {
        DEFAULT: 'default',
        DRAG: 'move',
    };

    // Used in front of console and error messages to debug multiple maps on a same page
    const mapId = Math.floor(Math.random() * 1000);
    const sourceId = `shape-source-${mapId}`;
    const layerId = `shape-layer-${mapId}`;

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
        // Set new map max bounds after bbox changes
        map.setMaxBounds(fixedMaxBounds || map.getBounds());
    };

    function initializeMap() {
        const defaultCenter: LngLatLike = [3.5, 46];
        const start = {
            center: defaultCenter,
            zoom: 5,
            customAttribution: attribution,
            renderWorldCopies: false,
            cooperativeGestures,
        };

        map = new maplibregl.Map({
            container,
            style,
            ...start,
        });

        nav = new maplibregl.NavigationControl({ showCompass: false });

        map.on('load', () => {
            mapReady = true;
        });

        return () => map.remove();
    }

    function initializeResizer() {
        // Set a resizeObserver to resize map on container size changes
        resizer = new ResizeObserver(
            debounce(() => {
                map.resize();
                if (mapReady && currentBbox) {
                    setBbox(currentBbox);
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

    let active: number | undefined;

    const setBboxFromButton = (mapSVG: NavigationMap, i: number) => () => {
        currentBbox = mapSVG.bbox;
        active = i;
    };

    const resetBboxFromButton = () => {
        active = undefined;
        currentBbox = bbox;
    };

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

            // Pointer style consistency across SDK maps
            const canvas = map.getCanvas();
            map.on('dragstart', () => {
                canvas.style.cursor = CURSOR.DRAG;
            });
            map.on('dragend', () => {
                canvas.style.cursor = CURSOR.DEFAULT;
            });

            // Add navigation control to map
            if (!map.hasControl(nav)) {
                map.addControl(nav, 'top-right');
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
            // Reset map Bbox to reset zoom
            if (mapReady && bbox) {
                active = undefined;
                currentBbox = bbox;
                setBbox(currentBbox);
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
    $: if (mapReady && currentBbox) {
        setBbox(currentBbox);
    }
    $: if (fixedPopupsList?.length > 0 && (activeShapes?.length === 0 || !activeShapes)) {
        fixedPopupsList.forEach((fixedPopup) => fixedPopup.popup.remove());
    }
    $: fixedPopupsList.forEach((fixedPopup) => {
        const { center, description: tooltipDescription, popup } = fixedPopup;
        popup
            .setLngLat(center as LngLatLike)
            .setHTML(tooltipDescription)
            .addTo(map);
    });
</script>

<figure class="map-card maps-container" style={cssVarStyles} bind:clientWidth>
    {#if title || subtitle}
        <figcaption>
            {#if title}
                <h3>
                    {title}
                </h3>
            {/if}
            {#if subtitle}
                <p>
                    {subtitle}
                </p>
            {/if}
        </figcaption>
    {/if}
    <div class="main" aria-describedby={description ? mapId.toString() : undefined}>
        {#if navigationMaps && active !== undefined}
            <BackButton on:click={resetBboxFromButton} />
        {/if}
        <div id="map" bind:this={container} />
    </div>
    {#if description}
        <p id={mapId.toString()} class="a11y-invisible-description">{description}</p>
    {/if}
    <!-- Working with index is safe since we don't add/remove items -->
    {#if navigationMaps}
        <div class="buttons" style="--buttons-events:{interactive ? 'auto' : 'none'}">
            {#each navigationMaps as map, i}
                <MiniMap
                    {data}
                    {map}
                    {colorScale}
                    active={active === i}
                    showTooltip={interactive}
                    on:click={setBboxFromButton(map, i)}
                />
            {/each}
        </div>
    {/if}
    {#if legend && dataBounds && clientWidth && mapReady}
        <ColorsLegend
            {dataBounds}
            {colorScale}
            variant={legendVariant}
            title={legend.title}
            position={legend.position}
        />
    {/if}
    {#if sourceLink}
        <SourceLink source={sourceLink} />
    {/if}
</figure>

<style>
    #map {
        height: 400px;
    }
    #map :global(canvas) {
        cursor: default;
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
    figcaption {
        margin: 0 0 1em 0;
    }
    figcaption p,
    figcaption h3 {
        margin: 0;
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
    /* Add a more opacity and blur effect on map when cooperative gesture is shown */
    .map-card :global(.maplibregl-cooperative-gesture-screen) {
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(2px);
    }
    .main {
        aspect-ratio: var(--aspect-ratio);
        flex-grow: 1;
        position: relative;
        display: block;
    }
    .buttons {
        display: grid;
        grid: auto-flow minmax(52px, 60px) / repeat(auto-fit, minmax(52px, 60px));
        justify-content: flex-start;
        pointer-events: var(--buttons-events);
    }
    /* Suitable for elements that are used via aria-describedby or aria-labelledby */
    .a11y-invisible-description {
        display: none;
    }
</style>
