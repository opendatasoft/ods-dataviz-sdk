import { debounce } from 'lodash';
import type { BBox } from 'geojson';
import type { LngLatLike,  LngLatBoundsLike, Map, NavigationControl, SourceSpecification, FilterSpecification } from 'maplibre-gl';
import type { MapLayer } from '../types';

const defaultCenter: LngLatLike = [3.5, 46];
export const baseOptions = {
    center: defaultCenter,
    zoom: 5,
    renderWorldCopies: false,
};

export const initializeResizer = ({
    container,
    onResize,
}: { 
    container: HTMLElement, 
    onResize: () => void
}) => {
    // Set a resizeObserver to resize map on container size changes
    const resizer = new ResizeObserver(
        debounce(onResize, 100)
    );
    resizer.observe(container);
    // Disconnect the resize onDestroy
    return () => resizer?.disconnect();
};


const setBbox = (map: Map) => (box: BBox | undefined) => {
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
    map.setMaxBounds(map.getBounds());
};

/** Add navigation control to map */
const addNav = (map: Map) => (nav: NavigationControl) => {
    if (!map.hasControl(nav)) {
        map.addControl(nav, 'top-right');
    }
};

/** Remove navigation control from map */
const removeNav = (map: Map) => (nav: NavigationControl) => {
    if (map.hasControl(nav)) {
        map.removeControl(nav);
    }
};

/** Enable all user interaction handlers
Another way to disable all user handlers is to pass the option interactive = false on map creation
But it doesn't allow to change it afterwards
Id est it forces you to recreate another map if you want to change that option */
const addInteractivity = (map: Map) => {
    map.boxZoom.enable();
    map.doubleClickZoom.enable();
    map.dragPan.enable();
    map.dragRotate.enable();
    map.keyboard.enable();
    map.scrollZoom.enable();
    map.touchZoomRotate.enable();
};

/** isable all user interaction handlers */
const blockInteractivity = (map: Map) => {
    map.boxZoom.disable();
    map.doubleClickZoom.disable();
    map.dragPan.disable();
    map.dragRotate.disable();
    map.keyboard.disable();
    map.scrollZoom.disable();
    map.touchZoomRotate.disable();
};

const showToolipOnMouse = (map: Map) => ({
    layerId,
    addTooltip,
    removeTooltip,
}: {
    layerId: string,
    addTooltip: () => void,
    removeTooltip: () => void,
}) => {
    map.on('mousemove', layerId, addTooltip);
    map.on('mouseleave', layerId, removeTooltip);
};

const showToolipOffMouse = (map: Map) => ({
    layerId,
    addTooltip,
    removeTooltip,
}: {
    layerId: string,
    addTooltip: () => void,
    removeTooltip: () => void,
}) => {
    map.off('mousemove', layerId, addTooltip);
    map.off('mouseleave', layerId, removeTooltip);
};

const addSource = (map: Map) => ({
    sourceId,
    source,
}:{
    sourceId: string,
    source: SourceSpecification
}) => {
    // if (map.getSource(sourceId)) {
    //     map.removeSource(sourceId);
    // }

    map.addSource(sourceId, source);
};

const addLayer = (map: Map) => ({
    layerId,
    sourceId,
    layer,
}: {
    layerId: string,
    sourceId: string,
    layer: MapLayer
}) => {
    if (map.getLayer(layerId)) {
        map.removeLayer(layerId);
    }

    map.addLayer({
        ...layer,
        id: layerId,
        source: sourceId,
    });
};

const setFilter = (map: Map) => ({
    layerId,
    filterExpression,
}: {
    layerId: string,
    filterExpression: FilterSpecification
}) => {
    if(filterExpression) {
        map.setFilter(layerId, filterExpression);
    }
};



export const buildPublicInterface = (map: Map) => ({
    setBbox: setBbox(map),
    addNav: addNav(map),
    removeNav: removeNav(map),
    addInteractivity: addInteractivity(map),
    blockInteractivity: blockInteractivity(map),
    showToolipOnMouse: showToolipOnMouse(map),
    showToolipOffMouse: showToolipOffMouse(map),
    addSource: addSource(map),
    addLayer: addLayer(map),
    setFilter: setFilter(map),
});

export type MapPublicInterface = ReturnType<typeof buildPublicInterface>;