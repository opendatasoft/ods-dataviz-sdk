<script lang="ts">
    import * as ChartJs from 'chart.js';
    import type { Async } from '../../types';
    import type {
        ChartOptions,
        ChartSeries,
        Color,
        DataFrame,
        DataLabelsConfiguration,
        FillConfiguration,
    } from '../types';
    import type { Options as DataLabelsOptions } from 'chartjs-plugin-datalabels/types/options';
    import type { _DeepPartialObject } from 'chart.js/types/utils';
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

    function chartJsColorPalette(color?: Color) {
        return color;
    }

    function chartJsColorSingle(color?: Color) {
        return color === undefined ? undefined : typeof color === 'string' ? color : color[0];
    }

    function chartJsFill(fill: FillConfiguration | undefined) {
        if (fill === undefined) return false;
        return {
            target: fill.mode,
            above: chartJsColorSingle(fill.above),
            below: chartJsColorSingle(fill.below),
        };
    }

    function chartJsDataLabels(dataLabels: DataLabelsConfiguration | undefined): DataLabelsOptions {
        if (dataLabels === undefined) return { display: false };
        return {
            align: defaultValue(dataLabels.align, 'center'),
            display: defaultValue(dataLabels.display, false),
            color: chartJsColorPalette(dataLabels.color),
            backgroundColor: chartJsColorPalette(dataLabels.backgroundColor),
            offset: defaultValue(dataLabels.offset, 0),
            borderRadius: defaultValue(dataLabels.borderRadius, 0),
        };
    }

    function toDataset(dataFrame: DataFrame, series: ChartSeries): ChartJs.ChartDataset {
        if (series.type === 'bar') {
            return {
                type: 'bar',
                data: dataFrame.map((entry) => entry[series.valueColumn]),
                backgroundColor: chartJsColorPalette(series.backgroundColor),
                label: series.label,
                indexAxis: defaultValue(series.indexAxis, 'x'),
                barPercentage: defaultValue(series.barPercentage, 0.9),
                categoryPercentage: defaultValue(series.categoryPercentage, 0.8),
                datalabels: chartJsDataLabels(series.dataLabels),
            };
        }

        if (series.type === 'line') {
            return {
                type: 'line',
                data: dataFrame.map((entry) => entry[series.valueColumn]),
                backgroundColor: chartJsColorSingle(series.backgroundColor),
                borderColor: chartJsColorSingle(series.borderColor),
                label: series.label,
                fill: chartJsFill(series.fill),
                datalabels: chartJsDataLabels(series.dataLabels),
                tension: defaultValue(series.tension, 0),
            };
        }

        if (series.type === 'pie') {
            return {
                type: 'pie',
                data: dataFrame.map((entry) => entry[series.valueColumn]),
                backgroundColor: chartJsColorPalette(series.backgroundColor),
                datalabels: {
                    display: false,
                },
            };
        }

        if (series.type === 'radar') {
            return {
                type: 'radar',
                data: dataFrame.map((entry) => entry[series.valueColumn]),
                backgroundColor: chartJsColorSingle(series.backgroundColor),
                borderColor: chartJsColorSingle(series.borderColor),
                label: series.label,
                datalabels: {
                    display: false,
                },
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
        chartOptions.maintainAspectRatio = options.maintainAspectRatio;
        chartOptions.scales = {};
        chartOptions.layout = {
            padding: options.padding,
        };
        if (options.xAxis) {
            chartOptions.scales['x'] = {
                type: options?.xAxis?.type,
                display: options?.xAxis?.display,
                title: {
                    display: options?.xAxis?.title?.display,
                    align: options?.xAxis?.title?.align,
                    text: options?.xAxis?.title?.text,
                },
                grid: {
                    display: defaultValue(options?.xAxis?.gridLines?.display, true),
                },
            } as _DeepPartialObject<ChartJs.CartesianScaleOptions>;
        }
        if (options.yAxis) {
            chartOptions.scales['y'] = {
                type: options?.yAxis?.type,
                display: options?.yAxis?.display,
                title: {
                    display: options?.yAxis?.title?.display,
                    align: options?.yAxis?.title?.align,
                    text: options?.yAxis?.title?.text,
                },
                grid: {
                    display: defaultValue(options?.yAxis?.gridLines?.display, true),
                },
            } as _DeepPartialObject<ChartJs.CartesianScaleOptions>;
        }
        if (options.rAxis) {
            chartOptions.scales['r'] = {
                beginAtZero: defaultValue(options?.rAxis?.beginAtZero, true),
            } as _DeepPartialObject<ChartJs.RadialLinearScaleOptions>;
        }
        chartOptions.plugins = {
            legend: {
                display: defaultValue(options?.legend?.display, false),
                position: defaultValue(options?.legend?.position, 'bottom'),
                align: defaultValue(options?.legend?.align, 'center'),
            },
            title: {
                display: defaultValue(options?.title?.display, true),
                position: defaultValue(options?.title?.position, 'top'),
                align: defaultValue(options?.title?.align, 'center'),
                text: options?.title?.text,
            },
            tooltip: {
                enabled: defaultValue(options?.tooltips?.display, true),
            },
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
