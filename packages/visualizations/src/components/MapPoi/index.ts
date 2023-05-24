import type { DataFrame } from '../types';
import type { PoiMapOptions } from './types';
import PoiGeoJsonImpl from './PoiGeoJson.svelte';
import SvelteImpl from '../SvelteImpl';

import 'maplibre-gl/dist/maplibre-gl.css';

export default class PoiGeoJson extends SvelteImpl<DataFrame, PoiMapOptions> {
    protected getSvelteComponentClass(): typeof PoiGeoJsonImpl {
        return PoiGeoJsonImpl;
    }
}
