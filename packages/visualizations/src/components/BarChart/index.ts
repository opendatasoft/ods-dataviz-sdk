import type DataProvider from '../../dataprovider';
import type { ComponentParameters } from '../types';
import { BaseComponent } from '../types';
import BarChartImpl from './BarChart.svelte';

export enum ColorConfigurationTypes {
    /** Cycle through a list of colors, defined in the `colors` property */
    RoundRobin = 'roundrobin',
}

interface ColorConfiguration {
    type: string,
    colors: string[],
}

export interface BarChartParameters extends ComponentParameters {
    /** Field name to use as the X axis */
    xAxis: string;
    /** Field name to use as the Y axis */
    yAxis: string;
    /** Configuration of colors used for the bars */
    colorConfiguration: ColorConfiguration;
}

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