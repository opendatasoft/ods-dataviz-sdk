<script lang="ts">
    import type { ChartConfiguration } from 'chart.js';
    import { Chart } from 'chart.js';
    import 'chartjs-adapter-luxon';
    import type { Async } from '../../types';
    import type { ChartOptions, ChartSeries, DataFrame } from '../types';
    import { defaultValue, singleChartJsColor } from './utils';
    import toDataset from './datasets';
    import buildScales from './scales';
    import buildLegend from './legend';

    export let data: Async<DataFrame>;
    export let options: ChartOptions;

    let dataFrame: DataFrame = [];
    let series: ChartSeries[] = [];
    let { labelColumn } = options;

    // Hook to handle chart lifecycle
    function chartJs(node: HTMLCanvasElement, config: ChartConfiguration) {
        const ctx = node.getContext('2d');
        if (!ctx) throw new Error('Failed to get canvas context');
        const chart = new Chart(ctx, config);
        return {
            update() {
                chart.update();
            },
            destroy() {
                chart.destroy();
            },
        };
    }

    // Local chart configuration
    const chartConfig: ChartConfiguration = {
        type: options.series[0]?.type || 'line',
        data: {
            labels: [],
            datasets: [],
        },
        options: {},
        plugins: [],
    };

    $: {
        // Update local variable from props
        dataFrame = data.value || [];
        series = options.series;
        labelColumn = options.labelColumn;
    }

    $: {
        // Reactively update chart configuration
        chartConfig.type = defaultValue(options.series[0]?.type, 'line'); // Will set chartJs default value accordingly
        const chartOptions = chartConfig.options || {};
        chartOptions.aspectRatio = defaultValue(options.aspectRatio, 4 / 3);
        chartOptions.maintainAspectRatio = options.maintainAspectRatio;
        chartOptions.scales = buildScales(options);
        chartOptions.layout = {
            padding: defaultValue(options?.padding, 12),
        };
        chartOptions.plugins = {
            legend: buildLegend(dataFrame, options),
            title: {
                // FIXME: Title should be in HTML
                display: defaultValue(options?.title?.display, true),
                position: defaultValue(options?.title?.position, 'top'),
                align: defaultValue(options?.title?.align, 'center'),
                text: options?.title?.text,
                fullSize: defaultValue(options?.title?.fullSize, false),
                color: defaultValue(singleChartJsColor(options?.title?.color), 'rgb(0, 0, 0)'),
                font: {
                    size: defaultValue(options?.title?.font?.size, 14),
                    weight: defaultValue(options?.title?.font?.weight, '500'),
                },
                padding: {
                    top: defaultValue(options?.title?.padding?.top, 4),
                    bottom: defaultValue(options?.title?.padding?.bottom, 24),
                },
            },
            tooltip: {
                enabled: true,
            },
            subtitle: {
                // FIXME: Subtitle should be in HTML
                display: defaultValue(options?.subtitle?.display, false),
                text: options?.subtitle?.text,
                align: defaultValue(options?.subtitle?.align, 'center'),
                fullSize: defaultValue(options?.subtitle?.fullSize, false),
                font: {
                    size: defaultValue(options?.subtitle?.font?.size, 12),
                },
                padding: {
                    top: defaultValue(options?.subtitle?.padding?.top, 0),
                    bottom: defaultValue(options?.subtitle?.padding?.bottom, 24),
                },
            },
        };
        chartConfig.options = chartOptions;
    }

    $: {
        // Use a separate block to only update datasets if there are new data
        chartConfig.data.labels = dataFrame.map((entry) => entry[labelColumn]);
        chartConfig.data.datasets = series.map((s) => toDataset(dataFrame, s));
    }
</script>

<div class="chart-container">
    {#if data.error}
        Error : {JSON.stringify(data.error)}
    {:else if options}
        <canvas use:chartJs={chartConfig} role="img" aria-label={options.ariaLabel} />
    {/if}
</div>

<style>
    .chart-container {
        position: relative;
        height: 100%;
        width: 100%;
    }
</style>
