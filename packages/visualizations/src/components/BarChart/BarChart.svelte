<script lang="ts">
    import { Chart, BarController, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';
    import { ColorConfigurationTypes } from './types';
    /*
    TypeScript isn't properly supported by Storybook/Svelte yet:
    We need https://github.com/storybookjs/storybook/issues/12754 first
    Or https://github.com/alexprey/sveltedoc-parser/issues/34 and the current workaround in .storybook/main.js
    */
    //import type { BarChartParameters } from './index';

    Chart.register(BarController, CategoryScale, LinearScale, BarElement, Tooltip);

    export let dataProvider = null;
    export let parameters = null;

    const defaultParameters = {
        colorConfiguration: {
            type: ColorConfigurationTypes.RoundRobin,
            // Defaults colors taken from Chart.js samples
            colors: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 205, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(201, 203, 207, 0.6)'
            ]
        },
        // Can't guess those
        xAxis: null,
        yAxis: null,
    };

    let canvas;

    function render() {
        const effectiveParameters = { ...defaultParameters, ...parameters };
        // Fetch
        //this.dataProvider.client
        const queryString = `select=${effectiveParameters.yAxis} as y&group_by=${effectiveParameters.xAxis} as x`;
        const response = fetch(`${dataProvider.domainId}/api/v2/catalog/datasets/${dataProvider.datasetId}/aggregates?${queryString}`).then(response => {
            response.json().then(data => {
                console.log(data.aggregations);
                drawChart(data.aggregations, effectiveParameters);
            })
        })
    }

    function drawChart(data, effectiveParameters) {
        let colors;
        if (effectiveParameters.colorConfiguration.type === 'roundrobin') {
            colors = effectiveParameters.colorConfiguration.colors;
        }
        new Chart(canvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: null,
                datasets: [
                    {
                        label: dataProvider.datasetId,
                        backgroundColor: colors,
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

    if (dataProvider && parameters) {
        render();
    }
</script>

<div>
    <canvas bind:this={canvas}></canvas>
</div>
