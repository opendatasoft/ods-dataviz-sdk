import type { BBox } from 'geojson';
import maplibregl, {
    LngLatBoundsLike,
    LngLatLike,
    MapGeoJSONFeature,
    MapLayerMouseEvent,
    MapOptions,
    StyleSpecification,
} from 'maplibre-gl';

import { DEFAULT_MAP_CENTER, POPUP_OPTIONS } from './constants';
import type { PopupsConfiguration } from './types';

type MapFunction = (map: maplibregl.Map) => unknown;

export default class MapPOI {
    /** The Map object representing the maplibregl.Map instance. */
    private map: maplibregl.Map | null = null;

    /** Flag indicating whether the map is ready. */
    private isReady = false;

    /** The base style of the map */
    private baseStyle: StyleSpecification | null = null;

    /** Array of layer IDs that are not from the base style of the map */
    private layerIds: string[] = [];

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

    /** Event handler for popup close event. */
    private onPopupClose() {
        this.popupFeatures.forEach(({ source, sourceLayer, id }) => {
            this.queue((map) => {
                map.setFeatureState({ source, sourceLayer, id }, { 'popup-feature': false });
            });
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

        // If no popup configuration for a layer, we remove the popup
        if (!popupConfiguration) {
            this.popup.remove();
            this.popupFeatures = [];
            return;
        }

        const { display, getContent } = popupConfiguration;
        this.popup
            .setLngLat(geometry.coordinates.slice() as LngLatLike)
            .setHTML(getContent(featureId, properties))
            .addTo(map);

        const classnameModifier = display === 'sidebar' ? 'addClassName' : 'removeClassName';
        this.popup[classnameModifier](`${POPUP_OPTIONS.className}--as-sidebar`);

        if (featureId) {
            map.setFeatureState({ source, sourceLayer, id: featureId }, { 'popup-feature': true });
        }
    }

    initialize(
        style: MapOptions['style'],
        container: HTMLElement,
        options: Omit<MapOptions, 'style' | 'container'>
    ) {
        this.map = new maplibregl.Map({ style, container, center: DEFAULT_MAP_CENTER, ...options });
        this.map.on('load', () => {
            this.isReady = true;
            if (this.map) {
                // Store base style after the first load
                this.baseStyle = this.map?.getStyle();
                this.map.on('click', this.bindedOnClick);
                this.popup.on('close', this.bindedOnPopupClose);
                this.enqueue(this.map);
            }
        });
    }

    remove() {
        this.queue((map) => map.remove());
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

    setPopupsConfiguration(config: PopupsConfiguration) {
        this.popupsConfiguration = config;
        this.queue((map) => this.setPopup(map));
    }

    toggleInteractivity(interaction: 'enable' | 'disable') {
        this.queue((map) => {
            map.boxZoom[interaction]();
            map.doubleClickZoom[interaction]();
            map.dragPan[interaction]();
            map.dragRotate[interaction]();
            map.keyboard[interaction]();
            map.scrollZoom[interaction]();
            map.touchZoomRotate[interaction]();

            const hasControl = map.hasControl(this.navigationControl);

            if (interaction === 'disable') {
                this.popup.remove();
                map.off('click', this.bindedOnClick);
                if (hasControl) {
                    map.removeControl(this.navigationControl);
                }
            }
            if (interaction === 'enable') {
                if (!hasControl) {
                    map.addControl(this.navigationControl, 'top-right');
                }
                map.on('click', this.bindedOnClick);
            }
        });
    }
}
