import type { BBox } from 'geojson';
import { debounce, difference } from 'lodash';
import maplibregl, {
    LngLatBoundsLike,
    LngLatLike,
    MapGeoJSONFeature,
    MapLayerMouseEvent,
    MapMouseEvent,
    MapOptions,
    StyleSpecification,
} from 'maplibre-gl';

import {
    CONTROL_POSITION,
    POPUP_CLASSNAME,
    POPUP_DISPLAY_CLASSNAME_MODIFIER,
    POPUP_OPTIONS,
    POPUP_WIDTH,
} from './constants';
import type {
    PopupConfigurationByLayers,
    CenterZoomOptions,
    PopupDisplayTypes,
    Images,
} from './types';
import { POPUP_DISPLAY } from './types';

const CURSOR = {
    DEFAULT: 'default',
    HOVER: 'pointer',
    DRAG: 'move',
};

const POPUP_FEATURE_STATE_KEY = 'popup-feature';

type MapFunction = (map: maplibregl.Map) => unknown;

type ActiveFeatureType = MapGeoJSONFeature | null;

function updateFeatureState(
    map: maplibregl.Map,
    feature: ActiveFeatureType,
    stateKey: string,
    stateValue: unknown
) {
    if (!feature) return;
    const { id, source, sourceLayer } = feature;
    map.setFeatureState({ id, source, sourceLayer }, { [stateKey]: stateValue });
}
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

    /** A navigation control for the map. */
    private navigationControl = new maplibregl.NavigationControl({ showCompass: false });

    /** A fullscreen control for the map. */
    private fullscreenControl = new maplibregl.FullscreenControl({});

    /** A popup for displaying information on the map. */
    private popup = new maplibregl.Popup(POPUP_OPTIONS);

    /** An object to store popup configurations for each layers */
    private popupConfigurationByLayers: PopupConfigurationByLayers = {};

    /** Value to represent the active display of the popup */
    private activePopupDisplay: PopupDisplayTypes | null = null;

    /** An active GeoJSONFeature. Its information are displayed within the popup. */
    private activeFeature: ActiveFeatureType = null;

    /** An array of functions to be executed when the map is ready. */
    private queuedFunctions: Array<MapFunction> = [];

    /** To queue functions that depend on map readiness. Will be executed when the card is ready. */
    private queue(fn: MapFunction) {
        if (this.isReady && this.map) return fn(this.map);
        return this.queuedFunctions.push(fn);
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
                features.some((feature) => feature.layer.id in this.popupConfigurationByLayers);
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
    private onMapClick({ point }: MapLayerMouseEvent) {
        this.queue((map) => {
            this.handlePopupAfterMapClick(map, point);
        });
    }

    private bindedOnMapClick = this.onMapClick.bind(this);

    /** Update popup display between tooltip, sidebar and modal modes */
    private updatePopupDisplay() {
        if (!this.activeFeature) return;
        const {
            layer: { id: layerId },
        } = this.activeFeature;
        const oldDisplay = this.activePopupDisplay;
        const { display: newDisplay } = this.popupConfigurationByLayers[layerId] || {};
        if (oldDisplay !== newDisplay) {
            if (oldDisplay) {
                this.popup.removeClassName(POPUP_DISPLAY_CLASSNAME_MODIFIER[oldDisplay]);
            }
            if (!newDisplay) {
                this.popup.remove();
            } else {
                this.popup.addClassName(POPUP_DISPLAY_CLASSNAME_MODIFIER[newDisplay]);
                this.activePopupDisplay = newDisplay;
            }
        }
        this.onPopupDisplayUpdate(oldDisplay, newDisplay);
    }

    /** Update popup content. First add a loading state, then replace it with content */
    private updatePopupContent() {
        if (!this.activeFeature) return;
        const {
            id,
            properties,
            layer: { id: layerId },
        } = this.activeFeature;
        const popupLayerConfiguration = this.popupConfigurationByLayers[layerId];
        if (!popupLayerConfiguration) return;
        const { getLoadingContent, getContent } = popupLayerConfiguration;

        this.popup.addClassName(`${POPUP_CLASSNAME}--loading`);
        this.popup.setHTML(getLoadingContent());

        getContent(id, properties).then((content) => {
            this.popup.setHTML(content);
            this.popup.removeClassName(`${POPUP_CLASSNAME}--loading`);
        });
    }

    /** Handler for popup display changes */
    private onPopupDisplayUpdate(
        oldDisplay: PopupDisplayTypes | null,
        newDisplay: PopupDisplayTypes | null
    ) {
        if (oldDisplay === newDisplay) return;
        this.queue((map) => {
            /**
             * When the popup is display as a sidebar, the feature may be behind the the popup.
             * To avoid this we add a padding to the map, so that the feature remains visible.
             */
            if (
                newDisplay === POPUP_DISPLAY.sidebar &&
                this.activeFeature &&
                this.activeFeature.geometry.type === 'Point'
            ) {
                map.easeTo({
                    center: this.activeFeature.geometry.coordinates as LngLatLike,
                    padding: { left: POPUP_WIDTH },
                });
            }
            if (oldDisplay === POPUP_DISPLAY.sidebar) {
                map.easeTo({ padding: { left: 0 } });
            }
            /*
             * When the popup is displayed as a modal, it overlaps the controls.
             * The result is a double shadow in the top right-hand corner.
             * To get rid of it, we toggle the controls according to the current display.
             */
            if (newDisplay === POPUP_DISPLAY.modal) {
                this.removeControls();
            } else {
                this.addControls();
            }
        });
    }

    /**
     * Is triggered when a click has been made on the map.
     * Is responsible for opening and closing the popup.
     *
     * Opening the popup happens when:
     * - A feature is clicked for which a popup configuration is available (popup configuration are set by layer)
     *
     * Closing the popup happens when:
     * - No features are near the click
     * - The clicked feature is the current feature (activeFeature) displayed in the popup
     * - The button icon button in the popup is clicked
     *
     * @param map The map instance
     * @param point The pixel coordinates of the cursor click, relative to the map
     */
    private handlePopupAfterMapClick(map: maplibregl.Map, point: MapMouseEvent['point']) {
        /*
         * Get features closed to the click area.
         * We ask for features that are not in base style layers
         */
        const features = map.queryRenderedFeatures(point, { layers: this.layerIds });

        // Removing feature state for the obsolete active feature.
        updateFeatureState(map, this.activeFeature, POPUP_FEATURE_STATE_KEY, false);
        const hasFeatures = !!features.length;
        // Current rule: use the first feature to build the popup.
        // TO DO: Create a menu to display a list of feature to choose from.
        const isSelectedFeatureSameAsActiveFeature =
            hasFeatures &&
            !!this.activeFeature &&
            features[0].layer.id === this.activeFeature?.layer.id &&
            features[0].id === this.activeFeature.id;

        // Close popup if:
        // - No features in parameters
        // - Selected feature is the same as the active feature: This means that I clicked on the feature for which the popup is open.
        if (!hasFeatures || isSelectedFeatureSameAsActiveFeature) {
            this.popup.remove();
            return;
        }

        // FIXME: remove eslint comment.
        // eslint-disable-next-line prefer-destructuring
        this.activeFeature = features[0];

        const { geometry } = this.activeFeature;

        if (geometry.type !== 'Point') return;
        if (!this.popup.isOpen()) {
            this.popup.addTo(map);
        }
        this.popup.setLngLat(geometry.coordinates as LngLatLike);

        this.updatePopupContent();
        this.updatePopupDisplay();
        updateFeatureState(map, this.activeFeature, POPUP_FEATURE_STATE_KEY, true);
    }

    /**
     * Check if all specified controls exist on the map.
     */
    private hasAllControls(map: maplibregl.Map) {
        return [this.navigationControl, this.fullscreenControl].every((control) =>
            map.hasControl(control)
        );
    }

    /**
     * Add navigation and fullscreen controls to the map.
     */
    private addControls() {
        this.queue((map) => {
            if (this.hasAllControls(map)) return;
            map.addControl(this.navigationControl, CONTROL_POSITION);
            map.addControl(this.fullscreenControl, CONTROL_POSITION);
        });
    }

    /*
     * Remove navigation and fullscreen controls from the map.
     */
    private removeControls() {
        this.queue((map) => {
            if (!this.hasAllControls(map)) return;
            map.removeControl(this.navigationControl);
            map.removeControl(this.fullscreenControl);
        });
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
                this.baseStyle = this.map.getStyle();
                this.enqueue(this.map);
            }
        });
    }

    destroy() {
        this.activePopupDisplay = null;
        this.activeFeature = null;
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
        });
    }

    setMinZoom(minZoom?: number) {
        this.queue((map) => {
            map.setMinZoom(minZoom);
        });
    }

    setMaxZoom(maxZoom?: number) {
        this.queue((map) => {
            map.setMaxZoom(maxZoom);
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

    /**
     * Store the new popup configuration for each layer.
     * When this configuration is updated, we need to update the popup content and display
     * to reflect the new configuration.
     * @param config Popups configuration
     */
    setpopupConfigurationByLayers(config: PopupConfigurationByLayers) {
        this.popupConfigurationByLayers = config;
        this.updatePopupContent();
        this.updatePopupDisplay();
    }

    /**
     * Load images into the map.
     * Remove automatically any images previously loaded that are no longer defined in the images object.
     */
    loadImages(images?: Images) {
        if (!images) return;
        this.queue((map) => {
            const loadedImages = map.listImages();
            const imagesIds = Object.values(images).map(({ id }) => id);

            const imagesToRemove = difference(loadedImages, imagesIds);
            const imagesToAdd = difference(imagesIds, loadedImages);

            imagesToRemove.forEach((imageId) => {
                map.removeImage(imageId);
            });

            imagesToAdd.forEach((imageId) => {
                const { url, options } = images[imageId];
                map.loadImage(url, (error, image) => {
                    if (error || !image) {
                        // eslint-disable-next-line no-console
                        console.warn(`Fail to load image: ${imageId}`);
                    } else {
                        map.addImage(imageId, image, options);
                    }
                });
            });
        });
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
            map[eventFunction]('click', this.bindedOnMapClick);
            map[eventFunction]('mousemove', this.bindedOnMouseMove);

            if (interaction === 'disable') {
                onDisable?.();
                this.popup.remove();
                this.removeControls();
            }
            if (interaction === 'enable') {
                onEnable?.();
                this.addControls();
            }
        });
    }

    constructor() {
        this.popup.on('close', () => {
            this.queue((map) => {
                updateFeatureState(map, this.activeFeature, POPUP_FEATURE_STATE_KEY, false);
            });
            this.onPopupDisplayUpdate(this.activePopupDisplay, null);
            this.activePopupDisplay = null;
            this.activeFeature = null;
        });
    }
}
