import KpiCardImpl from './KpiCard.svelte';
import SvelteImpl from '../SvelteImpl';
import type { KpiCardOptions } from './types';

export { KpiCardImpl };
export default class KpiCard extends SvelteImpl<number, KpiCardOptions> {
    protected getSvelteComponentClass(): typeof KpiCardImpl {
        return KpiCardImpl;
    }
}
