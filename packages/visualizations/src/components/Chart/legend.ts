import type { LegendOptions, ChartConfiguration, Chart } from 'chart.js';
import type { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { assureMaxLength } from 'components/utils/formatter';
import { CATEGORY_ITEM_VARIANT } from 'components/Legend/types';
import type { CategoryItem, CategoryLegend } from 'components/Legend/types';
import type { Color } from 'types';
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
                /* eslint-disable no-param-reassign */
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
                /* eslint-enable no-param-reassign */
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

/**
 * Title, variant and max height of a custom legend (read only when `legend.custom`).
 * The title is styled like the x axis title, so both read as chart labels.
 */
function customLegendLayout(options: ChartOptions) {
    const axisTitle = options?.axis?.x?.title;
    return {
        title: options?.legend?.title,
        variant: options?.legend?.variant,
        maxHeight: options?.legend?.maxHeight,
        titleStyle: {
            // Chart.js also accepts a color per line; the legend title is a single line
            color: typeof axisTitle?.color === 'string' ? axisTitle.color : 'rgb(0, 0, 0)',
            fontSize: defaultValue(axisTitle?.font?.size, 12),
            fontWeight: defaultValue(axisTitle?.font?.weight, '400'),
        },
    };
}

/** First color of a series color option (a single color, or one per data point). */
function firstColor(color: Color | Color[] | undefined): Color | undefined {
    return Array.isArray(color) ? color[0] : color;
}

/**
 * Custom (HTML) legend of line and bar charts: one item per series, with its label and color.
 * Clicking an item hides or shows that series.
 */
export function buildCartesianCustomLegend({
    chart,
    options,
}: {
    chart: Chart;
    options: ChartOptions;
}): CategoryLegend {
    const boxStyle = defaultValue(options?.legend?.boxStyle, 'rect');
    return {
        type: 'category' as const,
        position: defaultValue(options?.legend?.position, 'bottom'),
        align: defaultValue(options?.legend?.align, 'center'),
        ...customLegendLayout(options),
        items: options.series.map((serie): CategoryItem => {
            const label = assureMaxLength(
                ('label' in serie && serie.label) || '',
                LEGEND_MAX_LENGTH
            );
            const backgroundColor = firstColor(
                'backgroundColor' in serie ? serie.backgroundColor : undefined
            );
            const borderColor = firstColor('borderColor' in serie ? serie.borderColor : undefined);
            const onClick = (index: number) => {
                if (chart) {
                    chart.setDatasetVisibility(index, !chart.isDatasetVisible(index));
                    chart.update();
                }
            };
            if (boxStyle === 'line' || boxStyle === 'dash') {
                return {
                    variant: CATEGORY_ITEM_VARIANT.Line,
                    borderColor: borderColor || backgroundColor || DEFAULT_GREY_COLOR,
                    dashed: boxStyle === 'dash',
                    label,
                    onClick,
                };
            }
            return {
                variant: CATEGORY_ITEM_VARIANT.Box,
                color: backgroundColor || borderColor || DEFAULT_GREY_COLOR,
                borderColor,
                label,
                onClick,
            };
        }),
    };
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
        ...customLegendLayout(options),
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
