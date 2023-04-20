<script lang="ts">
    import update from 'immutability-helper';
    import type { ChartConfiguration } from 'chart.js';
    import { Chart } from 'chart.js';
    import 'chartjs-adapter-luxon';
    import type { Async } from '../../types';
    import type { DataFrame } from '../types';
    import type { ChartOptions, ChartSeries } from './types';
    import { ChartSeriesType } from './types';
    import { defaultValue } from './utils';
    import toDataset from './datasets';
    import buildScales from './scales';
    import buildLegend from './legend';
    import SourceLink from '../utils/SourceLink.svelte';
    import { defaultNumberFormat } from '../utils/formatter';
    import { generateId } from '../utils';

    export let data: Async<DataFrame>;
    export let options: ChartOptions;

    const chartId = `chart-${generateId()}`;

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
        options: {
            // Display all series values in tooltips
            // https://www.chartjs.org/docs/latest/samples/tooltip/interactions.html
            interaction: {
                intersect: false,
                mode: 'index',
                axis: 'xy',
            },
        },
    };

    // Update local variable from props
    let dataFrame: DataFrame = [];
    let series: ChartSeries[] = [];
    let { labelColumn } = options;

    $: dataFrame = data.value || [];
    $: series = options.series;
    $: labelColumn = options.labelColumn;

    $: chartConfig = update(chartConfig, {
        type: { $set: defaultValue(options.series[0]?.type, ChartSeriesType.Line) },
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
                    label(context) {
                        const {
                            parsed,
                            raw,
                            formattedValue,
                            dataIndex,
                            dataset: { label },
                        } = context;
                        const { type: seriesType } = options.series[0];
                        const format = options?.tooltip?.numberFormatter || defaultNumberFormat;

                        // If the value has a label, we need to add it to the tooltip
                        let prefix = '';
                        if (label && series.length > 1) prefix = `${label}: `;

                        // If the value is a percentage, we need to add the '%' symbol
                        const percentaged = options?.axis?.assemblage?.percentaged ? '% ' : '';
                        // If the value is a percentage, we need to format the raw value
                        const formattedRawValue =
                            percentaged && raw && typeof raw === 'number' && `(${format(raw)})`;
                        const suffix = percentaged + formattedRawValue;

                        if (seriesType && parsed) {
                            if (seriesType === ChartSeriesType.Bar) {
                                if (options.series[0]?.indexAxis === 'y') {
                                    return prefix + format(parsed.x) + suffix;
                                }
                                return prefix + format(parsed.y) + suffix;
                            }
                            if (seriesType === ChartSeriesType.Line) {
                                return prefix + format(parsed.y) + suffix;
                            }
                            if (seriesType === ChartSeriesType.Radar) {
                                return prefix + format(parsed.r);
                            }
                            if (seriesType === ChartSeriesType.Pie) {
                                // For pie charts we need to get the label from the dataFrame because, unlike other
                                // charts, the label is not the series legend, it's the category.
                                return `${dataFrame[dataIndex].x}: ${format(parsed)}`;
                            }
                        }

                        return prefix + formattedValue + suffix;
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
            <canvas
                role="img"
                use:chartJs={chartConfig}
                aria-describedby={options.description ? chartId : undefined}
            />
            {#if options.description}
                <p id={chartId} class="a11y-invisible-description">{options.description}</p>
            {/if}
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

    /* Suitable for elements that are used via aria-describedby or aria-labelledby */
    .a11y-invisible-description {
        display: none;
    }
</style>
