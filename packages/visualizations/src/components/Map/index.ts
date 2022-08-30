import type { DataFrame } from '../types';
import type { ChoroplethOptions } from './types';
import ChoroplethImpl from './Choropleth.svelte';
import SVGChoroplethImpl from './SVGChoropleth.svelte';
import SvelteImpl from '../SvelteImpl';

import 'maplibre-gl/dist/maplibre-gl.css';

export default class Choropleth extends SvelteImpl<DataFrame, ChoroplethOptions> {
    protected getSvelteComponentClass(): typeof ChoroplethImpl {
        return ChoroplethImpl;
    }
}

export class SVGChoropleth extends SvelteImpl<DataFrame, ChoroplethOptions> {
    protected getSvelteComponentClass(): typeof SVGChoroplethImpl {
        return SVGChoroplethImpl;
    }
}
