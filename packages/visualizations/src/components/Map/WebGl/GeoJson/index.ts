import type { DataFrame } from '../../../types';
import type { ChoroplethOptions } from '../../types';
import ChoroplethImpl from './Choropleth.svelte';
import SvelteImpl from '../../../SvelteImpl';

import 'maplibre-gl/dist/maplibre-gl.css';

export default class GeoJsonChoropleth extends SvelteImpl<DataFrame, ChoroplethOptions> {
    protected getSvelteComponentClass(): typeof ChoroplethImpl {
        return ChoroplethImpl;
    }
}
