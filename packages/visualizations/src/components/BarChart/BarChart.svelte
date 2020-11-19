<script lang="ts">
    import { Chart, BarController, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';

    Chart.register(BarController, CategoryScale, LinearScale, BarElement, Tooltip);

    export let dataProvider = null;
    export let parameters = null;

    let canvas;

    function render() {
        // Fetch
        //this.dataProvider.client
        const queryString = `select=${parameters.yAxis} as y&group_by=${parameters.xAxis} as x`;
        const response = fetch(`${dataProvider.domainId}/api/v2/catalog/datasets/${dataProvider.datasetId}/aggregates?${queryString}`).then(response => {
            response.json().then(data => {
                console.log(data.aggregations);
                drawChart(data.aggregations);
            })
        })
    }

    function drawChart(data) {
        console.log('Drawing', data)
        new Chart(canvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: null,
                datasets: [
                    {
                        label: dataProvider.datasetId,
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