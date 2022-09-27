import chroma from 'chroma-js';
import turfBbox from '@turf/bbox';
import maplibregl from 'maplibre-gl';
import geoViewport from '@mapbox/geo-viewport';
import type { FeatureCollection, Feature, Position, BBox } from 'geojson';
import type { Scale } from 'chroma-js';
import type { Color, ColorsScale } from '../types';
import type {
    ChoroplethDataValue,
    ChoroplethFixedTooltipDescription,
    MapRenderTooltipFunction,
} from './types';

export const LIGHT_GREY: Color = '#CBD2DB';
export const DARK_GREY: Color = '#515457';

const emptyFeatureCollection: FeatureCollection = {
    type: 'FeatureCollection',
    features: [],
};
export const EMPTY_GJ = {
    type: 'geojson',
    geoJson: emptyFeatureCollection,
};

export const DEFAULT_COLORSSCALE: ColorsScale = {
    type: 'gradient',
    colors: {
        start: LIGHT_GREY,
        end: DARK_GREY,
    },
};

export const colorShapes = (
    geoJson: FeatureCollection,
    values: ChoroplethDataValue[],
    colorsScale: ColorsScale,
    emptyValueColor: Color
): {
    geoJson: FeatureCollection;
    bounds: {
        min: number;
        max: number;
    };
} => {
    // Key in the values is "x"
    // Key in the shapes is "key"
    // We add a color property in the JSON
    const rawValues = values.map((v) => v.y);
    const min = Math.min(...rawValues);
    const max = Math.max(...rawValues);
    let colorMin: Color;
    let colorMax: Color;
    let scale: Scale;

    if (colorsScale?.type === 'palette') {
        const thresholdArray: number[] = [];
        colorsScale.colors.forEach((_color, i) => {
            if (i === 0) {
                thresholdArray.push(min);
                thresholdArray.push(min + (max - min) / colorsScale.colors.length);
            } else if (i === colorsScale.colors.length - 1) {
                thresholdArray.push(max);
            } else {
                thresholdArray.push(min + ((max - min) / colorsScale.colors.length) * (i + 1));
            }
        });
        scale = chroma.scale(colorsScale.colors).classes(thresholdArray);
    } else if (colorsScale?.type === 'gradient') {
        colorMin = chroma(colorsScale.colors.start).hex();
        colorMax = chroma(colorsScale.colors.end).hex();
        scale = chroma.scale([colorMin, colorMax]).domain([min, max]);
    }

    const dataMapping: { [key: ChoroplethDataValue['x']]: ChoroplethDataValue['y'] } = {};
    values.forEach((v) => {
        dataMapping[v.x] = v.y;
    });

    // Iterate shapes, compute color from matching value
    const coloredFeatures = geoJson.features.map((feature) => {
        const shapeMapping: string = feature.properties?.key;
        const value: number = dataMapping[shapeMapping]; // FIXME: beware of int/string differences in keys
        const color = value ? scale(value).hex() : emptyValueColor;

        return {
            ...feature,
            properties: {
                ...feature.properties,
                color,
            },
        };
    });
    return {
        geoJson: {
            type: 'FeatureCollection',
            features: coloredFeatures,
        },
        bounds: {
            min,
            max,
        },
    };
};

// This is a default bound that will be extended
const VOID_BOUNDS: BBox = [180, 90, -180, -90];

type CoordsPath = Position[];

function computeBboxFromCoords(coordsPath: CoordsPath, bbox: BBox): BBox {
    return coordsPath.reduce<BBox>(
        (current: BBox, coords: Position) => [
            Math.min(coords[0], current[0]),
            Math.min(coords[1], current[1]),
            Math.max(coords[0], current[2]),
            Math.max(coords[1], current[3]),
        ],
        bbox
    );
}

// The features given by querySourceFeatures are cut based on a tile representation
// but we need the bounding box of the features themselves, so we need to build them again
function mergeBboxFromFeaturesWithSameKey(features: Feature[]) {
    const mergedBboxes: {
        [key: string]: {
            bbox: BBox;
        };
    } = {};
    features.forEach((feature) => {
        // FIXME: supports only shapes for now
        if (feature.geometry.type === 'Polygon') {
            // Compute extent first
            let bbox = VOID_BOUNDS;
            feature.geometry.coordinates.forEach((coordsPath) => {
                bbox = computeBboxFromCoords(coordsPath, bbox);
            });
            const id: string = feature.properties?.key;
            if (!mergedBboxes[id]) {
                mergedBboxes[id] = {
                    bbox,
                };
            } else {
                const storedBbox = mergedBboxes[id].bbox;
                const mergedBbox: BBox = [
                    Math.min(bbox[0], storedBbox[0]),
                    Math.min(bbox[1], storedBbox[1]),
                    Math.max(bbox[2], storedBbox[2]),
                    Math.max(bbox[3], storedBbox[3]),
                ];
                // Replace the Features at the right id by the merged bbox
                mergedBboxes[id] = {
                    bbox: mergedBbox,
                };
            }
        }
    });
    return mergedBboxes;
}

// We're calculating the maximum zoom required to fit the smallest feature we're displaying, to prevent people from zooming "too far" by accident
export const computeMaxZoomFromGeoJsonFeatures = (
    mapContainer: HTMLElement,
    features: Feature[]
): number => {
    let maxZoom = 0; // maxZoom lowest value possible
    const filteredBboxes = mergeBboxFromFeaturesWithSameKey(features);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Object.values(filteredBboxes).forEach((value: any) => {
        // Vtiles = 512 tilesize
        maxZoom = Math.max(
            geoViewport.viewport(
                value.bbox,
                [mapContainer.clientWidth, mapContainer.clientHeight],
                undefined,
                undefined,
                512,
                true
            ).zoom,
            maxZoom
        );
    });
    return maxZoom;
};

const getShapeCenter = (feature: Feature) => {
    const featureBbox = turfBbox(feature.geometry);
    const centerLatitude = (featureBbox[1] + featureBbox[3]) / 2;
    const centerLongitude = (featureBbox[0] + featureBbox[2]) / 2;
    return [centerLongitude, centerLatitude];
};

export const getFixedTooltips = (
    shapeKeys: string[],
    features: Feature[],
    renderTooltip: MapRenderTooltipFunction
): ChoroplethFixedTooltipDescription[] => {
    const popups = shapeKeys.map((shapeKey) => {
        const matchedFeature = features.find((feature) => feature.properties?.key === shapeKey);
        if (matchedFeature) {
            const center = getShapeCenter(matchedFeature);
            const description = renderTooltip(matchedFeature);
            const popup = new maplibregl.Popup({
                closeOnClick: false,
                closeButton: false,
                className: 'tooltip-on-hover',
            });
            return { center, description, popup };
        }
        return null;
    });

    return popups.filter((item): item is NonNullable<ChoroplethFixedTooltipDescription> =>
        Boolean(item)
    ) as ChoroplethFixedTooltipDescription[];
};
