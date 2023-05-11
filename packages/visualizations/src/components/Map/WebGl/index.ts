/* eslint-disable max-classes-per-file */
import type { DataFrame } from '../../types';
import type { ChoroplethGeoJsonOptions, ChoroplethVectorTilesOptions } from '../types';
import ChoroplethGeoJsonImpl from './ChoroplethGeoJson.svelte';
import ChoroplethVectorTilesImpl from './ChoroplethVectorTiles.svelte';
import SvelteImpl from '../../SvelteImpl';

import 'maplibre-gl/dist/maplibre-gl.css';

export class ChoroplethGeoJson extends SvelteImpl<DataFrame, ChoroplethGeoJsonOptions> {
    protected getSvelteComponentClass(): typeof ChoroplethGeoJsonImpl {
        return ChoroplethGeoJsonImpl;
    }
}

export class ChoroplethVectorTiles extends SvelteImpl<DataFrame, ChoroplethVectorTilesOptions> {
    protected getSvelteComponentClass(): typeof ChoroplethVectorTilesImpl {
        return ChoroplethVectorTilesImpl;
    }
}
