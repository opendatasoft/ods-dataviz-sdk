<script lang="ts">
    import type { ChartConfiguration } from 'chart.js';
    import { Chart } from 'chart.js';
    import 'chartjs-adapter-luxon';
    import type { Async } from '../../types';
    import type {
        ChartOptions,
        ChartSeries,
        DataFrame,
        CategoryLegend as CategoryLegendType,
    } from '../types';
    import { defaultValue } from './utils';
    import toDataset from './datasets';
    import buildScales from './scales';
    import buildLegend from './legend';
    import SourceLink from '../utils/SourceLink.svelte';
    import { defaultNumberFormat } from '../utils/formatter';
    import CategoryLegend from '../utils/CategoryLegend.svelte';

    export let data: Async<DataFrame>;
    export let options: ChartOptions;

    let clientWidth: number;

    let dataFrame: DataFrame = [];
    let series: ChartSeries[] = [];
    let { labelColumn } = options;
    let chart: Chart;

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
            legend: { display: false },
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
        chartConfig.data.datasets = series.map((s) => toDataset(dataFrame, s));
    }

    // Legend related variables
    let legendPosition: string;
    $: legendPosition =
        clientWidth <= 375 ? 'bottom' : defaultValue(options?.legend?.position, 'bottom');
    let legendAlign: 'vertical' | 'horizontal';
    $: legendAlign = clientWidth <= 375 || legendPosition === 'right' ? 'vertical' : 'horizontal';
    let legendOptions: CategoryLegendType;
    $: legendOptions = buildLegend(series, chartConfig, options, chart);

    let displayTitle: boolean;
    let displaySubtitle: boolean;
    $: displayTitle = defaultValue(options?.title?.display, !!options?.title?.text);
    $: displaySubtitle = defaultValue(options?.subtitle?.display, !!options?.subtitle?.text);
</script>

{#if data.error}
    Error : {JSON.stringify(data.error)}
{:else if options}
    <figure bind:clientWidth class="chart-figure legend--{legendPosition}">
        {#if displayTitle || displaySubtitle}
            <figcaption class="chart-header-container">
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
            <canvas
                use:chartJs={chartConfig}
                role="img"
                aria-label={options.ariaLabel}
            />
        </div>
        <div class="chart-source-container">
            {#if options.source}
                <hr width={100} size={1} color={'#E2E6EE'} />
                <SourceLink source={options.source} />
            {/if}
        </div>
        <figcaption class="chart-legend-container">
            {#if options?.legend?.display}
                <CategoryLegend {legendOptions} align={legendAlign} />
            {/if}
        </figcaption>
    </figure>
{/if}

<style>
    .chart-figure {
        display: grid;
        margin: 0;
    }

    .legend--bottom {
        grid:
            [row1-start] 'header header header' auto [row1-end]
            [row2-start] 'chart chart chart' auto [row2-end]
            [row3-start] 'legend legend legend' auto [row3-end]
            [row4-start] 'source source source' auto [row4-end]
            / 1fr 1fr 1fr;
    }

    .legend--right {
        grid:
            [row1-start] 'header header header header header' auto [row1-end]
            [row2-start] 'chart chart chart chart legend' auto [row2-end]
            [row3-start] 'source source source source source' auto [row3-end]
            / 1fr 1fr 1fr 1fr 1fr;
    }

    .chart-header-container {
        width: 100%;
        margin: 0;
        grid-area: header;
    }

    .chart-container {
        position: relative;
        width: 100%;
        grid-area: chart;
    }

    .chart-legend-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin: auto;
        grid-area: legend;
    }

    .chart-source-container {
        display: flex;
        flex-direction: column;
        align-self: center;
        grid-area: source;
    }
</style>
