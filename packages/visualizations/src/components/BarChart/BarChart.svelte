<script lang="ts">
    /**
     * TypeScript isn't properly supported by Storybook/Svelte yet:
     * We need https://github.com/storybookjs/storybook/issues/12754 first
     * Or https://github.com/alexprey/sveltedoc-parser/issues/34 and the current workaround in .storybook/main.js
    */

    import { onMount } from 'svelte';
    import { Chart, BarController, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';

    import type { StylesType } from '../types';
    import type { BarChartParameters } from './types';
    import { ColorConfigurationTypes} from './types';

    Chart.register(BarController, CategoryScale, LinearScale, BarElement, Tooltip);

    export let data: any = null;
    export let parameters: BarChartParameters = null;
    export let styles: StylesType = null;

    let canvas: HTMLCanvasElement;

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

    onMount(() => {
        let colors: string[];
        const effectiveParameters = { ...defaultParameters, ...parameters };
        const ctx = canvas.getContext('2d');

        if (effectiveParameters.colorConfiguration.type === 'roundrobin') {
            colors = effectiveParameters.colorConfiguration.colors;
        }

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: null,
                datasets: [
                    {
                        backgroundColor: colors,
                        data: data,
                    }
                ],
            },
            options: {
                scales: {
                    x: {
                        type: 'category',
                        labels: data.map((entry: any) => entry.x)
                    },
                    y: {
                        type: 'linear'
                    }
                },
            }
        });
    });
</script>

<div class="ods-viz__bar-chart" style={styles}>
    <canvas bind:this={canvas} height="330"></canvas>
</div>

<style lang="scss">
    .ods-viz__bar-chart {
        min-height: 330px;
    }
</style>
