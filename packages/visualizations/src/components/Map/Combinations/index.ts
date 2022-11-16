import type { DataFrame } from '../../types';
import type { NavigableChoroplethOptions } from '../types';
import NavigableMapImpl from './NavigableMap.svelte';
import SvelteImpl from '../../SvelteImpl';

export default class NavigableMap extends SvelteImpl<DataFrame, NavigableChoroplethOptions> {
    protected getSvelteComponentClass(): typeof NavigableMapImpl {
        return NavigableMapImpl;
    }
}
