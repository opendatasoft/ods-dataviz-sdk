import type { BBox } from 'geojson';
import { debounce } from 'lodash';
import maplibregl, {
    LngLatBoundsLike,
    LngLatLike,
    MapGeoJSONFeature,
    MapLayerMouseEvent,
    MapMouseEvent,
    MapOptions,
    StyleSpecification,
} from 'maplibre-gl';

import { POPUP_OPTIONS, POPUP_WIDTH } from './constants';
import type { PopupsConfiguration, CenterZoomOptions } from './types';

const CURSOR = {
    DEFAULT: 'default',
    HOVER: 'pointer',
    DRAG: 'move',
};

type MapFunction = (map: maplibregl.Map) => unknown;

export default class MapPOI {
    /** The Map object representing the maplibregl.Map instance. */
    private map: maplibregl.Map | null = null;

    /** Map resize observer */
    private mapResizeObserver: ResizeObserver | null = null;

    /** Flag indicating whether the map is ready. */
    private isReady = false;

    /** The base style of the map */
    private baseStyle: StyleSpecification | null = null;

    /** Array of layer IDs that are not from the base style of the map */
    private layerIds: string[] = [];

    /** Array of source IDs used in the map */
    private sourceIds: string[] = [];

    /** A navigation control for the map. */
    private navigationControl = new maplibregl.NavigationControl({ showCompass: false });

    /** A popup for displaying information on the map. */
    private popup = new maplibregl.Popup(POPUP_OPTIONS);

    /** Popups configurations. One configuration by layer */
    private popupsConfiguration: PopupsConfiguration = {};

    /** An array of GeoJSONFeatures associated with the popup. */
    private popupFeatures: MapGeoJSONFeature[] = [];

    /** An array of functions to be executed when the map is ready. */
    private queuedFunctions: Array<MapFunction> = [];

    /** To queue functions that depend on map readiness. Will be executed when the card is ready. */
    private queue(fn: MapFunction) {
        if (this.isReady && this.map) fn(this.map);
        else this.queuedFunctions.push(fn);
    }

    /** Execute queued functions */
    private enqueue(map: maplibregl.Map) {
        this.queuedFunctions.forEach((fn) => fn(map));
        this.queuedFunctions = [];
    }

    /** Initialize a resize observer to always fit the map to its container */
    private initializeMapResizer(map: maplibregl.Map, container: HTMLElement) {
        // Set a resizeObserver to resize map on container size changes
        this.mapResizeObserver = new ResizeObserver(
            debounce(() => {
                map.resize();
            }, 100)
        );
        this.mapResizeObserver.observe(container);
    }

    /**
     * Event handler for mousemove event.
     * Show a pointer cursor if hovering a feature with a popup configuration
     */
    private onMouseMove({ point }: MapMouseEvent) {
        this.queue((map) => {
            const canvas = map.getCanvas();
            const features = map.queryRenderedFeatures(point, { layers: this.layerIds });
            const isMovingOverFeatureWithPopup =
                features.length &&
                features.some((feature) =>
                    Object.keys(this.popupsConfiguration).includes(feature.layer.id)
                );
            canvas.style.cursor = isMovingOverFeatureWithPopup ? CURSOR.HOVER : CURSOR.DEFAULT;
        });
    }

    private bindedOnMouseMove = this.onMouseMove.bind(this);

    /**
     * How cursor should react on drag and when mouse move over the map
     */
    private initializeCursorBehavior(map: maplibregl.Map) {
        const canvas = map.getCanvas();
        map.on('dragstart', () => {
            canvas.style.cursor = CURSOR.DRAG;
        });
        map.on('dragend', () => {
            canvas.style.cursor = CURSOR.DEFAULT;
        });
    }

    /**
     * Event handler for click events on the map.
     * Currently, is only used to handle popup display.
     * @param {MapLayerMouseEvent} event
     */
    private onClick({ point }: MapLayerMouseEvent) {
        this.queue((map) => {
            /**
             * Get features closed to the click.
             * We ask for features that are not in base style layers
             */
            const features = map.queryRenderedFeatures(point, { layers: this.layerIds });

            // Will close the popup
            if (this.popupFeatures.length) return;

            // If features from selected layers, update the popup
            if (features.length) {
                this.popupFeatures = features;
                this.setPopup(map);
            }
        });
    }

    private bindedOnClick = this.onClick.bind(this);

    private resetLeftPaddingPopup() {
        this.queue((map) => map.easeTo({ padding: { left: 0 } }));
        this.popup.off('close', this.bindedResetLeftPaddingPopup);
    }

    private bindedResetLeftPaddingPopup = this.resetLeftPaddingPopup.bind(this);

    /** Event handler for popup close event. */
    private onPopupClose() {
        this.popupFeatures.forEach(({ source, sourceLayer, id }) => {
            if (this.sourceIds.includes(source)) {
                this.queue((map) => {
                    map.setFeatureState({ source, sourceLayer, id }, { 'popup-feature': false });
                });
            }
        });
        this.popupFeatures = [];
    }

    private bindedOnPopupClose = this.onPopupClose.bind(this);

