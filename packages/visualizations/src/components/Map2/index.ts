import type { ChoroplethOptions } from '../types';
import ChoroplethImpl from './Choropleth.svelte';
import SvelteImpl from '../SvelteImpl';

import 'maplibre-gl/dist/maplibre-gl.css';
// TODO Import maplibre CSS

export default class Choropleth extends SvelteImpl<string, ChoroplethOptions> {
    protected getSvelteComponentClass(): typeof ChoroplethImpl {
        return ChoroplethImpl;
    }
}