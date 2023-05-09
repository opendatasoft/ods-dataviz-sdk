import type { DataFrame } from '../types';
import type { POIMapOptionsB } from './types';
import POIGeoJsonImpl from './POIGeoJson.svelte';
import SvelteImpl from '../SvelteImpl';

import 'maplibre-gl/dist/maplibre-gl.css';

export default class POIGeoJson extends SvelteImpl<DataFrame, POIMapOptionsB> {
    protected getSvelteComponentClass(): typeof POIGeoJsonImpl {
        return POIGeoJsonImpl;
    }
}
