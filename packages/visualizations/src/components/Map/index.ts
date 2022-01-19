import type { MapOptions } from '../types';
import MapImpl from './Map.svelte';
import SvelteImpl from '../SvelteImpl';
// TODO Import maplibre CSS

export default class Map extends SvelteImpl<string, MapOptions> {
    protected getSvelteComponentClass(): typeof MapImpl {
        return MapImpl;
    }
}
