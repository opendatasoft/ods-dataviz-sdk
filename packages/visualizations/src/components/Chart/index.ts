import * as ChartJs from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Stacked100Plugin from 'chartjs-plugin-stacked100';
import type { ChartOptions, DataFrame } from '../types';
import ChartImpl from './Chart.svelte';
import SvelteImpl from '../SvelteImpl';
import PieDataLabelsPlugin from './pieDataLabelsPlugin';

ChartJs.Chart.register(...ChartJs.registerables);
ChartJs.Chart.register(ChartDataLabels);
ChartJs.Chart.register(PieDataLabelsPlugin);
ChartJs.Chart.register(Stacked100Plugin);

ChartJs.defaults.animation = false;

// Export ChartJS to allow reusing instance and changing default, use case not supported
// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
export const _ChartJs = ChartJs;
// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
export const _ChartDataLabels = ChartDataLabels;
export default class Chart extends SvelteImpl<DataFrame, ChartOptions> {
    protected getSvelteComponentClass(): typeof ChartImpl {
        return ChartImpl;
    }
}
