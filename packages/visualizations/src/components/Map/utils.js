import { BLANK } from './mapStyles';
import chroma from "chroma-js";
import geoViewport from "@mapbox/geo-viewport";

export function basemapConfigToStyle(basemapStyle) {
    return basemapStyle || BLANK;
}

export const colorShapes = (geoJson, values, colorScale) => {
    // Key in the values is "x"
    // Key in the shapes is "key"
    // We add a color property in the JSON
    const rawValues = values.map(v => v.y);
    const min = Math.min(...rawValues);
    const max = Math.max(...rawValues);

    // For now the colorscale is a single color, and we build a scale from it. TBD
    const colorMin = chroma(colorScale).darken(4).hex();
    const colorMax = chroma(colorScale).brighten(4).hex();

    const scale = chroma.scale([colorMin, colorMax]).domain([min, max]);

    const dataMapping = {};
    values.forEach(v => {
        dataMapping[v.x] = v.y;
    })

    // Iterate shapes, compute color from matching value
    const coloredFeatures = geoJson.features.map(feature => {
        const shapeMapping = feature.properties.key;
        const value = dataMapping[shapeMapping]; // FIXME: beware of int/string differences in keys
        const color = scale(value).hex();

        return {
            ...feature,
            properties: {
                ...feature.properties,
                color
            }
        }
    })
    return {
        type: 'FeatureCollection',
        features: coloredFeatures,
    };
}

export const mapKeyToColor = (values, colorScale) => {
    const rawValues = values.map(v => v.y);
    const min = Math.min(...rawValues);
    const max = Math.max(...rawValues);

    const colorMin = chroma(colorScale).darken(4).hex();
    const colorMax = chroma(colorScale).brighten(4).hex();

    const scale = chroma.scale([colorMin, colorMax]).domain([min, max]);

    const mapping = {};
    
    values.forEach(v => {
        mapping[v.x] = scale(v.y).hex();
    });

    return mapping;
}

export const computeBoundingBoxFromGeoJsonFeatures = features => {
    // From an array of geojson objects
    let bbox = [ 
        Number.POSITIVE_INFINITY,
        Number.POSITIVE_INFINITY,
        Number.NEGATIVE_INFINITY,
        Number.NEGATIVE_INFINITY
    ];

    features.forEach(feature => {
        // FIXME: supports only shapes for now
        if (feature.geometry.type !== 'Polygon') {
            return;
        }
        feature.geometry.coordinates.forEach(coordsPath => {
            bbox = coordsPath.reduce((current, coords) => {
                return [
                    Math.min(coords[0], current[0]),
                    Math.min(coords[1], current[1]),
                    Math.max(coords[0], current[2]),
                    Math.max(coords[1], current[3])
                ]
            }, bbox);
        });
    });

    return bbox;
}

export const computeMaxZoomFromGeoJsonFeatures = (mapContainer, features) => {
    let maxZoom = Number.NEGATIVE_INFINITY;
    features.forEach(feature => {
        // Compute extent first
        let bbox = [ 
            Number.POSITIVE_INFINITY,
            Number.POSITIVE_INFINITY,
            Number.NEGATIVE_INFINITY,
            Number.NEGATIVE_INFINITY
        ];

        feature.geometry.coordinates.forEach(coordsPath => {
            bbox = coordsPath.reduce((current, coords) => {
                return [
                    Math.min(coords[0], current[0]),
                    Math.min(coords[1], current[1]),
                    Math.max(coords[0], current[2]),
                    Math.max(coords[1], current[3])
                ]
            }, bbox);
        });

        // FIXME: passe the real dimensions of the map, not [500, 500]
        // Vtiles = 512 tilesize
        maxZoom = Math.max(geoViewport.viewport(bbox, [mapContainer.clientWidth, mapContainer.clientHeight], undefined, undefined, 512, true).zoom, maxZoom);
    });
    return maxZoom;
}

export const getStartingPointForMap = (mapContainer, bbox) => {
    return geoViewport.viewport(bbox, [mapContainer.clientWidth, mapContainer.clientHeight], undefined, undefined, 512, true);
}