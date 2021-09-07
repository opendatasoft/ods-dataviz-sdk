import KpiCardImpl from './KpiCard.svelte';
import { SvelteImpl } from '../SvelteImpl';
import type { KpiCardOptions } from '../types';

export default class KpiCard extends SvelteImpl<string, KpiCardOptions> {
    protected getSvelteComponentClass(): typeof KpiCardImpl {
        return KpiCardImpl;
    }
}
