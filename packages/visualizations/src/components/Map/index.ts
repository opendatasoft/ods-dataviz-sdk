import type { DataFrame } from '../types';
import type { ChoroplethOptions } from './types';
import ChoroplethImpl from './Choropleth.svelte';
import SvgChoroplethImpl from './SvgChoropleth.svelte';
import SvelteImpl from '../SvelteImpl';

import 'maplibre-gl/dist/maplibre-gl.css';

export default class Choropleth extends SvelteImpl<DataFrame, ChoroplethOptions> {
    protected getSvelteComponentClass(): typeof ChoroplethImpl {
        return ChoroplethImpl;
    }
}

export class SvgChoropleth extends SvelteImpl<DataFrame, ChoroplethOptions> {
    protected getSvelteComponentClass(): typeof SvgChoroplethImpl {
        return SvgChoroplethImpl;
    }
}
