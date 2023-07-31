import type { PoiMapData, PoiMapOptions } from './types';
import PoiGeoJsonImpl from './PoiGeoJson.svelte';
import SvelteImpl from '../SvelteImpl';

import 'maplibre-gl/dist/maplibre-gl.css';

export default class PoiGeoJson extends SvelteImpl<PoiMapData, PoiMapOptions> {
    protected getSvelteComponentClass(): typeof PoiGeoJsonImpl {
        return PoiGeoJsonImpl;
    }
}
