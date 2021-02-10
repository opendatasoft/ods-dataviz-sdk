<script lang="ts" context="module">
    import * as ChartJs from 'chart.js';

    ChartJs.Chart.register.apply(
        null,
        Object.values(ChartJs).filter((chartClass) => (chartClass as any).id) as any
    );
</script>

<script lang="ts">
    import type { Async } from '../../types';
    import Placeholder from './Placeholder.svelte';
    import type { ChartOptions, ChartSeries, Color, DataFrame, FillConfiguration } from '../types';
    export let data: Async<DataFrame>;
    export let options: ChartOptions;

    function chartJs(node: HTMLCanvasElement, config: ChartJs.ChartConfiguration) {
        const ctx = node.getContext('2d');
        if (!ctx) throw new Error('Failed to get canvas context');
        const chart = new ChartJs.Chart(ctx, config);
        return {
            update(config: ChartJs.ChartConfiguration) {
                chart.update();
            },
            destroy() {
                chart.destroy();
            },
        };
    }

    function defaultValue<T>(value: T | undefined, defaultValue: T): T {
        if (value === undefined) return defaultValue;
        return value;
    }

    function chartJsColor(color?: Color) {
        return color;
    }

    function chartJsFill(fill: FillConfiguration | undefined) {
        if (fill === undefined) return false;
        return {
            target: fill.mode,
            above: chartJsColor(fill.above),
            below: chartJsColor(fill.below),
        };
    }

    function toDataset(dataFrame: DataFrame, series: ChartSeries): ChartJs.ChartDataset {
        if (series.type === 'bar') {
            return {
                type: 'bar',
                data: dataFrame.map((entry) => entry[series.valueColumn]),
                backgroundColor: chartJsColor(series.backgroundColor),
                label: defaultValue(series.label, ''),
                indexAxis: defaultValue(series.indexAxis, 'x'),
                barPercentage: defaultValue(series.barPercentage, 0.9),
                categoryPercentage: defaultValue(series.categoryPercentage, 0.8),
            };
        }

        if (series.type === 'line') {
            return {
                type: 'line',
                data: dataFrame.map((entry) => entry[series.valueColumn]),
                backgroundColor: chartJsColor(series.backgroundColor),
                borderColor: chartJsColor(series.borderColor),
                label: defaultValue(series.label, ''),
                fill: chartJsFill(series.fill),
            };
        }

        if (series.type === 'pie') {
            return {
                type: 'pie',
                data: dataFrame.map((entry) => entry[series.valueColumn]),
                backgroundColor: chartJsColor(series.backgroundColor),
            };
        }

        if (series.type === 'radar') {
            return {
                type: 'radar',
                data: dataFrame.map((entry) => entry[series.valueColumn]),
                backgroundColor: chartJsColor(series.backgroundColor),
                borderColor: chartJsColor(series.borderColor),
                label: defaultValue(series.label, ''),
            };
        }

        throw new Error('Unknown chart type: ' + (series as any).type);
    }

    let chartConfig: ChartJs.ChartConfiguration = {
        type: options.series[0]?.type || 'line',
        data: {
            labels: [],
            datasets: [],
        },
        options: {},
    };

    $: {
        chartConfig.type = defaultValue(options.series[0]?.type, 'line'); // Will set chartJs default value accordingly
        let chartOptions = chartConfig.options || {};
        chartOptions.aspectRatio = options.aspectRatio;
        chartOptions.scales = {};
        if (options.xAxis) {
            chartOptions.scales['x'] = {
                type: options?.xAxis?.type,
                display: options?.xAxis?.display,
                scaleLabel: {
                    display: options?.xAxis?.label?.display,
                    align: options?.xAxis?.label?.align,
                    labelString: options?.xAxis?.label?.value,
                },
                gridLines: {
                    display: defaultValue(options?.xAxis?.gridLines?.display, true),
                },
            };
        }
        if (options.yAxis) {
            chartOptions.scales['y'] = {
                type: options?.yAxis?.type,
                display: options?.yAxis?.display,
                scaleLabel: {
                    display: options?.yAxis?.label?.display,
                    align: options?.yAxis?.label?.align,
                    labelString: options?.yAxis?.label?.value,
                },
                gridLines: {
                    display: defaultValue(options?.yAxis?.gridLines?.display, true),
                },
            };
        }
        if (options.rAxis || options.series.map((series) => series.type).indexOf('radar') > -1) {
            //FIXME: Use scales.r when https://github.com/chartjs/Chart.js/pull/8393 will be available
            chartOptions.scale = {
                beginAtZero: defaultValue(options?.rAxis?.beginAtZero, true),
            };
        }
        chartOptions.legend = {
            display: options?.legend?.display,
            position: defaultValue(options?.legend?.position, 'bottom'),
            align: defaultValue(options?.legend?.align, 'center'),
        };
        chartOptions.title = {
            display: options?.title?.display,
            position: defaultValue(options?.title?.position, 'top'),
            align: defaultValue(options?.title?.align, 'center'),
            text: defaultValue(options?.title?.text, ''),
        };
        chartOptions.tooltips = {
            enabled: options?.tooltips?.display,
        };
        chartConfig.options = chartOptions;
    }

    let dataFrame: DataFrame = [];
    let series: ChartSeries[] = [];
    let labelColumn: string = options.labelColumn;

    $: {
        dataFrame = data.value || [];
        series = options.series;
        labelColumn = options.labelColumn;
    }

    $: {
        chartConfig.data.labels = dataFrame.map((entry) => entry[labelColumn]);
        chartConfig.data.datasets = series.map((series) => toDataset(dataFrame, series));
    }
</script>

<div class="chart-container">
    {#if data.loading}
        Loading...
    {:else}
        {#if options}
            <canvas use:chartJs={chartConfig} role="img" aria-label={options.ariaLabel} />
        {:else}
            <Placeholder />
        {/if}
        {#if data.error}Error : {JSON.stringify(data.error)}{/if}
    {/if}
</div>

<style>
    .chart-container {
        position: relative;
        height: 100%;
        width: 100%;
    }
</style>
