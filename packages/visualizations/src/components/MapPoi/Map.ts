import type { BBox } from 'geojson';
import maplibregl, {
    LngLatBoundsLike,
    LngLatLike,
    MapOptions,
    StyleSpecification,
} from 'maplibre-gl';

type MapFunction = () => unknown;

const DEFAULT_CENTER: LngLatLike = [3.5, 46];

export default class MapPOI {
    map: maplibregl.Map | null = null;

    isReady = false;

    queuedFunctions: Array<MapFunction> = [];

    navigation = new maplibregl.NavigationControl({ showCompass: false });

    initialize(
        style: StyleSpecification,
        container: HTMLElement,
        options: Omit<MapOptions, 'style' | 'container'>
    ) {
        this.map = new maplibregl.Map({ style, container, center: DEFAULT_CENTER, ...options });
        this.map.on('load', () => {
            this.isReady = true;
            this.enqueue();
        });
    }

    queue(fn: MapFunction) {
        if (this.isReady) fn();
        else this.queuedFunctions.push(fn);
    }

    enqueue() {
        this.queuedFunctions.forEach((fn) => fn());
        this.queuedFunctions = [];
    }

    remove() {
        this.map?.remove();
    }

    setStyle(style: StyleSpecification) {
        this.queue(() => this.map?.setStyle(style));
    }

    setBbox(bbox?: BBox) {
        this.queue(() => {
            if (!bbox) {
                // zoom-out to bounds defined in the initialization
                this.map?.setZoom(this.map?.getMinZoom());
                return;
            }

            // Cancel any saved max bounds to properly fitBounds
            this.map?.setMaxBounds(null);
            // Using padding, keep enough room for controls (zoom) to make sure they don't hide anything
            this.map?.fitBounds(bbox as LngLatBoundsLike, {
                animate: false,
                padding: 40,
            });
        });
    }

    toggleInteractivity(interaction: 'enable' | 'disable') {
        this.queue(() => {
            this.map?.boxZoom[interaction]();
            this.map?.doubleClickZoom[interaction]();
            this.map?.dragPan[interaction]();
            this.map?.dragRotate[interaction]();
            this.map?.keyboard[interaction]();
            this.map?.scrollZoom[interaction]();
            this.map?.touchZoomRotate[interaction]();

            const hasNavigation = this.map?.hasControl(this.navigation);

            if (interaction === 'disable' && hasNavigation) {
                this.map?.removeControl(this.navigation);
            }
            if (!hasNavigation && interaction === 'enable') {
                this.map?.addControl(this.navigation, 'top-right');
            }
        });
    }
}
