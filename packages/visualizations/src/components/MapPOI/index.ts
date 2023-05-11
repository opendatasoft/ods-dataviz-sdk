import type { DataFrame } from '../types';
import type { POIMapOptions } from './types';
import POIGeoJsonImpl from './POIGeoJson.svelte';
import SvelteImpl from '../SvelteImpl';

import 'maplibre-gl/dist/maplibre-gl.css';

export default class POIGeoJson extends SvelteImpl<DataFrame, POIMapOptions> {
    protected getSvelteComponentClass(): typeof POIGeoJsonImpl {
        return POIGeoJsonImpl;
    }
}
