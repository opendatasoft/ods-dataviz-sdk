// Adapted from https://github.com/mapbox/geojson-rewind/issues/38
declare module '@mapbox/geojson-rewind' {
    // eslint-disable-next-line import/no-extraneous-dependencies
    import { FeatureCollection } from 'geojson';

    export default function rewind(
        geojson: FeatureCollection | null,
        clockwise: boolean
    ): FeatureCollection | null;
};
