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
    import type { ChartOptions, ChartSeries, ColorConfiguration, DataFrame } from '../types';
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

    function chartJsColor(config?: ColorConfiguration) {
        return config?.colors;
    }

    function toDataset(dataFrame: DataFrame, series: ChartSeries): ChartJs.ChartDataset {
        if (series.type === 'bar') {
            return {
                type: 'bar',
                data: dataFrame.map((entry) => entry[series.valueColumn]),
                backgroundColor: chartJsColor(series.backgroundColor),
                label: series.label || '',
            };
        }

        if (series.type === 'line') {
            return {
                type: 'line',
                data: dataFrame.map((entry) => entry[series.valueColumn]),
                backgroundColor: chartJsColor(series.backgroundColor),
                label: series.label || '',
            };
        }

        throw new Error('Unknown chart type: ' + (series as any).type);
    }

    let chartConfig: ChartJs.ChartConfiguration = {
        type: 'bar',
        data: {
            labels: [],
            datasets: [],
        },
        options: {},
    };

    $: {
        let chartOptions = chartConfig.options || {};
        chartOptions.aspectRatio = options.aspectRatio;
        chartOptions.animation = false;
        chartOptions.scales = {
            x: {
                type: options?.xAxis?.type,
                display: options?.xAxis?.display,
                scaleLabel: {
                    display: options?.xAxis?.label?.display,
                    align: options?.xAxis?.label?.align,
                    labelString: options?.xAxis?.label?.value,
                },
                gridLines: {
                    display: options?.xAxis?.gridLines?.display !== false, // Default to true
                },
            },
            y: {
                type: options?.yAxis?.type,
                display: options?.yAxis?.display,
                scaleLabel: {
                    display: options?.yAxis?.label?.display,
                    align: options?.yAxis?.label?.align,
                    labelString: options?.yAxis?.label?.value,
                },
                gridLines: {
                    display: options?.yAxis?.gridLines?.display !== false, // Default to true
                },
            },
        };
        chartOptions.legend = {
            display: options?.legend?.display !== false, // Default to true
            position: options?.legend?.position || 'bottom',
            align: options?.legend?.align || 'center',
        };
        chartOptions.title = {
            display: options?.title?.display,
            position: options?.title?.position || 'top',
            align: options?.title?.align || 'center',
            text: options?.title?.text || '',
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
