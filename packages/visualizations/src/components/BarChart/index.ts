import BaseComponent, { DataType } from '../types';
import type { BarChartParameters } from './types'

import BarChartImpl from './BarChart.svelte';
import PlaceholderImpl from './Placeholder.svelte';

export default class BarChart extends BaseComponent<BarChartParameters> {
    hasData = !!(this.data?.data && this.parameters.xAxis && this.parameters.yAxis);

    constructor(container: HTMLElement, data: DataType, parameters: BarChartParameters, styles: CSSStyleDeclaration) {
        super(container, data, parameters, styles);
        this.render(BarChartImpl, PlaceholderImpl);
    }

    updateParameters(newParameters: BarChartParameters): void {
        this.parameters = newParameters;
    }
}
