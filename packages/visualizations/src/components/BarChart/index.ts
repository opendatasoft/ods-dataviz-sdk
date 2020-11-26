import type DataProvider from '../../dataprovider';
import { BaseComponent } from '../types';
import type { BarChartParameters } from './types'
import BarChartImpl from './BarChart.svelte';
import PlaceholderImpl from './Placeholder.svelte';

class BarChart extends BaseComponent {
    canvas = null;

    constructor(protected container:any, protected dataProvider: DataProvider, private parameters: BarChartParameters) {
        super(container, dataProvider, parameters);

        if (this.hasData(parameters)) {
            new BarChartImpl({
                target: container,
                props: {
                    parameters: parameters,
                    dataProvider: dataProvider,
                }
            });
        } else {
            new PlaceholderImpl({ target: container });
        }
    }

    updateParameters(newParameters: BarChartParameters) {}

    hasData(parameters: BarChartParameters) {
        return parameters.xAxis && parameters.yAxis;
    }
}

export default BarChart;
