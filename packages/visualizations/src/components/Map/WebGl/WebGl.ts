import type { BBox, Feature, Geometry } from 'geojson';
import pointOnFeature from '@turf/point-on-feature';
import { debounce, difference } from 'lodash';
import MaplibreGl from 'maplibre-gl';
import type {
    Map,
    LngLatBoundsLike,
    LngLatLike,
    MapGeoJSONFeature,
    MapLayerMouseEvent,
    MapMouseEvent,
    MapOptions,
    StyleSpecification,
    CircleLayerSpecification,
    SymbolLayerSpecification,
} from 'maplibre-gl';

import {
    CONTROL_POSITION,
    POPUP_FEATURE_CONTENT,
    POPUP_FEATURE_CONTENT_LOADING,
    POPUP_DISPLAY_CLASSNAME_MODIFIER,
    POPUP_NAVIGATION_CONTROLS_CLASSNAME,
    POPUP_NAVIGATION_ARROWS_WRAPPER_CLASSNAME,
    POPUP_NAVIGATION_ARROW_BUTTON_CLASSNAME,
    POPUP_NAVIGATION_ARROW_BUTTON_ICON_CLASSNAME,
    POPUP_NAVIGATION_CLOSE_BUTTON_CLASSNAME,
    POPUP_NAVIGATION_CLOSE_BUTTON_ICON_CLASSNAME,
    POPUP_OPTIONS,
    POPUP_WIDTH,
    POPUP_NAVIGATION_CONTROLS_OFFSET_CLASSNAME,
    DEFAULT_SORT_KEY_VALUE,
    POPUP_DISPLAY,
} from './constants';
import type {
    PopupConfigurationByLayers,
    CenterZoomOptions,
    PopupDisplayTypes,
    Images,
    OnFeatureClick,
    SupportedGeometry,
} from './types';

const CURSOR = {
    DEFAULT: 'default',
    HOVER: 'pointer',
    DRAG: 'move',
};

const ACTIVE_FEATURE_CIRCLE_RATIO_SIZE = 1.3;

const SUPPORTED_GEOMETRY_TYPES: SupportedGeometry['type'][] = [
    'Point',
    'MultiPoint',
    'LineString',
    'MultiLineString',
    'Polygon',
    'MultiPolygon',
];

function isSupportedGeometry(geometry: Geometry): geometry is SupportedGeometry {
    return SUPPORTED_GEOMETRY_TYPES.includes(geometry.type as SupportedGeometry['type']);
}

/** Sorts features in a layer by setting a sort key for a specific feature. */
const sortLayerFeatures = (
    map: Map,
    layer: MapGeoJSONFeature['layer'],
    feature: MapGeoJSONFeature
) => {
    map.setLayoutProperty(layer.id, `${layer.type}-sort-key`, [
        'case',
        ['==', ['id'], feature.id],
        1,
        0,
    ]);
};

/** Restores the original sorting order of features in a layer */
const unsortLayerFeatures = (map: Map, layer: MapGeoJSONFeature['layer']) => {
    map.setLayoutProperty(layer.id, `${layer.type}-sort-key`, DEFAULT_SORT_KEY_VALUE);
};

type MapFunction = (map: Map) => unknown;

type ActiveFeatureType = MapGeoJSONFeature | null;

export default class MapPOI {
    /** The Map object representing the Map instance. */
    private map: Map | null = null;

    /** Map resize observer */
    private mapResizeObserver: ResizeObserver | null = null;

    /** Flag indicating whether the map is ready. */
    private isReady = false;

    /** The base style of the map */
    private baseStyle: StyleSpecification | null = null;

    /** A navigation control for the map. */
    private navigationControl = new MaplibreGl.NavigationControl({ showCompass: false });

    /** A fullscreen control for the map. */
    private fullscreenControl = new MaplibreGl.FullscreenControl({});

    /** A popup for displaying information on the map. */
    private popup = new MaplibreGl.Popup(POPUP_OPTIONS);

    /** An object to store popup configurations for each layers */
    private popupConfigurationByLayers: PopupConfigurationByLayers = {};

