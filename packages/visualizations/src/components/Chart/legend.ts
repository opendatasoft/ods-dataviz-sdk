import type {
    ChartTypeRegistry,
    ChartConfiguration,
    ScatterDataPoint,
    BubbleDataPoint,
    Chart,
} from 'chart.js';
import type { _DeepPartialObject } from 'chart.js/types/utils';
import type { ChartOptions, ChartSeries, CategoryLegend } from '../types';
import { assureMaxLength } from '../utils/formatter';
import { defaultValue } from './utils';

const LEGEND_MAX_LENGTH = 50;

function buildLegendLabels(
    index: number,
    options: ChartOptions,
    chartConfig: ChartConfiguration
): string | unknown {
    /* eslint-disable no-param-reassign */
    const text = options?.legend?.labels?.text;
    if (text) {
        return assureMaxLength(text(index), LEGEND_MAX_LENGTH);
    } else {
        return chartConfig.data.labels?.[index];
    }
    /* eslint-enable no-param-reassign */
}

export default function buildLegend(
    series: ChartSeries[],
    chartConfig: ChartConfiguration,
    options: ChartOptions,
    Chart: _DeepPartialObject<
        Chart<
            keyof ChartTypeRegistry,
            (number | ScatterDataPoint | BubbleDataPoint | null)[],
            unknown
        >
    >
): CategoryLegend {
    let legendOptions;
    if (series.length === 1 && series[0].type === 'pie') {
        legendOptions = {
            type: 'category',
            items: chartConfig.data.datasets[0].data.map((data, i) => ({
                color: chartConfig.data.datasets[0].backgroundColor[i],
                borderColor: chartConfig.data.datasets[0].borderColor?.[i] || 'transparent',
                borderDashed: false,
                label: buildLegendLabels(i, options, chartConfig) || '',
                onClick: (index: number) => {
                    const chart = Chart.getChart('canvas-id');
                    if (chart) {
                        const meta = chart.getDatasetMeta(0);
                        const visible = !meta.data[index].hidden;
                        visible ? chart.hide(0, index) : chart.show(0, index);
                    }
                },
                onHover: (index: number) => {
                    const chart = Chart.getChart('canvas-id');
                    const { tooltip, chartArea } = chart;
                    if (tooltip) {
                        // FIXME: `TooltipModel` doesn't have a `setActiveElements` method.
                        (tooltip as any).setActiveElements(
                            [
                                {
                                    datasetIndex: 0,
                                    index: index,
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
                    const chart = Chart.getChart('canvas-id');
                    const { tooltip } = chart;
                    if (tooltip) {
                        tooltip.setActiveElements([]);
                    }
                    chart.update();
                },
            })),
        };
    } else {
        legendOptions = {
            type: 'category',
            items: series.map((serie) => ({
                color: serie.backgroundColor || serie.fill?.above || serie.fill?.below,
                borderColor:
                    serie.type !== 'pie' ? serie.borderColor || 'transparent' : 'transparent',
                borderDashed: Boolean(serie?.borderDash),
                label: serie.label,
                onClick: (index: number) => {
                    const chart = Chart.getChart('canvas-id');
                    chartConfig.data.datasets[index].hidden =
                        !chartConfig.data.datasets[index].hidden;
                    chart.update();
                },
            })),
        };
    }
    return legendOptions;
}
