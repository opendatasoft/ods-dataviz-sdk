import type { FeatureCollection } from 'geojson';
import type { PoiMapOptions } from './types';
import PoiGeoJsonImpl from './PoiGeoJson.svelte';
import SvelteImpl from '../SvelteImpl';

import 'maplibre-gl/dist/maplibre-gl.css';

export default class PoiGeoJson extends SvelteImpl<FeatureCollection, PoiMapOptions> {
    protected getSvelteComponentClass(): typeof PoiGeoJsonImpl {
        return PoiGeoJsonImpl;
    }
}
