<script lang="ts">
    import type { ChartConfiguration } from 'chart.js';
    import { Chart } from 'chart.js';
    import 'chartjs-adapter-luxon';
    import type { Async } from '../../types';
    import type { ChartOptions, ChartSeries, DataFrame } from '../types';
    import { defaultValue } from './utils';
    import toDataset from './datasets';
    import buildScales from './scales';
    import buildLegend from './legend';
    import SourceLink from '../utils/SourceLink.svelte';

    export let data: Async<DataFrame>;
    export let options: ChartOptions;

    let dataFrame: DataFrame = [];
    let series: ChartSeries[] = [];
    let { labelColumn } = options;
    let chart: any;

    // Hook to handle chart lifecycle
    function chartJs(node: HTMLCanvasElement, config: ChartConfiguration) {
        const ctx = node.getContext('2d');
        if (!ctx) throw new Error('Failed to get canvas context');
        chart = new Chart(ctx, config);
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
        chartOptions.maintainAspectRatio = true;
        chartOptions.scales = buildScales(options);
        chartOptions.layout = {
            padding: defaultValue(options?.padding, 12),
        };
        chartOptions.plugins = {
            legend: buildLegend(options),
            title: {
                display: false,
            },
            tooltip: {
                enabled: true,
            },
            subtitle: {
                display: false,
            },
            ...(options?.xAxis?.type === 'time' && options?.xAxis?.timeUnit !== 'year'
                ? {
                    zoom: {
                        pan: {
                            enabled: true,
                            mode: 'x',
                        },
                        limits: {
                            x: {min: options?.xAxis?.zoomPluginMin, max: options?.xAxis?.zoomPluginMax},
                        },
                    }
                  }
                : {}
            ),
        };
        chartConfig.options = chartOptions;
    }

    $: {
        // Use a separate block to only update datasets if there are new data
        chartConfig.data.labels = dataFrame.map((entry) => entry[labelColumn]);
        chartConfig.data.datasets = series.map((s) => toDataset(dataFrame, s));
    }

    let displayTitle: boolean;
    let displaySubtitle: boolean;
    let displayResetZoom: boolean;
    $: displayTitle = defaultValue(options?.title?.display, !!options?.title?.text);
    $: displaySubtitle = defaultValue(options?.subtitle?.display, !!options?.subtitle?.text);
    $: displayResetZoom = defaultValue(options?.xAxis?.type === 'time', false);
</script>

{#if data.error}
    Error : {JSON.stringify(data.error)}
{:else if options}
    <figure>
        {#if displayTitle || displaySubtitle}
            <figcaption>
                {#if displayTitle}
                    <h3>
                        {options.title?.text}
                    </h3>
                {/if}
                {#if displaySubtitle}
                    <p>
                        {options.subtitle?.text}
                    </p>
                {/if}
            </figcaption>
        {/if}
        <div class="chart-container">
            <canvas use:chartJs={chartConfig} role="img" aria-label={options.ariaLabel} />
        </div>
        {#if displayResetZoom}
        <div class="source-link">
            <button class="left-button" on:click={() => chart.pan({x: 10, y: 0})}>
                Scroll left
            </button>
            <button on:click={() => chart.resetZoom()}>
                Reset scroll
            </button>
            <button class="right-button" on:click={() => chart.pan({x: -10, y: 0})}>
                Scroll right
            </button>
        </div>
        {/if}
        {#if options.source}
            <div class="source-link">
                <SourceLink source={options.source} />
            </div>
        {/if}
    </figure>
{/if}

<style>
    figure {
        display: flex;
        flex-direction: column;
        margin: 0;
    }

    figcaption {
        width: 100%;
        margin: 0;
    }

    button {
        margin: 4px;
        font-size: 1rem;
        width: 7rem;
        background-color: #0C2059;
        color: #FFFFFF;
        padding: 4px;
        border-radius: 14px;
    }

    .right-button {
        position: relative;
        height: 100%;
    }
    .right-button:before{
        content: "";
        display: block;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 10px 0 10px 20px;
        border-color: transparent transparent transparent #000;
        position: absolute;
        top: 50%;
        left: 120px;
        margin: -10px 0 0 -7px;
    }

    .left-button {
        position: relative;
        height: 100%;
    }
    .left-button:before {
        content: "";
        display: block;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 10px 0 10px 20px;
        border-color: transparent transparent transparent #000;
        position: absolute;
        top: 50%;
        right: 113px;
        margin: -10px 0 0 -7px;
        transform: rotate(180deg)
    }

    .source-link {
        flex-shrink: 1;
        align-self: center;
    }

    .chart-container {
        position: relative;
        width: 100%;
        flex-grow: 1;
    }
</style>
