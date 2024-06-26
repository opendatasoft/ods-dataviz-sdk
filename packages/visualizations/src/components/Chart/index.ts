import * as ChartJs from 'chart.js';
import { TreemapController, TreemapElement } from 'chartjs-chart-treemap';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Stacked100Plugin from 'chartjs-plugin-stacked100';
import Chart from './Chart.svelte';
import PieDataLabelsPlugin from './pieDataLabelsPlugin';

ChartJs.Chart.register(...ChartJs.registerables);
ChartJs.Chart.register(ChartDataLabels);
ChartJs.Chart.register(PieDataLabelsPlugin);
ChartJs.Chart.register(Stacked100Plugin);
ChartJs.Chart.register(TreemapController, TreemapElement);

ChartJs.defaults.animation = false;

// Export ChartJS to allow reusing instance and changing default, use case not supported
// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
export const _ChartJs = ChartJs;
// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
export const _ChartDataLabels = ChartDataLabels;
export default Chart;
