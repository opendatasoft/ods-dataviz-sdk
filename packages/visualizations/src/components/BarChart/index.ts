import type DataProvider from '../../dataprovider';
import type { ComponentProperties } from '../types';
import { BaseComponent } from '../types';

interface BarChartProperties extends ComponentProperties {

}

class BarChart extends BaseComponent {
    constructor(protected container:any, protected dataProvider: DataProvider, private properties: BarChartProperties) {
        // FIXME: Better way to make sure properties is the narrowed-down type? The abstract class thing is heavy
        super(container, dataProvider, properties);
        console.log("dp", dataProvider)
        container.innerHTML = `<div>hello barchart! fetching dataset ${dataProvider.datasetId}</div>`;
    }

    updateProperties(newProperties: BarChartProperties) {}

    render() {

    }
}

export default BarChart;