<script lang="ts">
    import update from 'immutability-helper';
    import type { ChartConfiguration } from 'chart.js';
    import { Chart } from 'chart.js';
    import 'chartjs-adapter-luxon';
    import type { Async } from '../../types';
    import type { DataFrame } from '../types';
    import { generateId } from '../utils';
    import SourceLink from '../utils/SourceLink.svelte';
    import { defaultNumberFormat } from '../utils/formatter';
    import CategoryLegend from '../Legend/CategoryLegend.svelte';
    import type { LegendPositions, CategoryLegend as CategoryLegendType } from '../Legend/types';
    import { ChartSeriesType } from './types';
    import type { ChartOptions, ChartSeries } from './types';
    import { defaultValue } from './utils';
    import toDataset from './datasets';
    import buildScales from './scales';
    import { buildLegend, buildCustomLegend } from './legend';

    export let data: Async<DataFrame>;
    export let options: ChartOptions;

    const chartId = `chart-${generateId()}`;

    let chart: Chart;
    let clientWidth: number;
    // Hook to handle chart lifecycle
    function chartJs(node: HTMLCanvasElement, config: ChartConfiguration) {
        const ctx = node.getContext('2d');
        if (!ctx) throw new Error('Failed to get canvas context');
        chart = new Chart(ctx, config);
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
        /* Kills ChartJS legend if in custom mode
         * To be deleted when fully switching to home made one */
        const legend = options.legend?.custom ? { display: false } : buildLegend(options);
        chartOptions.aspectRatio = defaultValue(options.aspectRatio, 4 / 3);
        chartOptions.maintainAspectRatio = true;
        chartOptions.scales = buildScales(options);
        chartOptions.layout = {
            padding: defaultValue(options?.padding, 12),
        };
        chartOptions.plugins = {
            legend,
            title: {
                display: false,
            },
            tooltip: {
                enabled: defaultValue(options?.tooltip?.display, true),
                rtl: defaultValue(options?.tooltip?.rtl, false),
                textDirection: defaultValue(options?.tooltip?.rtl, false) ? 'rtl' : 'ltr',
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
                        const percentaged = options?.axis?.assemblage?.percentaged ? '%' : '';
                        let percentagedRawValue = '';
                        if (percentaged) {
                            // If the value is a percentage, we need to format the raw value
                            percentagedRawValue = ` ${
                                typeof raw === 'number' ? `(${format(raw)})` : '(0)'
                            }`;
                        }

                        const suffix = percentaged + percentagedRawValue;

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
                            if (
                                [ChartSeriesType.Pie, ChartSeriesType.Doughnut].includes(seriesType)
                            ) {
                                // For pie and doughnut charts we need to get the label from the dataFrame because, unlike other
                                // charts, the label is not the series legend, it's the category.
                                return `${dataFrame[dataIndex].x}: ${format(parsed)}`;
                            }
                            if (seriesType === ChartSeriesType.Scatter) {
                                prefix= `${label} `
                                return prefix + `(x: ${format(parsed.x)} | y: ${format(parsed.y)})` + suffix;
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
                replaceTooltipLabel: false,
            },
        };

        /**
         * We cannot use a type guard due to a bug in ChartJS
         * https://github.com/chartjs/Chart.js/issues/10896#issuecomment-1660559770
         */
        const { type: seriesType } = options.series[0];
        if (seriesType === ChartSeriesType.Doughnut) {
            (chartOptions as Exclude<ChartConfiguration<'doughnut'>['options'], undefined>).cutout =
                options.series[0].cutout;
        }
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

    let legendPosition: LegendPositions;
    $: legendPosition =
        clientWidth <= 375 ? 'bottom' : defaultValue(options?.legend?.position, 'bottom');
    let legendOptions: CategoryLegendType;
    $: if (options?.legend?.custom) {
        legendOptions = buildCustomLegend({ chart, options, chartConfig });
    }
</script>

{#if data.error}
    Error : {JSON.stringify(data.error)}
{:else if options}
    <div bind:clientWidth class="container">
        {#if displayTitle || displaySubtitle}
            <div class="header">
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
            </div>
        {/if}
        <figure class="chart legend--{legendPosition}">
            <canvas
                role="img"
                use:chartJs={chartConfig}
                aria-describedby={options.description ? chartId : undefined}
            />
            {#if options.description}
                <p id={chartId} class="a11y-invisible-description">{options.description}</p>
            {/if}
            {#if options?.legend?.custom}
                <figcaption>
                    <CategoryLegend {legendOptions} />
                </figcaption>
            {/if}
        </figure>
        {#if options.source}
            <SourceLink source={options.source} />
        {/if}
    </div>
{/if}

<style>
    .container {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .header {
        width: 100%;
        margin: 0;
    }

    figure {
        position: relative;
        width: 100%;
        flex-grow: 1;
        margin: 0;
        display: flex;
    }
    .legend--bottom {
        flex-direction: column;
    }
    .legend--right {
        flex-direction: row;
    }

    figcaption {
        display: grid;
        justify-content: center;
        grid-gap: 3px 13px;
        grid-template-columns: repeat(auto-fit, minmax(120px, max-content));
        padding: 13px 0;
    }

    /* Suitable for elements that are used via aria-describedby or aria-labelledby */
    .a11y-invisible-description {
        display: none;
    }
</style>
