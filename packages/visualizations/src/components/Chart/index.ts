import * as ChartJs from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import type { ChartOptions, DataFrame } from '../types';
import ChartImpl from './Chart.svelte';
import SvelteImpl from '../SvelteImpl';

ChartJs.Chart.register.apply(
    null,
    Object.values(ChartJs).filter((chartClass) => (chartClass as any).id) as any
);
ChartJs.Chart.register(ChartDataLabels);

// Export ChartJS to allow reusing instance and changing default, use case not supported
// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
export const _ChartJs = ChartJs;
// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
export const _ChartDataLabels = ChartDataLabels;
export default class Chart extends SvelteImpl<DataFrame, ChartOptions> {
    // eslint-disable-next-line class-methods-use-this
    protected getSvelteComponentClass(): typeof ChartImpl {
        return ChartImpl;
    }
}