    /** Value to represent the active display of the popup */
    private activePopupDisplay: PopupDisplayTypes | null = null;

    /** An active GeoJSONFeature. Its information are displayed within the popup. */
    private activeFeature: ActiveFeatureType = null;

    /** All available GeoJSONFeatures on click event */
    private availableFeaturesOnClick: ActiveFeatureType[] = [];

    /** An array of functions to be executed when the map is ready. */
    private queuedFunctions: Array<MapFunction> = [];

    /** Additional custom click handler */
    private onFeatureClick: OnFeatureClick | null = null;

    /** To queue functions that depend on map readiness. Will be executed when the card is ready. */
    private queue(fn: MapFunction) {
        if (this.isReady && this.map) return fn(this.map);
        return this.queuedFunctions.push(fn);
    }

    /** Execute queued functions */
    private enqueue(map: Map) {
        this.queuedFunctions.forEach((fn) => fn(map));
        this.queuedFunctions = [];
    }

    /** Remember last clicked position */
    private lastClickLngLat: LngLatLike | null = null;

    /** Get a point guaranteed to be on the surface of the feature */
    private getGeometryAnchor(geometry: SupportedGeometry): LngLatLike | null {
        try {
            const feature: Feature<SupportedGeometry> = {
                type: 'Feature',
                geometry,
                properties: {},
            };
            const pt = pointOnFeature(feature);
            return pt.geometry.coordinates as LngLatLike;
        } catch {
            return null;
        }
    }

    /** Make active feature bigger and sort it on top of other features in the layer */
    private highlightFeature(feature: ActiveFeatureType) {
        if (!feature) return;
        const { layer } = feature;
        this.queue((map) => {
            sortLayerFeatures(map, layer, feature);
            switch (layer.type) {
                case 'symbol':
                    // eslint-disable-next-line no-case-declarations
                    const iconSize = ((layer as SymbolLayerSpecification).layout?.['icon-size'] ||
                        1) as number;
                    map.setLayoutProperty(layer.id, 'icon-size', [
                        'case',
                        ['==', ['id'], feature.id],
                        iconSize * ACTIVE_FEATURE_CIRCLE_RATIO_SIZE,
                        iconSize,
                    ]);
                    break;
                case 'circle':
                    // eslint-disable-next-line no-case-declarations
                    const circleRadius = (layer as CircleLayerSpecification).paint?.[
                        'circle-radius'
                    ] as number;
                    map.setPaintProperty(layer.id, 'circle-radius', [
                        'case',
                        ['==', ['id'], feature.id],
                        circleRadius * ACTIVE_FEATURE_CIRCLE_RATIO_SIZE,
                        circleRadius,
                    ]);
                    break;
                default:
                    break;
            }
        });
    }

    /** Reset active feature highlight state */
    private unhighlightFeature(feature: ActiveFeatureType) {
        if (!feature) return;
        const { layer } = feature;
        this.queue((map) => {
            unsortLayerFeatures(map, layer);
            switch (layer.type) {
                case 'symbol':
                    map.setLayoutProperty(
                        layer.id,
                        'icon-size',
                        (layer as SymbolLayerSpecification).layout?.['icon-size'] || 1
                    );
                    break;
                case 'circle':
                    // eslint-disable-next-line no-case-declarations
                    const circleRadius = (layer as CircleLayerSpecification).paint?.[
                        'circle-radius'
                    ];
                    /*
                     * FIXME: As of Maplibre 2.2.1, resetting 'circle-radius' with a numeric value alone is not sufficient.
                     * An expression with a case statement based on the feature ID is still required.
                     * Without this, the feature's clickability is compromised, as the hitbox becomes minimal,
                     * failing to reflect the expected behavior of the circleRadius property.
                     */
                    map.setPaintProperty(layer.id, 'circle-radius', [
                        'case',
                        ['==', ['id'], ''],
                        circleRadius,
                        circleRadius,
                    ]);
                    break;
                default:
                    break;
            }
        });
    }

