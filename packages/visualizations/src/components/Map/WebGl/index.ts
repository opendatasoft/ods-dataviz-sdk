/* eslint-disable max-classes-per-file */
import type { DataFrame } from '../../types';
import type { ChoroplethOptions } from '../types';
import ChoroplethGeoJsonImpl from './ChoroplethGeoJson.svelte';
import ChoroplethVectorTilesImpl from './ChoroplethVectorTiles.svelte';
import SvelteImpl from '../../SvelteImpl';

import 'maplibre-gl/dist/maplibre-gl.css';

export class GeoJsonChoropleth extends SvelteImpl<DataFrame, ChoroplethOptions> {
    protected getSvelteComponentClass(): typeof ChoroplethGeoJsonImpl {
        return ChoroplethGeoJsonImpl;
    }
}

export class VectorTilesChoropleth extends SvelteImpl<DataFrame, ChoroplethOptions> {
    protected getSvelteComponentClass(): typeof ChoroplethVectorTilesImpl {
        return ChoroplethVectorTilesImpl;
    }
}
