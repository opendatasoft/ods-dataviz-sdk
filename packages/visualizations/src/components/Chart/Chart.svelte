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

    /** The two functions below are handling the focus on the right part of the Pie Chart on hover on the legend
    * and requires that every data in the Pie Chart must have a unique color */
    function handleHoverPieChart(evt:any, item:any, legend:any) {
        legend.chart.data.datasets[0].backgroundColor.forEach((color:any, index:any, colors:any) => {
            if (color.length === 7) {
                colors[index] = index === item.index ? color : color + '4D';
            } else if (color.slice(0,3) === 'rgb') {
                colors[index] = index === item.index ? color : color.slice(0, -1) + ',0.3)';
            }
        });
        const chart = legend.chart;
        const tooltip = chart.tooltip;
        const chartArea = chart.chartArea;
        tooltip.setActiveElements([{
            datasetIndex: 0,
            index: item.index,
        }], {
            x: (chartArea.left + chartArea.right) / 2,
            y: (chartArea.top + chartArea.bottom) / 2,
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

    // The function below displays the "0" tick on the chart
    function displayZeroTick(this:any, val:string | number) {
        if (val === 0) {
            return this.getLabelForValue(val)
        }
        return '';
    }

    /** The functions below are handling the format and display of too long strings or big numbers
     * for the ticks, legends and datalabels, They are implemented by default to make an easier chart implementation. */

    // The formatter variable will display the right number format according to a locale variable
     const formatter = new Intl.NumberFormat('fr', {
        notation: 'compact',
    });

    // This is a generic function that checks if the value is a string or a number and returns a formatted version
    function formatStringOrNumber(value: any) {
        if (isNaN(value)) {
            if (value.length > 10) {
                return value.slice(0, 10) + '...';
            } else {
                return value;
            }
        } else {
            return formatter.format(value).toString();
        }
    }

    // The ticks format handler depends of type of axis and return the formatted value
    function handleLongTicksLabel(this:any, value:any, index:number, values:[]) {
        if (this.type === 'linear' || this.type === 'radialLinear') {
            return formatStringOrNumber(value);
        } else if (this.type === 'category'){
            return formatStringOrNumber(this.getLabelForValue(value));
        } else {
            return formatStringOrNumber(value);
        }
    }

    // The legend format handler is set upon the chartjs filter method, sets legend text and return always true
    function handleLongLegendLabel(item:any, data:any) {
        item.text = formatStringOrNumber(item.text);
        return true;
    }

    // The legend with value format handler is set upon the chartjs filter method, sets legend text after formatting text and value separately
    function handleLongLegendWithValuesLabel(item:any, data:any) {
        const firstLabel = formatStringOrNumber(item.text);
        const secondLabel = formatStringOrNumber(data.datasets[0].data[item.index])
        item.text = `${firstLabel} - ${secondLabel}`
        return true;
    }

    /**  The datalabels displaying x and y labels handler, creates a new formatted array of value to send to datalabels formatter
     * We need to recreate a new array in the particular case where the datalabels will display both text and values from x and y data */
    function handleLongDataLabels(dataFrame: DataFrame) {
        const formattedDataFrame:DataFrame = [];

        for (let i = 0; i<dataFrame.length; i ++) {
            let xData = formatStringOrNumber(dataFrame[i].x);
            let yData = formatStringOrNumber(dataFrame[i].y);

            formattedDataFrame.push({x: xData, y: yData})
        }
        return formattedDataFrame;
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
            color: (context) => {
                if (context.dataset.borderColor) {
                    return context.dataset.borderColor;
                } else if (dataLabels.color) {
                    return chartJsColorPalette(dataLabels.color) ;
                } else {
                    return 'rgb(0, 0, 0)';
                }
            },
            backgroundColor: (context) => {
                if (options.series[0]?.type === 'pie') {
                    return context.dataset.backgroundColor[context.dataIndex]
                } else {
                    defaultValue(chartJsColorPalette(dataLabels.backgroundColor), 'rgb(255,255,255)')
                }
            },
            offset: defaultValue(dataLabels.offset, 4),
            borderRadius: defaultValue(dataLabels.borderRadius, 3),
            formatter: formatter
                ? (value, context) => {
                      const formattedDataFrame = handleLongDataLabels(dataFrame);
                      return formatter(context.dataIndex, formattedDataFrame);
                  }
                : (value, context) => {
                      return formatStringOrNumber(value);
                  },
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
                borderWidth: defaultValue(series.borderWidth, 1),
                borderRadius: defaultValue(series.borderRadius, 5),
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
                pointBackgroundColor: defaultValue(series.pointBackgroundColor, 'rgb(255,255,255)'),
                borderDash: defaultValue(series.borderDash, []),
                borderWidth: defaultValue(series.borderWidth, 2),
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
                pointRadius: defaultValue(series.pointRadius, 3),
                pointBackgroundColor: defaultValue(series.pointBackgroundColor, 'rgb(255,255,255)'),
                borderWidth: defaultValue(series.borderWidth, 2),
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
                            /** The code below aims to display the right dark gridline depending on the ticks values:
                            * If there are negative and positive values then the "0" gridline will be displayed
                            * If there are only positive values the dark gridline will be at the bottom
                            * If there are only negative values the dark gridline will be at the top
                            * We achieve that by looking for the lowest absolute values of the present ticks */
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
                    ...(options?.xAxis?.ticks?.zeroTick === true ? {callback: displayZeroTick} : {callback: handleLongTicksLabel}),
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
                            /** The code below aims to display the right dark gridline depending on the ticks values:
                            * If there are negative and positive values then the "0" gridline will be displayed
                            * If there are only positive values the dark gridline will be at the bottom
                            * If there are only negative values the dark gridline will be at the top
                            * We achieve that by looking for the lowest absolute values of the present ticks */
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
                    ...(options?.yAxis?.ticks?.zeroTick === true ? {callback: displayZeroTick} : {callback: handleLongTicksLabel}),
                },
            };
        }
        const gridRColor = options?.rAxis?.gridLines?.color;
        if (options.rAxis) {
            chartOptions.scales['r'] = {
                beginAtZero: defaultValue(options?.rAxis?.beginAtZero, true),
                ticks: {
                    display: defaultValue(options?.rAxis?.ticks?.display, true),
                    color: defaultValue(options?.rAxis?.ticks?.color, 'rgb(86, 86, 86)'),
                    callback: handleLongTicksLabel,
                },
                grid: {
                    display: defaultValue(options?.rAxis?.gridLines?.display, true),
                    borderColor: defaultValue(options?.rAxis?.gridLines?.borderColor, 'rgba(0, 0, 0, 0.4)'),
                    drawBorder: defaultValue(options?.rAxis?.gridLines?.drawBorder, false),
                    ...(gridRColor && {
                        color: (context, proxy) => {
                            /** The code below aims to display the right dark gridline depending on the ticks values:
                            * If there are negative and positive values then the "0" gridline will be displayed
                            * If there are only positive values the dark gridline will be at the bottom
                            * If there are only negative values the dark gridline will be at the top
                            * We achieve that by looking for the lowest absolute values of the present ticks */
                            const ticksArray = proxy._context.scale.ticks;
                            const ticksAbsoluteValues = ticksArray.map((tick:any)=>Math.abs(tick.value))
                            const minAbsoluteTicksIndex = ticksAbsoluteValues.indexOf(Math.min(...ticksAbsoluteValues))-1;
                            return gridRColor(context.index, minAbsoluteTicksIndex);
                        },
                    }),
                    offset: defaultValue(options?.rAxis?.gridLines?.offset, false),
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
                labels: {
                    ...(options?.legend?.labels?.legendWithValues === true ? {filter: handleLongLegendWithValuesLabel} : {filter: handleLongLegendLabel}),
                },
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
                callbacks: {
                    ...(options.series[0]?.type !== 'pie' &&
                    {
                        beforeTitle: (context) => {
                        return context[0].dataset.label.toString().replace(/(.{25})/g,"$&" + "\n");
                        },
                    }),
                    title: (context) => {
                        return dataFrame[context[0].dataIndex][labelColumn].toString().replace(/(.{25})/g,"$&" + "\n");
                    },
                    label: (context) => {
                        return context.dataset.data[context.dataIndex].toString().replace(/(.{25})/g,"$&" + "\n");
                    },
                }
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
        chartConfig.data.labels = dataFrame.map((entry) => formatStringOrNumber(entry[labelColumn]));
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
