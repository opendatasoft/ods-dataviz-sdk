import type { ChartOptions, DataFrame } from '../types';
import ChartImpl from './Chart.svelte';
import { SvelteImpl } from '../SvelteImpl';

export default class Chart extends SvelteImpl<DataFrame, ChartOptions> {
    protected getSvelteComponentClass(): typeof ChartImpl {
        return ChartImpl;
    }
}
