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

export const colorVectorLayer = (values, colorScale, keyField) => {
    const rawValues = values.map((v) => v.y);
    const min = Math.min(...rawValues);
    const max = Math.max(...rawValues);

    // For now the colorscale is a single color, and we build a scale from it. TBD
    const colorMin = chroma(colorScale).darken(4).hex();
    const colorMax = chroma(colorScale).brighten(4).hex();

    const scale = chroma.scale([colorMin, colorMax]).domain([min, max]);

    const dataMapping = {};
    values.forEach((v) => {
        dataMapping[v.x] = scale(v.y).hex();
    });

    const matchExpression = [
        'match',
        ['get', keyField],
    ];
    Object.entries(dataMapping).forEach(e => matchExpression.push(...e));
    matchExpression.push('#ffffff'); // Default fallback color

    return {
        type: 'fill',
        layout: {},
        paint: {
            'fill-color': matchExpression,
            'fill-opacity': 0.8,
            'fill-outline-color': '#000',
        }
    }
}

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

// The features given by querySourceFeatures are cut based on a tile representation
// but we need the bounding box of the features themselves, so we need to build them again
function mergeBboxFromFeaturesWithSameKey(features) {
    const mergedBboxes = {};
    features.forEach((feature) => {
        // FIXME: supports only shapes for now
        if (feature.geometry.type === 'Polygon') {
            // Compute extent first
            let bbox = VOID_BOUNDS;
            feature.geometry.coordinates.forEach((coordsPath) => {
                bbox = computeBboxFromCoords(coordsPath, bbox);
            });
            const id = feature.properties.key;
            if (!mergedBboxes[id]) {
                mergedBboxes[id] = {
                    bbox,
                };
            } else {
                const storedBbox = mergedBboxes[id].bbox;
                const mergedBbox = [
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

// We're calculating the maximum zoom required to fit the smallest feature we're displaying, to prevent people from zooming "too far" by accident
export const computeMaxZoomFromGeoJsonFeatures = (mapContainer, features) => {
    let maxZoom = 0; // maxZoom lowest value possible
    const filteredBboxes = mergeBboxFromFeaturesWithSameKey(features);
    Object.values(filteredBboxes).forEach((value) => {
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

export const getStartingPointForMap = (mapContainer, bbox) =>
    geoViewport.viewport(
        bbox,
        [mapContainer.clientWidth, mapContainer.clientHeight],
        undefined,
        undefined,
        512,
        true
    );
