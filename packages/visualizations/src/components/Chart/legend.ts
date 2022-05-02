import type { ChartConfiguration, Chart } from 'chart.js';
import type { ChartOptions, ChartSeries, CategoryLegend, Color } from '../types';
import { assureMaxLength } from '../utils/formatter';

const LEGEND_MAX_LENGTH = 50;

function buildLegendLabels(
    index: number,
    options: ChartOptions,
    chartConfig: ChartConfiguration
): string {
    const text = options?.legend?.labels?.text;
    if (text) {
        return assureMaxLength(text(index), LEGEND_MAX_LENGTH);
    }
    return `${chartConfig.data.labels?.[index]}`;
}

function computeBackgroundColor(serie: ChartSeries): Color | undefined {
    if (serie.backgroundColor) {
        return serie.backgroundColor;
    }
    if (serie.type === 'line' && !serie.backgroundColor) {
        return serie.fill?.above || serie.fill?.below;
    }
    return undefined;
}

export default function buildLegend(
    series: ChartSeries[],
    chartConfig: ChartConfiguration,
    options: ChartOptions,
    chart: Chart
): CategoryLegend {
    let legendOptions;
    if (series.length === 1 && series[0].type === 'pie') {
        legendOptions = {
            type: 'category' as const,
            items: chartConfig.data.datasets[0].data.map((_data, i) => ({
                color: series[0].backgroundColor?.[i],
                borderDashed: false,
                label: buildLegendLabels(i, options, chartConfig),
                onClick: (index: number) => {
                    if (chart) {
                        chart.toggleDataVisibility(index);
                        chart.update();
                    }
                },
                onHover: (index: number) => {
                    const { tooltip, chartArea } = chart;
                    if (tooltip) {
                        tooltip.setActiveElements(
                            [
                                {
                                    datasetIndex: 0,
                                    index,
                                },
                            ],
                            {
                                x: (chartArea.left + chartArea.right) / 2,
                                y: (chartArea.top + chartArea.bottom) / 2,
                            }
                        );
                    }
                    chart.update();
                },
                onLeave: () => {
                    const { tooltip } = chart;
                    if (tooltip) {
                        tooltip.setActiveElements([], { x: 0, y: 0 });
                    }
                    chart.update();
                },
            })),
        };
    } else {
        legendOptions = {
            type: 'category' as const,
            items: series.map((serie) => ({
                color: computeBackgroundColor(serie),
                borderColor:
                    serie.type !== 'pie' ? serie.borderColor || 'transparent' : 'transparent',
                ...(serie.type === 'line' && { borderDashed: Boolean(serie?.borderDash) }),
                label: serie.label,
                onClick: (index: number) => {
                    /* eslint-disable no-param-reassign */
                    chartConfig.data.datasets[index].hidden =
                        !chartConfig.data.datasets[index].hidden;
                    /* eslint-enable no-param-reassign */
                    chart.update();
                },
            })),
        };
    }
    return legendOptions;
}
