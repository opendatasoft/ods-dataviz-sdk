import type DataProvider from '../../dataprovider';
import type { ComponentParameters } from '../types';
import { BaseComponent } from '../types';

import { Chart, BarController, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';

Chart.register(BarController, CategoryScale, LinearScale, BarElement, Tooltip);

interface BarChartParameters extends ComponentParameters {
    xAxis: string;
    yAxis: string;
}

class BarChart extends BaseComponent {
    canvas = null;

    constructor(protected container:any, protected dataProvider: DataProvider, private parameters: BarChartParameters) {
        // FIXME: Better way to make sure properties is the narrowed-down type? The abstract class thing is heavy
        super(container, dataProvider, parameters);
        this.canvas = document.createElement('canvas');
        container.appendChild(this.canvas);
        this.render();
    }

    updateParameters(newParameters: BarChartParameters) {}

    render() {
        // Fetch
        //this.dataProvider.client
        const queryString = `select=${this.parameters.yAxis} as y&group_by=${this.parameters.xAxis} as x`;
        const response = fetch(`/api/v2/catalog/datasets/${this.dataProvider.datasetId}/aggregates?${queryString}`).then(response => {
            response.json().then(data => {
                console.log(data.aggregations);
                this.drawChart(data.aggregations);
            })
        })
    }

    private drawChart(data) {
        console.log('Drawing', data)
        new Chart(this.canvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: null,
                datasets: [
                    {
                        label: this.dataProvider.datasetId,
                        data
                    }
                ],
            },
            options: {
                scales: {
                    x: {
                        type: 'category',
                        labels: data.map(entry => entry.x)
                    },
                    y: {
                        type: 'linear'
                    }
                },
            }
        });
    }
}

export default BarChart;