import chroma from "chroma-js";

export const computeBoundingBoxFromGeoJsonFeatures = geoJson => {
    // From an array of geojson objects
    let bbox = [ 
        Number.POSITIVE_INFINITY,
        Number.POSITIVE_INFINITY,
        Number.NEGATIVE_INFINITY,
        Number.NEGATIVE_INFINITY
    ];

    geoJson.features.forEach(feature => {
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

export const colorShapes = (geoJson, values) => {
    // Key in the values is "x"
    // Key in the shapes is "key"
    // We add a color property in the JSON
    const rawValues = values.map(v => v.y);
    const min = Math.min(...rawValues);
    const max = Math.max(...rawValues);

    const scale = chroma.scale(['red', 'blue']).domain([min, max]);

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