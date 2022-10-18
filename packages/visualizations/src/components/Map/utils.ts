import chroma from 'chroma-js';
import turfBbox from '@turf/bbox';
import maplibregl from 'maplibre-gl';
import geoViewport from '@mapbox/geo-viewport';
import type { Feature, FeatureCollection, Position, BBox } from 'geojson';
import type { Scale } from 'chroma-js';
import { DEFAULT_COLORS } from './constants';
import { assertUnreachable } from '../utils';
import { ColorScaleTypes, GradientScale } from '../types';
import type { Color, ColorScale, DataBounds } from '../types';
import type {
    ChoroplethDataValue,
    ChoroplethFixedTooltipDescription,
    MapRenderTooltipFunction,
    ChoroplethShapeValues,
    ChoroplethShapeVectorTilesValue,
} from './types';

export const LIGHT_GREY: Color = '#CBD2DB';
export const DARK_GREY: Color = '#515457';

export const EMPTY_FC: FeatureCollection = {
    type: 'FeatureCollection',
    features: [],
};

export const DEFAULT_COLORSCALE: GradientScale = {
    type: ColorScaleTypes.Gradient,
    colors: {
        start: LIGHT_GREY,
        end: DARK_GREY,
    },
};

export function getDataBounds(values: ChoroplethDataValue[]): DataBounds {
    const rawValues = values.map((v) => v.y);
    const min = Math.min(...rawValues);
    const max = Math.max(...rawValues);
    return { min, max };
}

export const colorShapes = ({
    featureCollection,
    colorMapping,
}: {
    featureCollection: FeatureCollection;
    colorMapping: { [key: string]: Color };
}) => {
    const coloredFeatures = featureCollection.features.map((feature: Feature) => {
        const color = colorMapping[feature?.properties?.key];
        return {
            ...feature,
            properties: {
                ...feature.properties,
                color,
            },
        };
    });
    const coloredShapes: FeatureCollection = {
        type: 'FeatureCollection',
        features: coloredFeatures,
    };
    return coloredShapes;
};

export const mapKeyToColor = (
    values: ChoroplethDataValue[],
    dataBounds: DataBounds,
    colorScale: ColorScale,
    emptyValueColor: Color = DEFAULT_COLORS.Default
): { [s: string]: string } => {
    const { min, max } = dataBounds;
    let colorMin: Color;
    let colorMax: Color;
    let scale: Scale;

    // This is an exhaustive check, function must handle all color scale types
    switch (colorScale.type) {
        case ColorScaleTypes.Palette:
            const thresholdArray: number[] = []; // eslint-disable-line no-case-declarations
            colorScale.colors.forEach((_color: Color, i: number) => {
                if (i === 0) {
                    thresholdArray.push(min);
                    thresholdArray.push(min + (max - min) / colorScale.colors.length);
                } else if (i === colorScale.colors.length - 1) {
                    thresholdArray.push(max);
                } else {
                    thresholdArray.push(min + ((max - min) / colorScale.colors.length) * (i + 1));
                }
            });
            scale = chroma.scale(colorScale.colors).classes(thresholdArray);
            break;
        case ColorScaleTypes.Gradient:
            colorMin = chroma(colorScale.colors.start).hex();
            colorMax = chroma(colorScale.colors.end).hex();
            scale = chroma.scale([colorMin, colorMax]).domain([min, max]);
            break;
        default: {
            // This function should never be reached because of the exhaustive check (will throw a compilation error)
            const exhaustiveCheck: never = colorScale;
            assertUnreachable(exhaustiveCheck);
        }
    }

    const dataMapping: { [s: ChoroplethDataValue['x']]: Color } = {};
    values.forEach(({ x, y }) => {
        dataMapping[x] = y ? scale(y).hex() : emptyValueColor;
    });
    return dataMapping;
};

// This is a default bound that will be extended
export const VOID_BOUNDS: BBox = [180, 90, -180, -90];

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
function mergeBboxFromFeaturesWithSameKey(features: Feature[], matchKey: string) {
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
            const id: string = feature.properties?.[matchKey];
            if (!mergedBboxes[id]) {
                mergedBboxes[id] = { bbox };
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
    features: Feature[],
    matchKey: string
): number => {
    let maxZoom = 0; // maxZoom lowest value possible
    const filteredBboxes = mergeBboxFromFeaturesWithSameKey(features, matchKey);
    // FIXME: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Object.values(filteredBboxes).forEach((value: any) => {
        // Vtiles = 512 tile size
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
    renderTooltip: MapRenderTooltipFunction,
    matchKey: string
): ChoroplethFixedTooltipDescription[] => {
    const popups = shapeKeys.map((shapeKey) => {
        const matchedFeature = features.find(
            (feature) => feature.properties?.[matchKey] === shapeKey
        );
        if (matchedFeature) {
            const center = getShapeCenter(matchedFeature);
            const description = renderTooltip(matchedFeature);
            // Cancel the debounce on activeShapes
            renderTooltip.cancel();
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

export const isVectorTile = (
    shape: ChoroplethShapeValues
): shape is ChoroplethShapeVectorTilesValue =>
    (shape as ChoroplethShapeVectorTilesValue).layer !== undefined &&
    (shape as ChoroplethShapeVectorTilesValue).key !== undefined;
