<script lang="ts">
    import * as ChartJs from 'chart.js';
    import type { Options as DataLabelsOptions } from 'chartjs-plugin-datalabels/types/options';
    import type { _DeepPartialObject } from 'chart.js/types/utils';
    import type { Async } from '../../types';
    import type {
        ChartOptions,
        ChartSeries,
        Color,
        DataFrame,
        DataLabelsConfiguration,
        FillConfiguration,
        TicksConfiguration,
        GridLinesConfiguration,
        CartesianAxisConfiguration,
    } from '../types';
    import { compactStringOrNumber } from '../../utils';
    import pieDataLabelsPlugin from './pieDataLabelsPlugin';
    import SourceLink from '../SourceLink/SourceLink.svelte';

    export let data: Async<DataFrame>;
    export let options: ChartOptions;

    let dataFrame: DataFrame = [];
    let series: ChartSeries[] = [];
    let { labelColumn } = options;
    const { source } = options;

    function chartJs(node: HTMLCanvasElement, config: ChartJs.ChartConfiguration) {
        const ctx = node.getContext('2d');
        if (!ctx) throw new Error('Failed to get canvas context');
        const chart = new ChartJs.Chart(ctx, config);
        return {
            update() {
                chart.update();
            },
            destroy() {
                chart.destroy();
            },
        };
    }

    function defaultValue<T>(value: T | undefined, fallback: T): T {
        if (value === undefined) return fallback;
        return value;
    }

    function singleChartJsColor(color?: Color) {
        if (color === undefined) return undefined;
        if (typeof color === 'string') return color;
        return color[0];
    }

    function multipleChartJsColors(color?: Color) {
        return color;
    }

    const handleHoverPieChart: ChartJs.LegendOptions<'pie'>['onHover'] = (_, item, legend) => {
        const { tooltip, chartArea } = legend.chart;
        if (tooltip) {
            // FIXME: `TooltipModel` doesn't have a `setActiveElements` method.
            (tooltip as any).setActiveElements(
                [
                    {
                        datasetIndex: 0,
                        index: (item as any).index,
                    },
                ],
                {
                    x: (chartArea.left + chartArea.right) / 2,
                    y: (chartArea.top + chartArea.bottom) / 2,
                }
            );
        }
        legend.chart.update();
    };

    const handleLeavePieChart: ChartJs.LegendOptions<'pie'>['onLeave'] = (_evt, _item, legend) => {
        legend.chart.update();
    };

    function computeFormatTick(
        displayTick: TicksConfiguration['display'],
        type: CartesianAxisConfiguration['type']
    ) {
        function formatTick(
            this: ChartJs.Scale,
            tickValue: number,
            _index: number,
            ticks: ChartJs.Tick[]
        ) {
            const minAbsTickValue = Math.min(...ticks.map((tick) => Math.abs(tick.value)));
            if (displayTick === 'single' && tickValue !== minAbsTickValue) {
                return '';
            }
            if (type === 'category') {
                return compactStringOrNumber(this.getLabelForValue(tickValue));
            }
            return compactStringOrNumber(tickValue);
        }
        return formatTick;
    }

    function chartJsFill(fill: FillConfiguration | undefined) {
        if (fill === undefined) return false;
        return {
            target: fill.mode,
            above: singleChartJsColor(fill.above),
            below: singleChartJsColor(fill.below),
        };
    }

    const computeGridLineColor: (
        display: GridLinesConfiguration['display']
    ) => ChartJs.GridLineOptions['color'] = (display) => (context) => {
        const ticksAbsoluteValues = context.scale.ticks.map((tick) => Math.abs(tick.value));
        let minAbsoluteTicksIndex = ticksAbsoluteValues.indexOf(Math.min(...ticksAbsoluteValues));
        if (context.scale.type === 'radialLinear') {
            // On radar, chartjs compute one supplementary grid line
            minAbsoluteTicksIndex -= 1;
        }
        if (display) {
            if (context.index === minAbsoluteTicksIndex) return 'rgba(0, 0, 0, 0.4)';
            if (display !== 'single') return 'rgba(0, 0, 0, 0.1)';
        }
        return 'rgba(0, 0, 0, 0)';
    };

    function chartJsDataLabels(dataLabels: DataLabelsConfiguration | undefined): DataLabelsOptions {
        if (dataLabels === undefined) return { display: false };
        const { formatter, align, anchor } = dataLabels;

        return {
            align: align ? (context) => align(context.dataIndex, { dataFrame }) : 'end',
            anchor: anchor ? (context) => anchor(context.dataIndex, { dataFrame }) : 'end',
            display: defaultValue(dataLabels.display, false),
            color: defaultValue(dataLabels.color, 'rgb(0,0,0)'),
            backgroundColor: defaultValue(dataLabels.backgroundColor, 'rgb(255,255,255)'),
            offset: defaultValue(dataLabels.offset, 4),
            borderRadius: defaultValue(dataLabels.borderRadius, 3),
            formatter: formatter
                ? (_, context) => formatter(context.dataIndex, { dataFrame })
                : (value) => compactStringOrNumber(value),
            padding: defaultValue(dataLabels.padding, 4),
        };
    }

    function toDataset(df: DataFrame, s: ChartSeries): ChartJs.ChartDataset {
        if (s.type === 'bar') {
            return {
                type: 'bar',
                data: df.map((entry) => entry[s.valueColumn]),
                backgroundColor: multipleChartJsColors(s.backgroundColor),
                borderColor: multipleChartJsColors(s.borderColor),
                borderWidth: defaultValue(s.borderWidth, 1),
                borderRadius: defaultValue(s.borderRadius, 5),
                label: defaultValue(s.label, ''),
                indexAxis: defaultValue(s.indexAxis, 'x'),
                barPercentage: defaultValue(s.barPercentage, 0.9),
                categoryPercentage: defaultValue(s.categoryPercentage, 0.8),
                datalabels: chartJsDataLabels(s.dataLabels),
            };
        }

        if (s.type === 'line') {
            return {
                type: 'line',
                data: df.map((entry) => entry[s.valueColumn]),
                backgroundColor: singleChartJsColor(s.backgroundColor),
                borderColor: singleChartJsColor(s.borderColor),
                label: defaultValue(s.label, ''),
                fill: chartJsFill(s.fill),
                datalabels: chartJsDataLabels(s.dataLabels),
                tension: defaultValue(s.tension, 0),
                pointRadius: defaultValue(s.pointRadius, 3),
                pointBackgroundColor: defaultValue(s.pointBackgroundColor, 'rgb(255,255,255)'),
                borderDash: defaultValue(s.borderDash, []),
                borderWidth: defaultValue(s.borderWidth, 2),
            };
        }

        if (s.type === 'pie') {
            return {
                type: 'pie',
                label: defaultValue(s.label, ''),
                data: df.map((entry) => entry[s.valueColumn]),
                backgroundColor: multipleChartJsColors(s.backgroundColor),
                datalabels: chartJsDataLabels(s.dataLabels),
            };
        }

        if (s.type === 'radar') {
            return {
                type: 'radar',
                data: df.map((entry) => entry[s.valueColumn]),
                backgroundColor: singleChartJsColor(s.backgroundColor),
                borderColor: singleChartJsColor(s.borderColor),
                label: defaultValue(s.label, ''),
                datalabels: chartJsDataLabels(s.dataLabels),
                pointRadius: defaultValue(s.pointRadius, 3),
                pointBackgroundColor: defaultValue(s.pointBackgroundColor, 'rgb(255,255,255)'),
                borderWidth: defaultValue(s.borderWidth, 2),
            };
        }

        throw new Error(`Unknown chart type: ${(series as any).type}`);
    }

    const chartConfig: ChartJs.ChartConfiguration = {
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
        const chartOptions = chartConfig.options || {};
        chartOptions.aspectRatio = defaultValue(options.aspectRatio, 4 / 3);
        chartOptions.maintainAspectRatio = options.maintainAspectRatio;
        chartOptions.scales = {};
        chartOptions.layout = {
            padding: defaultValue(options?.padding, 12),
        };
        if (options.xAxis) {
            chartOptions.scales.x = {
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
                    },
                },
                grid: {
                    display: !!defaultValue(options.xAxis?.gridLines?.display, true),
                    offset: false,
                    drawBorder: false,
                    color: computeGridLineColor(
                        defaultValue(options.xAxis?.gridLines?.display, true)
                    ),
                },
                ticks: {
                    display: !!defaultValue(options?.xAxis?.ticks?.display, true),
                    color: defaultValue(options?.xAxis?.ticks?.color, 'rgb(86, 86, 86)'),
                    callback: computeFormatTick(
                        defaultValue(options?.xAxis?.ticks?.display, true),
                        options?.xAxis?.type
                    ),
                },
            } as _DeepPartialObject<ChartJs.CartesianScaleOptions>;
        }
        if (options.yAxis) {
            chartOptions.scales.y = {
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
                    },
                },
                grid: {
                    display: !!defaultValue(options.yAxis?.gridLines?.display, true),
                    drawBorder: false,
                    color: computeGridLineColor(
                        defaultValue(options.yAxis?.gridLines?.display, true)
                    ),
                },
                ticks: {
                    display: !!defaultValue(options?.yAxis?.ticks?.display, true),
                    color: defaultValue(
                        singleChartJsColor(options?.yAxis?.ticks?.color),
                        'rgb(86, 86, 86)'
                    ),
                    callback: computeFormatTick(
                        defaultValue(options?.yAxis?.ticks?.display, true),
                        options?.yAxis?.type
                    ),
                },
            } as _DeepPartialObject<ChartJs.CartesianScaleOptions>;
        }
        if (options.rAxis) {
            chartOptions.scales.r = {
                beginAtZero: defaultValue(options?.rAxis?.beginAtZero, true),
                ticks: {
                    display: defaultValue(options?.rAxis?.ticks?.display, true),
                    color: defaultValue(options?.rAxis?.ticks?.color, 'rgb(86, 86, 86)'),
                    callback: computeFormatTick(
                        defaultValue(options?.rAxis?.ticks?.display, true),
                        undefined
                    ),
                },
                grid: {
                    display: defaultValue(options.rAxis?.gridLines?.display, true),
                    drawBorder: false,
                    offset: false,
                    color: computeGridLineColor(
                        defaultValue(options.rAxis?.gridLines?.display, true)
                    ),
                },
            } as _DeepPartialObject<ChartJs.RadialLinearScaleOptions>;
        }
        chartOptions.plugins = {
            legend: {
                display: defaultValue(options?.legend?.display, false),
                position: defaultValue(options?.legend?.position, 'bottom'),
                align: defaultValue(options?.legend?.align, 'center'),
                ...(options.series[0]?.type === 'pie' && { onHover: handleHoverPieChart }),
                ...(options.series[0]?.type === 'pie' && { onLeave: handleLeavePieChart }),
                labels: {
                    filter: (item) => {
                        const formatter = options?.legend?.labels?.formatter;
                        const index =
                            typeof (item as any).index === 'number'
                                ? (item as any).index
                                : item.datasetIndex;
                        // eslint-disable-next-line no-param-reassign
                        item.text = formatter
                            ? formatter(index, { dataFrame })
                            : compactStringOrNumber(item.text);
                        return true;
                    },
                },
            },
            title: {
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
                callbacks: {
                    ...(options.series[0]?.type !== 'pie' && {
                        // Add series name
                        beforeTitle: (items) =>
                            items[0].dataset?.label
                                ?.toString()
                                .replace(/(.*?\s.*?\s.*?\s)/g, '$1\n') || '',
                    }),
                    title: (items) =>
                        dataFrame[items[0].dataIndex][labelColumn]
                            ?.toString()
                            .replace(/(.*?\s.*?\s.*?\s)/g, '$1\n') || '',
                    label: (item) =>
                        item.dataset.data[item.dataIndex]
                            ?.toString()
                            .replace(/(.*?\s.*?\s.*?\s)/g, '$1\n') || '',
                },
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

        if (series[0].type === 'pie' && series[0].dataLabels?.display) {
            chartConfig?.plugins?.push(pieDataLabelsPlugin);
        }
    }

    $: {
        dataFrame = data.value || [];
        series = options.series;
        labelColumn = options.labelColumn;
    }

    $: {
        chartConfig.data.labels = dataFrame.map((entry) =>
            compactStringOrNumber(entry[labelColumn])
        );
        chartConfig.data.datasets = series.map((s) => toDataset(dataFrame, s));
    }
</script>

{#if data.error}
    Error : {JSON.stringify(data.error)}
{:else if options}
    <figure>
        <div class="chart-container">
            <canvas use:chartJs={chartConfig} role="img" aria-label={options.ariaLabel} />
        </div>
        {#if source}
            <div class="source-link">
                <SourceLink {source} />
            </div>
        {/if}
    </figure>
{/if}

<style>
    figure {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .source-link {
        flex-shrink: 1;
        align-self: flex-end;
    }

    .chart-container {
        position: relative;
        width: 100%;
        flex: 1 0 400px;
    }
</style>
