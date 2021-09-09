<script lang="ts">
    import * as ChartJs from 'chart.js';
    import type { Async } from '../../types';
    import Placeholder from './Placeholder.svelte';
    import type {
        ChartOptions,
        ChartSeries,
        Color,
        DataFrame,
        DataLabelsConfiguration,
        FillConfiguration,
    } from '../types';
    import type { Options as DataLabelsOptions } from 'chartjs-plugin-datalabels/types/options';
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

    function handleHoverPieChart(evt:any, item:any, legend:any) {
        legend.chart.data.datasets[0].backgroundColor.forEach((color:any, index:any, colors:any) => {
            if (color.length === 7) {
                colors[index] = index === item.index ? color : color + '4D';
            } else if (color.slice(0,3) === 'rgb') {
                colors[index] = index === item.index ? color : color.slice(0, -1) + ',0.3)';
            }
        });
        legend.chart.update();
    }

    function handleLeavePieChart(evt:any, item:any, legend:any) {
        legend.chart.data.datasets[0].backgroundColor.forEach((color:any, index:any, colors:any) => {
            if (color.length === 9) {
                colors[index] = color.slice(0, -2);
            } else if (color.slice(0,3) === 'rgb' && color.slice(-5).includes('.')) {
                colors[index] = `${color.slice(0, -5)})`;
            }

        });
        legend.chart.update();
    }

    function displayZeroTick(this:any, val:string | number) {
        if (val === 0) {
            return this.getLabelForValue(val)
        }
        return '';
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
        const formatter = dataLabels.formatter;
        const aligner = dataLabels.align;
        const anchorer = dataLabels.anchor;

        return {
            align: aligner
                ? (context) => {
                      return aligner(context.dataIndex, { dataFrame });
                  }
                : 'end',
            anchor: anchorer
                ? (context) => {
                      return anchorer(context.dataIndex, { dataFrame });
                  }
                : 'end',
            display: defaultValue(dataLabels.display, false),
            color: chartJsColorPalette(dataLabels.color),
            backgroundColor: chartJsColorPalette(dataLabels.backgroundColor),
            offset: defaultValue(dataLabels.offset, 0),
            borderRadius: defaultValue(dataLabels.borderRadius, 4),
            formatter: formatter
                ? (value, context) => {
                      return formatter(context.dataIndex, { dataFrame });
                  }
                : Math.round,
            padding: defaultValue(dataLabels.padding, 4),
        };
    }

    function toDataset(dataFrame: DataFrame, series: ChartSeries): ChartJs.ChartDataset {
        if (series.type === 'bar') {
            return {
                type: 'bar',
                data: dataFrame.map((entry) => entry[series.valueColumn]),
                backgroundColor: chartJsColorPalette(series.backgroundColor),
                borderColor: chartJsColorPalette(series.borderColor),
                borderWidth: defaultValue(series.borderWidth, 0),
                label: defaultValue(series.label, ''),
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
                label: defaultValue(series.label, ''),
                fill: chartJsFill(series.fill),
                datalabels: chartJsDataLabels(series.dataLabels),
                tension: defaultValue(series.tension, 0),
                pointRadius: defaultValue(series.pointRadius, 3),
                borderWidth: defaultValue(series.borderWidth, 2)
            };
        }

        if (series.type === 'pie') {
            return {
                type: 'pie',
                label: defaultValue(series.label, ''),
                data: dataFrame.map((entry) => entry[series.valueColumn]),
                backgroundColor: chartJsColorPalette(series.backgroundColor),
                datalabels: chartJsDataLabels(series.dataLabels),
            };
        }

        if (series.type === 'radar') {
            return {
                type: 'radar',
                data: dataFrame.map((entry) => entry[series.valueColumn]),
                backgroundColor: chartJsColorSingle(series.backgroundColor),
                borderColor: chartJsColorSingle(series.borderColor),
                label: defaultValue(series.label, ''),
                datalabels: chartJsDataLabels(series.dataLabels),
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
        plugins: [],
    };

    $: {
        chartConfig.type = defaultValue(options.series[0]?.type, 'line'); // Will set chartJs default value accordingly
        let chartOptions = chartConfig.options || {};
        chartOptions.aspectRatio = defaultValue(options.aspectRatio, 4/3);
        chartOptions.maintainAspectRatio = options.maintainAspectRatio;
        chartOptions.scales = {};
        chartOptions.layout = {
            padding: defaultValue(options?.padding, 12),
        };
        const gridXColor = options?.xAxis?.gridLines?.color;
        if (options.xAxis) {
            chartOptions.scales['x'] = {
                type: options?.xAxis?.type,
                display: options?.xAxis?.display,
                offset: defaultValue(options?.xAxis?.offset, false),
                title: {
                    display: options?.xAxis?.title?.display,
                    color: defaultValue(options?.xAxis?.title?.color, 'rgb(0, 0, 0)'),
                    align: options?.xAxis?.title?.align,
                    text: options?.xAxis?.title?.text,
                    font: {
                        weight: defaultValue(options?.xAxis?.title?.font?.weight, '400'),
                        size: defaultValue(options?.xAxis?.title?.font?.size, 12),
                    }
                },
                grid: {
                    display: defaultValue(options?.xAxis?.gridLines?.display, true),
                    borderColor: defaultValue(options?.xAxis?.gridLines?.borderColor, 'rgba(0, 0, 0, 0.4)'),
                    drawBorder: defaultValue(options?.xAxis?.gridLines?.drawBorder, false),
                    ...(gridXColor && {
                        color: (context, proxy) => {
                            const ticksArray = proxy._context.scale.ticks;
                            const ticksAbsoluteValues = ticksArray.map((tick:any)=>Math.abs(tick.value))
                            const minAbsoluteTicksIndex = ticksAbsoluteValues.indexOf(Math.min(...ticksAbsoluteValues))
                            return gridXColor(context.index, minAbsoluteTicksIndex);
                        },
                    }),
                    offset: defaultValue(options?.xAxis?.gridLines?.offset, false),
                },
                ticks: {
                    display: defaultValue(options?.xAxis?.ticks?.display, true),
                    color: defaultValue(options?.xAxis?.ticks?.color, 'rgb(86, 86, 86)'),
                    ...(options?.xAxis?.ticks?.zeroTick === true && {callback: displayZeroTick}),
                },
            };
        }
        const gridYColor = options?.yAxis?.gridLines?.color;
        if (options.yAxis) {
            chartOptions.scales['y'] = {
                type: options?.yAxis?.type,
                display: options?.yAxis?.display,
                title: {
                    display: options?.yAxis?.title?.display,
                    align: options?.yAxis?.title?.align,
                    text: options?.yAxis?.title?.text,
                    color: defaultValue(options?.yAxis?.title?.color, 'rgb(0, 0, 0)'),
                    font: {
                        weight: defaultValue(options?.yAxis?.title?.font?.weight, '400'),
                        size: defaultValue(options?.yAxis?.title?.font?.size, 12),
                    }
                },
                grid: {
                    display: defaultValue(options?.yAxis?.gridLines?.display, true),
                    borderColor: defaultValue(options?.yAxis?.gridLines?.borderColor, 'rgba(0, 0, 0, 0.4)'),
                    drawBorder: defaultValue(options?.yAxis?.gridLines?.drawBorder, false),
                    ...(gridYColor && {
                        color: (context, proxy) => {
                            const ticksArray = proxy._context.scale.ticks;
                            const ticksAbsoluteValues = ticksArray.map((tick:any)=>Math.abs(tick.value))
                            const minAbsoluteTicksIndex = ticksAbsoluteValues.indexOf(Math.min(...ticksAbsoluteValues))
                            return gridYColor(context.index, minAbsoluteTicksIndex);
                        },
                    }),
                },
                ticks: {
                    display: defaultValue(options?.yAxis?.ticks?.display, true),
                    color: defaultValue(options?.yAxis?.ticks?.color, 'rgb(86, 86, 86)'),
                    ...(options?.yAxis?.ticks?.zeroTick === true && {callback: displayZeroTick}),
                },
            };
        }
        if (options.rAxis) {
            chartOptions.scales['r'] = {
                beginAtZero: defaultValue(options?.rAxis?.beginAtZero, true),
                ticks: {
                    display: defaultValue(options?.rAxis?.ticks?.display, true),
                    color: defaultValue(options?.rAxis?.ticks?.color, 'rgb(86, 86, 86)'),
                    ...(options?.xAxis?.ticks?.zeroTick === true && {callback: displayZeroTick}),
                },
            };
        }
        chartOptions.plugins = {
            legend: {
                display: defaultValue(options?.legend?.display, false),
                position: defaultValue(options?.legend?.position, 'bottom'),
                align: defaultValue(options?.legend?.align, 'center'),
                ...(options.series[0]?.type === 'pie' && {onHover: handleHoverPieChart}),
                ...(options.series[0]?.type === 'pie' && {onLeave: handleLeavePieChart}),
            },
            title: {
                display: defaultValue(options?.title?.display, true),
                position: defaultValue(options?.title?.position, 'top'),
                align: defaultValue(options?.title?.align, 'center'),
                text: options?.title?.text,
                fullSize: defaultValue(options?.title?.fullSize, false),
                color: defaultValue(options?.title?.color, 'rgb(0, 0, 0)'),
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
                enabled: defaultValue(options?.tooltips?.display, true),
            },
            subtitle: {
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
