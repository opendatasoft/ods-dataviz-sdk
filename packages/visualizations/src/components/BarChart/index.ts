import type DataProvider from '../../dataprovider';
import { BaseComponent } from '../types';
import type { BarChartParameters } from './types'
import BarChartImpl from './BarChart.svelte';

class BarChart extends BaseComponent {
    canvas = null;

    constructor(protected container:any, protected dataProvider: DataProvider, private parameters: BarChartParameters) {
        super(container, dataProvider, parameters);

        new BarChartImpl({
            target: container,
            props: {
                parameters: parameters,
                dataProvider: dataProvider
            }
        });
    }

    updateParameters(newParameters: BarChartParameters) {}
}

export default BarChart;
