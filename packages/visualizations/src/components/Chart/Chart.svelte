<script lang="ts">
    import update from 'immutability-helper';
    import type { ChartConfiguration } from 'chart.js';
    import { Chart } from 'chart.js';
    import 'chartjs-adapter-luxon';
    import type { Async } from '../../types';
    import type { ChartOptions, ChartSeries } from './types';
    import type { DataFrame } from '../types';
    import { defaultValue } from './utils';
    import toDataset from './datasets';
    import buildScales from './scales';
    import buildLegend from './legend';
    import SourceLink from '../utils/SourceLink.svelte';
    import { defaultNumberFormat } from '../utils/formatter';

    export let data: Async<DataFrame>;
    export let options: ChartOptions;

    // Hook to handle chart lifecycle
    function chartJs(node: HTMLCanvasElement, config: ChartConfiguration) {
        const ctx = node.getContext('2d');
        if (!ctx) throw new Error('Failed to get canvas context');
        const chart = new Chart(ctx, config);
        return {
            update(newConfig: ChartConfiguration) {
                Object.assign(chart, newConfig);
                chart.update();
            },
            destroy() {
                chart.destroy();
            },
        };
    }

    // Local chart configuration
    let chartConfig: ChartConfiguration = {
        type: options.series[0]?.type || 'line',
        data: {
            labels: [],
            datasets: [],
        },
        options: {},
    };

    // Update local variable from props
    let dataFrame: DataFrame = [];
    let series: ChartSeries[] = [];
    let { labelColumn } = options;

    $: dataFrame = data.value || [];
    $: series = options.series;
    $: labelColumn = options.labelColumn;

    $: chartConfig = update(chartConfig, {
        type: { $set: defaultValue(options.series[0]?.type, 'line') },
    });
    $: {
        // Reactively update chart configuration
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
                    label({ raw, formattedValue }) {
                        const format = options?.tooltip?.format;
                        if (raw && typeof raw === 'number') return format ? format(raw) : defaultNumberFormat(raw);
                        return formattedValue;
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
        chartConfig = update(chartConfig, { options: { $set: chartOptions } });
    }

    $: {
        const labels = dataFrame.map((entry) => entry[labelColumn]);
        chartConfig = update(chartConfig, { data: { labels: { $set: labels } } });
    }

    $: {
        const datasets = series.map((s) => toDataset(dataFrame, s));
        chartConfig = update(chartConfig, { data: { datasets: { $set: datasets } } });
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
