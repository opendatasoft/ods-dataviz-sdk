import { BaseComponent, Async } from '../types';
import type { BarChartParameters, Dataset } from './types'
import BarChartImpl from './BarChart.svelte';
import { SvelteImpl } from '../SvelteImpl';

export default class BarChart extends SvelteImpl<Dataset, BarChartParameters> {
    protected getSvelteComponentClass(): typeof BarChartImpl {
        return BarChartImpl;
    }
}
