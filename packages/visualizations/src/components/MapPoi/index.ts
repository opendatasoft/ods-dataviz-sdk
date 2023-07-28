import type { PoiMapData, PoiMapOptions } from './types';
import MapImpl from './Map.svelte';
import SvelteImpl from '../SvelteImpl';

import 'maplibre-gl/dist/maplibre-gl.css';

export default class Map extends SvelteImpl<PoiMapData, PoiMapOptions> {
    protected getSvelteComponentClass(): typeof MapImpl {
        return MapImpl;
    }
}
