import BaseComponent, { Data, Styles } from '../types';
import type { BarChartParameters } from './types'

import BarChartImpl from './BarChart.svelte';
import PlaceholderImpl from './Placeholder.svelte';

export default class BarChart extends BaseComponent<BarChartParameters> {
    hasData = !!(this.data?.data && this.parameters.xAxis && this.parameters.yAxis);

    constructor(container: HTMLElement, data: Data, parameters: BarChartParameters, styles: Styles) {
        super(container, data, parameters, styles);
        this.render(BarChartImpl, PlaceholderImpl);
    }

    public updateParameters(newParameters: BarChartParameters): void {
        this.parameters = newParameters;
    }

    public updateData(newData: Data): void {
        this.data = newData;
    }

    public updateStyles(newStyles: Styles): void {
        this.styles = newStyles;
    }
}
