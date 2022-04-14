import type { ChoroplethOptions, DataFrame } from '../types';
import ChoroplethImpl from './Choropleth.svelte';
import SvelteImpl from '../SvelteImpl';

import 'maplibre-gl/dist/maplibre-gl.css';

export default class Choropleth extends SvelteImpl<DataFrame, ChoroplethOptions> {
    protected getSvelteComponentClass(): typeof ChoroplethImpl {
        return ChoroplethImpl;
    }
}