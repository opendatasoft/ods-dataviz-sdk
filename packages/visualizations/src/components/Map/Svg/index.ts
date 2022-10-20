import type { DataFrame } from '../../types';
import type { ChoroplethOptions } from '../types';
import ChoroplethImpl from './Choropleth.svelte';
import SvelteImpl from '../../SvelteImpl';

export default class ChoroplethSvg extends SvelteImpl<DataFrame, ChoroplethOptions> {
    protected getSvelteComponentClass(): typeof ChoroplethImpl {
        return ChoroplethImpl;
    }
}
