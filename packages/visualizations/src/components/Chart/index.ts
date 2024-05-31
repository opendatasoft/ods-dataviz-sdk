import ChartJs, { Chart as ChartModule, registerables } from 'chart.js';
import { TreemapController, TreemapElement } from 'chartjs-chart-treemap';
import DataLabels from 'chartjs-plugin-datalabels';
import Stacked100Plugin from 'chartjs-plugin-stacked100';
import Chart from './Chart.svelte';
import PieDataLabelsPlugin from './pieDataLabelsPlugin';

ChartModule.register(...registerables);
ChartModule.register(DataLabels);
ChartModule.register(PieDataLabelsPlugin);
ChartModule.register(Stacked100Plugin);
ChartModule.register(TreemapController, TreemapElement);

ChartJs.defaults.animation = false;

// Export ChartJS to allow reusing instance and changing default, use case not supported
// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
export const _ChartJs = ChartJs;
// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
export const _ChartDataLabels = DataLabels;
export default Chart;