    /** Initialize a resize observer to always fit the map to its container */
    private initializeMapResizer(map: Map, container: HTMLElement) {
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
     * Show a pointer cursor if hovering a feature with a popup configuration on an onClick callback
     */
    private onMouseMove({ point }: MapMouseEvent) {
        this.queue((map) => {
            const canvas = map.getCanvas();
            const layers = [
                ...Object.keys(this.popupConfigurationByLayers),
                ...(this.onFeatureClick?.layers || []),
            ];
            const features = map.queryRenderedFeatures(point, { layers });
            canvas.style.cursor = features.length ? CURSOR.HOVER : CURSOR.DEFAULT;
        });
    }

    private bindedOnMouseMove = this.onMouseMove.bind(this);

    /**
     * How cursor should react on drag and when mouse move over the map
     */
    private initializeCursorBehavior(map: Map) {
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
     * @param {MapLayerMouseEvent} e
     */
    private onMapClick(e: MapLayerMouseEvent) {
        this.queue((map) => {
            this.handlePopupAfterMapClick(map, e.point, e.lngLat);
            if (this?.onFeatureClick) {
                this.handleCustomFeatureClick(map, e.point, this.onFeatureClick);
            }
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

    private navigateToFeature(direction: number) {
        this.unhighlightFeature(this.activeFeature);
        const activeFeatureIndex = this.availableFeaturesOnClick.indexOf(this.activeFeature);
        this.activeFeature = this.availableFeaturesOnClick[activeFeatureIndex + direction];
        this.updatePopupContent();
        this.updatePopupDisplay();
        if (this.activeFeature && isSupportedGeometry(this.activeFeature.geometry)) {
            const anchor = this.getGeometryAnchor(this.activeFeature.geometry);
            if (anchor) this.popup.setLngLat(anchor);
        }
        this.highlightFeature(this.activeFeature);
    }

    private renderFeaturesNavigationControls() {
        const popupNavigationDiv = document.createElement('div');
        popupNavigationDiv.classList.add(POPUP_NAVIGATION_CONTROLS_CLASSNAME);
        const availableFeaturesTotal = this.availableFeaturesOnClick.length;
        let arrows = '';
        if (availableFeaturesTotal > 1) {
            const activeFeatureHumanIndex =
                this.availableFeaturesOnClick.indexOf(this.activeFeature) + 1;
            arrows = `<div class="${POPUP_NAVIGATION_CONTROLS_OFFSET_CLASSNAME}"></div><div class="${POPUP_NAVIGATION_ARROWS_WRAPPER_CLASSNAME}"><button class="${POPUP_NAVIGATION_ARROW_BUTTON_CLASSNAME}" id="prevButton" ${
                activeFeatureHumanIndex === 1 ? 'disabled' : ''
            }><span class="${POPUP_NAVIGATION_ARROW_BUTTON_ICON_CLASSNAME}"></span></button>
                        <div class="feature-count">${activeFeatureHumanIndex} / ${availableFeaturesTotal}</div>
                        <button class="${POPUP_NAVIGATION_ARROW_BUTTON_CLASSNAME}" id="nextButton" ${
                activeFeatureHumanIndex === availableFeaturesTotal ? 'disabled' : ''
            }><span class="${POPUP_NAVIGATION_ARROW_BUTTON_ICON_CLASSNAME}"></span></button></div>`;
        }

        popupNavigationDiv.innerHTML = `
                ${arrows}
                <button class="${POPUP_NAVIGATION_CLOSE_BUTTON_CLASSNAME}"><span class="${POPUP_NAVIGATION_CLOSE_BUTTON_ICON_CLASSNAME}"></span></button>
        `;

        const prevButton = popupNavigationDiv.querySelector('#prevButton');
        prevButton?.addEventListener('click', () => this.navigateToFeature(-1));

        const nextButton = popupNavigationDiv.querySelector('#nextButton');
        nextButton?.addEventListener('click', () => this.navigateToFeature(1));

        const closeButton = popupNavigationDiv.querySelector(
            `.${POPUP_NAVIGATION_CLOSE_BUTTON_CLASSNAME}`
        );
        closeButton?.addEventListener('click', () => this.popup.remove());
        return popupNavigationDiv;
    }

    /**
     * Update popup content.
     * - First add a loading state,
     * - Then replace it with content
     *
     * Navigation controls element is always displayed
     */
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

        const controlsDiv = this.renderFeaturesNavigationControls();

        const loadingWrapper = document.createElement('div');

        const popupFeatureContentLoading = document.createElement('div');
        popupFeatureContentLoading.classList.add(POPUP_FEATURE_CONTENT_LOADING);
        popupFeatureContentLoading.innerHTML = getLoadingContent();

        loadingWrapper.append(controlsDiv, popupFeatureContentLoading);
        this.popup.setDOMContent(loadingWrapper);

        getContent(id, properties).then((content) => {
            const wrapper = document.createElement('div');

            const popupFeatureContent = document.createElement('div');
            popupFeatureContent.classList.add(POPUP_FEATURE_CONTENT);
            popupFeatureContent.innerHTML = content;

            wrapper.append(controlsDiv, popupFeatureContent);
            this.popup.setDOMContent(wrapper);
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
            if (newDisplay === POPUP_DISPLAY.sidebar) {
                let anchor: LngLatLike | null = null;
                if (this.activeFeature && isSupportedGeometry(this.activeFeature.geometry)) {
                    anchor = this.getGeometryAnchor(this.activeFeature.geometry);
                }
                map.easeTo({
                    center: (anchor ?? this.lastClickLngLat) as LngLatLike,
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

    private handleCustomFeatureClick(
        map: Map,
        point: MapMouseEvent['point'],
        onFeatureClick: OnFeatureClick
    ) {
        /*
         * Get features close to the click area.
         * We ask for features that are not in base style layers and for which a popup config is defined.
         */
        const { callback, layers } = onFeatureClick;
        const features = map.queryRenderedFeatures(point, { layers });
        return callback(features);
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
    private handlePopupAfterMapClick(
        map: Map,
        point: MapMouseEvent['point'],
        clickLngLat?: LngLatLike
    ) {
        /*
         * Get features close to the click area.
         * We ask for features that are not in base style layers and for which a popup config is defined.
         */
        const features = map.queryRenderedFeatures(point, {
            layers: Object.keys(this.popupConfigurationByLayers),
        });

        // Removing feature state for the obsolete active feature.
        this.unhighlightFeature(this.activeFeature);
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
            this.availableFeaturesOnClick = [];
            this.lastClickLngLat = null;
            return;
        }

        // FIXME: remove eslint comment.
        // eslint-disable-next-line prefer-destructuring
        this.activeFeature = features[0];
        this.availableFeaturesOnClick = features;
        const { geometry } = this.activeFeature;

        if (!isSupportedGeometry(geometry)) {
            return;
        }
        if (!this.popup.isOpen()) {
            this.popup.addTo(map);
        }
        this.lastClickLngLat = clickLngLat ?? map.unproject(point);
        if (this.lastClickLngLat) {
            this.popup.setLngLat(this.lastClickLngLat);
        } else {
            const anchor = this.getGeometryAnchor(geometry);
            if (anchor) this.popup.setLngLat(anchor);
        }

        this.updatePopupContent();
        this.updatePopupDisplay();
        this.highlightFeature(this.activeFeature);
    }

    /**
     * Check if all specified controls exist on the map.
     */
    private hasAllControls(map: Map) {
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
        this.map = new MaplibreGl.Map({ style, container, ...options });
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
        this.availableFeaturesOnClick = [];
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

    updateClickHandler(handler?: OnFeatureClick) {
        if (handler) {
            this.onFeatureClick = handler;
        }
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
    setPopupConfigurationByLayers(config: PopupConfigurationByLayers) {
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
            this.unhighlightFeature(this.activeFeature);
            this.onPopupDisplayUpdate(this.activePopupDisplay, null);
            this.activePopupDisplay = null;
            this.activeFeature = null;
            this.lastClickLngLat = null;
        });
    }
}
