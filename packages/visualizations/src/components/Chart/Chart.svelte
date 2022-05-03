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
    import { defaultNumberFormat } from '../utils/formatter';

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
                enabled: defaultValue(options?.tooltip?.display, true),
                callbacks: {
                    label(context) {
                        const format = options?.tooltip?.label;
                        if (format) return format(context.dataIndex);
                        const rawValue = context.raw;
                        if (typeof rawValue === 'number') return defaultNumberFormat(rawValue);
                        return context.formattedValue;
                    },
                },
            },
            subtitle: {
                display: false,
            },
            stacked100: {
                // Enables the 100% percent stacking
                enable: options?.axis?.assemblage?.percentaged,
            },
        };
        chartConfig.options = chartOptions;
    }

    $: {
        // Use a separate block to only update datasets if there are new data
        chartConfig.data.labels = dataFrame.map((entry) => entry[labelColumn]);
        chartConfig.data.datasets = series.map((s, i) => toDataset(
            dataFrame, s, options.axis?.y?.distinctAxis ? `y${i}` : undefined,
        ));
    }

    let displayTitle: boolean;
    let displaySubtitle: boolean;
    $: displayTitle = defaultValue(options?.title?.display, !!options?.title?.text);
    $: displaySubtitle = defaultValue(options?.subtitle?.display, !!options?.subtitle?.text);
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
        {#if options.source}
            <SourceLink source={options.source} />
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

    .chart-container {
        position: relative;
        width: 100%;
        flex-grow: 1;
    }
</style>
