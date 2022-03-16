import chroma from 'chroma-js';
import geoViewport from '@mapbox/geo-viewport';

export const colorShapes = (geoJson, values, colorScale) => {
    // Key in the values is "x"
    // Key in the shapes is "key"
    // We add a color property in the JSON
    const rawValues = values.map((v) => v.y);
    const min = Math.min(...rawValues);
    const max = Math.max(...rawValues);

    // For now the colorscale is a single color, and we build a scale from it. TBD
    const colorMin = chroma(colorScale).darken(4).hex();
    const colorMax = chroma(colorScale).brighten(4).hex();

    const scale = chroma.scale([colorMin, colorMax]).domain([min, max]);

    const dataMapping = {};
    values.forEach((v) => {
        dataMapping[v.x] = v.y;
    });

    // Iterate shapes, compute color from matching value
    const coloredFeatures = geoJson.features.map((feature) => {
        const shapeMapping = feature.properties.key;
        const value = dataMapping[shapeMapping]; // FIXME: beware of int/string differences in keys
        const color = scale(value).hex();

        return {
            ...feature,
            properties: {
                ...feature.properties,
                color,
            },
        };
    });
    return {
        type: 'FeatureCollection',
        features: coloredFeatures,
    };
};

export const mapKeyToColor = (values, colorScale) => {
    const rawValues = values.map((v) => v.y);
    const min = Math.min(...rawValues);
    const max = Math.max(...rawValues);

    const colorMin = chroma(colorScale).darken(4).hex();
    const colorMax = chroma(colorScale).brighten(4).hex();

    const scale = chroma.scale([colorMin, colorMax]).domain([min, max]);

    const mapping = {};

    values.forEach((v) => {
        mapping[v.x] = scale(v.y).hex();
    });

    return mapping;
};

// This is a default bound that will be extended
const VOID_BOUNDS = [180, 90, -180, -90];

function computeBboxFromCoords(coordsPath, bbox) {
    return coordsPath.reduce(
        (current, coords) => [
            Math.min(coords[0], current[0]),
            Math.min(coords[1], current[1]),
            Math.max(coords[0], current[2]),
            Math.max(coords[1], current[3]),
        ],
        bbox
    );
}

// Because features come from tiled vector data, feature geometries may be split
// or duplicated across tile boundaries. As a result, features may appear
// multiple times in query results.
// To prevent looping on duplicated features in computeMaxZoomFromGeoJsonFeatures we merge
// bounding boxes of same key features
function mergeBboxFromFeaturesWithSameKey(features) {
    const uniqueIds = [];
    const mergedBboxesArray = [];
    features.forEach((feature) => {
        // FIXME: supports only shapes for now
        if (feature.geometry.type === 'Polygon') {
            // Compute extent first
            let bbox = VOID_BOUNDS;
            const id = feature.properties.key;
            if (!uniqueIds.includes(id)) {
                uniqueIds.push(id);
                feature.geometry.coordinates.forEach((coordsPath) => {
                    bbox = computeBboxFromCoords(coordsPath, bbox);
                });
                mergedBboxesArray.push(bbox);
            } else {
                feature.geometry.coordinates.forEach((coordsPath) => {
                    bbox = computeBboxFromCoords(coordsPath, bbox);
                });
                const storedBbox = mergedBboxesArray[uniqueIds.indexOf(id)];
                const mergedBbox = [
                    Math.min(bbox[0], storedBbox[0]),
                    Math.min(bbox[1], storedBbox[1]),
                    Math.max(bbox[2], storedBbox[2]),
                    Math.max(bbox[3], storedBbox[3]),
                ];
                // Replace the Features at the right index by the merged bbox
                mergedBboxesArray[uniqueIds.indexOf(id)] = mergedBbox;
            }
        }
    });
    return mergedBboxesArray;
}

export const computeBoundingBoxFromGeoJsonFeatures = (features) => {
    // From an array of geojson objects
    let bbox = VOID_BOUNDS;

    features.forEach((feature) => {
        // FIXME: supports only shapes for now
        if (feature.geometry.type !== 'Polygon') {
            return;
        }
        feature.geometry.coordinates.forEach((coordsPath) => {
            bbox = computeBboxFromCoords(coordsPath, bbox);
        });
    });
    return bbox;
};

export const computeMaxZoomFromGeoJsonFeatures = (mapContainer, features) => {
    let maxZoom = 0; // maxZoom lowest value possible
    const FilteredBboxes = mergeBboxFromFeaturesWithSameKey(features);
    FilteredBboxes.forEach((boundingBox) => {
        // Vtiles = 512 tilesize
        maxZoom = Math.max(
            geoViewport.viewport(
                boundingBox,
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

export const getStartingPointForMap = (mapContainer, bbox) =>
    geoViewport.viewport(
        bbox,
        [mapContainer.clientWidth, mapContainer.clientHeight],
        undefined,
        undefined,
        512,
        true
    );
