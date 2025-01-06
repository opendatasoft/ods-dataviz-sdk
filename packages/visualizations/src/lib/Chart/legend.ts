import type { LegendOptions, ChartConfiguration, Chart } from 'chart.js';
import type { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { assureMaxLength } from '$lib/utils/formatter';
import { CATEGORY_ITEM_VARIANT } from '$lib/Legend/types';
import type { ChartOptions } from './types';
import { defaultValue, DEFAULT_GREY_COLOR } from './utils';

const LEGEND_MAX_LENGTH = 50;

const handleHoverPieChart: LegendOptions<'pie'>['onHover'] = (_, item, legend) => {
    const { tooltip, chartArea } = legend.chart;
    if (tooltip) {
        // FIXME: `TooltipModel` doesn't have a `setActiveElements` method.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (tooltip as any).setActiveElements(
            [
                {
                    datasetIndex: 0,
                    index: (item as any).index, // eslint-disable-line @typescript-eslint/no-explicit-any
                },
            ],
            {
                x: (chartArea.left + chartArea.right) / 2,
                y: (chartArea.top + chartArea.bottom) / 2,
            }
        );
    }
    legend.chart.update();
};

const handleLeavePieChart: LegendOptions<'pie'>['onLeave'] = (_evt, _item, legend) => {
    legend.chart.update();
};

export function buildLegend(options: ChartOptions) {
    const legend: _DeepPartialObject<LegendOptions<'pie'>> = {
        display: defaultValue(options?.legend?.display, false),
        position: defaultValue(options?.legend?.position, 'bottom'),
        align: defaultValue(options?.legend?.align, 'center'),
        ...(options.series[0]?.type === 'pie' && { onHover: handleHoverPieChart }),
        ...(options.series[0]?.type === 'pie' && { onLeave: handleLeavePieChart }),
        labels: {
            boxWidth: 20,
            boxHeight: defaultValue(options?.legend?.boxStyle, 'rect') === 'rect' ? 16 : 0,
            filter: (item) => {
                 
                const text = options?.legend?.labels?.text;
								if (text) {
									const index =
										typeof (item as any).index === 'number' // eslint-disable-line @typescript-eslint/no-explicit-any
											? (item as any).index // eslint-disable-line @typescript-eslint/no-explicit-any
											: item.datasetIndex;
									item.text = text(index);
								}
								item.text = assureMaxLength(item.text, LEGEND_MAX_LENGTH);
								if (options?.legend?.boxStyle === 'dash') {
									item.lineWidth = 1;
									item.lineDash = [4, 2];
								} else if (options?.legend?.boxStyle === 'rect') {
									item.borderRadius = 3;
								}
								return true;
                 
            },
        },
    };
    return legend;
}

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

export function buildPieAndDoughnutCustomLegend({
    chart,
    options,
    chartConfig,
}: {
    chart: Chart;
    options: ChartOptions;
    chartConfig: ChartConfiguration;
}) {
    const { series } = options;
    const backgroundColors = series[0].backgroundColor?.length
        ? series[0].backgroundColor
        : [DEFAULT_GREY_COLOR];
    return {
        type: 'category' as const,
        position: defaultValue(options?.legend?.position, 'bottom'),
        align: defaultValue(options?.legend?.align, 'center'),
        items: chartConfig.data.datasets[0].data.map((_data, i) => ({
            color: backgroundColors[i % backgroundColors.length],
            variant: CATEGORY_ITEM_VARIANT.Box,
            dashed: false,
            label: buildLegendLabels(i, options, chartConfig),
            onClick: (index: number) => {
                if (chart) {
                    chart.toggleDataVisibility(index);
                    chart.update();
                }
            },
            onHover: (index: number, isVisible = true) => {
                const { tooltip, chartArea } = chart;
                if (tooltip && isVisible) {
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
}
