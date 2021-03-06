import * as ChartJs from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import type { ChartOptions, DataFrame } from '../types';
import ChartImpl from './Chart.svelte';
import { SvelteImpl } from '../SvelteImpl';

ChartJs.Chart.register.apply(
    null,
    Object.values(ChartJs).filter((chartClass) => (chartClass as any).id) as any
);
ChartJs.Chart.register(ChartDataLabels);

// Export ChartJS to allow reusing instance and changing default, use case not supported
export const _ChartJs = ChartJs;
export const _ChartDataLabels = ChartDataLabels;
export default class Chart extends SvelteImpl<DataFrame, ChartOptions> {
    protected getSvelteComponentClass(): typeof ChartImpl {
        return ChartImpl;
    }
}