    /** Set the popup content and positioning */
    private setPopup(map: maplibregl.Map) {
        if (!this.popupFeatures.length) return;

        // Current rule: use the first feature to build the popup.
        // TO DO: Create a menu to display a list of feature to choose from.
        const {
            id: featureId,
            layer: { id: layerId },
            geometry,
            properties,
            source,
            sourceLayer,
        } = this.popupFeatures[0];

        if (geometry.type !== 'Point') return;

        // Get the popup configuration for a layer
        const popupConfiguration = this.popupsConfiguration[layerId];

        /*
         * We remove the popup if:
         * - no popup configuration for a layer
         * - popup's source is no longer used in the map
         */
        if (!popupConfiguration || !this.sourceIds.includes(source)) {
            this.popup.remove();
            this.popupFeatures = [];
            return;
        }

        const { display, getContent, getLoadingContent } = popupConfiguration;

        if (this.popup.isOpen() === false) {
            this.popup.setLngLat(geometry.coordinates as LngLatLike).addTo(map);
        }

        this.popup.setHTML(getLoadingContent());
        getContent(featureId, properties).then((content) => {
            this.popup.setHTML(content);
        });

        const classnameModifier = display === 'sidebar' ? 'addClassName' : 'removeClassName';
        this.popup[classnameModifier](`${POPUP_OPTIONS.className}--as-sidebar`);

        if (display === 'sidebar') {
            map.easeTo({
                center: geometry.coordinates as LngLatLike,
                padding: { left: POPUP_WIDTH },
            });
            this.popup.on('close', this.bindedResetLeftPaddingPopup);
        }

        if (featureId) {
            map.setFeatureState({ source, sourceLayer, id: featureId }, { 'popup-feature': true });
        }
    }

    initialize(
        style: MapOptions['style'],
        container: HTMLElement,
        options: Omit<MapOptions, 'style' | 'container'>
    ) {
        this.map = new maplibregl.Map({ style, container, ...options });

        this.queue((map) => this.initializeMapResizer(map, container));
        this.queue((map) => this.initializeCursorBehavior(map));

        this.map.on('load', () => {
            this.isReady = true;
            if (this.map) {
                // Store base style after the first load
                this.baseStyle = this.map?.getStyle();
                this.popup.on('close', this.bindedOnPopupClose);
                this.enqueue(this.map);
            }
        });
    }

    destroy() {
        this.popupFeatures = [];
        this.popup.remove();
        this.queue((map) => map.remove());
        this.mapResizeObserver?.disconnect();
    }

    // TODO: add tests to check that layers are at the end of the array
    /*
     * TODO: When updating Maplibre to a 3.2.2 version or up
     * - Update this code to use the option transformStyle.
     *   https://maplibre.org/maplibre-gl-js/docs/API/types/maplibregl.TransformStyleFunction/
     * - `baseStyle` could be removed
     * - The key block could also be removed in MapRender.svelte
     */
    /**
     * Update the sources and layers of the map.
     * Layers of the map base style are untouched.
     */
    setSourcesAndLayers(
        sources: StyleSpecification['sources'],
        layers: StyleSpecification['layers']
    ) {
        this.queue((map) => {
            if (this.baseStyle) {
                map.setStyle({
                    ...this.baseStyle,
                    sources: {
                        ...sources,
                        ...this.baseStyle.sources,
                    },
                    layers: [...this.baseStyle.layers, ...layers],
                });
            }
            this.layerIds = layers.map(({ id }) => id);
            this.sourceIds = Object.keys(sources);
        });
    }

    setMinZoom(minzoom?: number) {
        this.queue((map) => {
            map.setMinZoom(minzoom);
        });
    }

    setMaxZoom(maxzoom?: number) {
        this.queue((map) => {
            map.setMaxZoom(maxzoom);
        });
    }

    setBbox(bbox?: BBox) {
        this.queue((map) => {
            if (!bbox) {
                // zoom-out to bounds defined in the initialization
                map.setZoom(map.getMinZoom());
                return;
            }

            // Cancel any saved max bounds to properly fitBounds
            map.setMaxBounds(null);
            // Using padding, keep enough room for controls (zoom) to make sure they don't hide anything
            map.fitBounds(bbox as LngLatBoundsLike, {
                animate: false,
                padding: 40,
            });
        });
    }

    /**
     * Changes any combination of center and zoom without an animated transition.
     * The map will retain its current values for any details not specified in options
     */
    jumpTo(options: CenterZoomOptions) {
        this.queue((map) => map.jumpTo(options));
    }

    setPopupsConfiguration(config: PopupsConfiguration) {
        this.popupsConfiguration = config;
        this.queue((map) => this.setPopup(map));
    }

    toggleInteractivity(
        interaction: 'enable' | 'disable',
        { onDisable, onEnable }: { onDisable?: () => void; onEnable?: () => void }
    ) {
        this.queue((map) => {
            map.boxZoom[interaction]();
            map.doubleClickZoom[interaction]();
            map.dragPan[interaction]();
            map.dragRotate[interaction]();
            map.keyboard[interaction]();
            map.scrollZoom[interaction]();
            map.touchZoomRotate[interaction]();

            const eventFunction = interaction === 'enable' ? 'on' : 'off';
            map[eventFunction]('click', this.bindedOnClick);
            map[eventFunction]('mousemove', this.bindedOnMouseMove);

            const hasControl = map.hasControl(this.navigationControl);

            if (interaction === 'disable') {
                onDisable?.();
                this.popup.remove();
                if (hasControl) {
                    map.removeControl(this.navigationControl);
                }
            }
            if (interaction === 'enable') {
                onEnable?.();
                if (!hasControl) {
                    map.addControl(this.navigationControl, 'top-right');
                }
            }
        });
    }
}
