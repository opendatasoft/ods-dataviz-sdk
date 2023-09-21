import type { BBox } from 'geojson';
import { debounce } from 'lodash';
import maplibregl, {
    LngLatBoundsLike,
    LngLatLike,
    MapOptions,
    StyleSpecification,
} from 'maplibre-gl';

type MapFunction = (map: maplibregl.Map) => unknown;

const DEFAULT_CENTER: LngLatLike = [3.5, 46];

export default class MapPOI {
    private map: maplibregl.Map | null = null;

    private mapResizeObserver: ResizeObserver | null = null;

    private isReady = false;

    private baseStyle: StyleSpecification | null = null;

    private queuedFunctions: Array<MapFunction> = [];

    private navigation = new maplibregl.NavigationControl({ showCompass: false });

    private queue(fn: MapFunction) {
        if (this.isReady && this.map) fn(this.map);
        else this.queuedFunctions.push(fn);
    }

    private enqueue(map: maplibregl.Map) {
        this.queuedFunctions.forEach((fn) => fn(map));
        this.queuedFunctions = [];
    }

    private initializeMapResizer(map: maplibregl.Map, container: HTMLElement) {
        // Set a resizeObserver to resize map on container size changes
        this.mapResizeObserver = new ResizeObserver(
            debounce(() => {
                map.resize();
            }, 100)
        );
        this.mapResizeObserver.observe(container);
    }

    initialize(
        style: MapOptions['style'],
        container: HTMLElement,
        options: Omit<MapOptions, 'style' | 'container'>
    ) {
        this.map = new maplibregl.Map({ style, container, center: DEFAULT_CENTER, ...options });

        this.queue((map) => this.initializeMapResizer(map, container));

        this.map.on('load', () => {
            this.isReady = true;
            // Store base style after the first loads
            if (this.map) {
                this.baseStyle = this.map?.getStyle();
                this.enqueue(this.map);
            }
        });
    }

    destroy() {
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

    toggleInteractivity(interaction: 'enable' | 'disable') {
        this.queue((map) => {
            map.boxZoom[interaction]();
            map.doubleClickZoom[interaction]();
            map.dragPan[interaction]();
            map.dragRotate[interaction]();
            map.keyboard[interaction]();
            map.scrollZoom[interaction]();
            map.touchZoomRotate[interaction]();

            const hasNavigation = map.hasControl(this.navigation);

            if (interaction === 'disable' && hasNavigation) {
                map.removeControl(this.navigation);
            }
            if (!hasNavigation && interaction === 'enable') {
                map.addControl(this.navigation, 'top-right');
            }
        });
    }
}
