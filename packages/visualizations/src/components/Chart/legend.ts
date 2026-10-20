import { Chart } from 'chart.js';
import type {
    ChartConfiguration,
    FontSpec,
    LegendElement,
    LegendItem,
    LegendOptions,
} from 'chart.js';
import type { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { toFont } from 'chart.js/helpers';
import { assureMaxLength } from 'components/utils/formatter';
import { CATEGORY_ITEM_VARIANT } from 'components/Legend/types';
import type { ChartOptions } from './types';
import { defaultValue, DEFAULT_GREY_COLOR } from './utils';
import { fitLegendTexts } from './legendFit';

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

/** Legend items Chart.js generates for this chart type (one per dataset, or per slice for a pie). */
function defaultLegendItems(chart: Chart): LegendItem[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const typeLabels = (Chart.overrides as any)[(chart.config as { type?: string }).type || '']
        ?.plugins?.legend?.labels;
    const generate =
        typeLabels?.generateLabels || Chart.defaults.plugins.legend.labels.generateLabels;
    return generate(chart);
}

/** Item texts shortened to fit the legend (see `fitLegendTexts`), measured with its font. */
function fitItemTexts(legend: LegendElement<'pie'>, items: LegendItem[]) {
    const { ctx, options } = legend;
    // Set by Chart.js before it builds the labels (layout box size), missing from its types
    const { maxWidth, maxHeight } = legend as unknown as { maxWidth: number; maxHeight: number };
    const { labels } = options;
    // Resolved by then (not a scriptable option anymore)
    const font = toFont(labels.font as Partial<FontSpec>);
    const boxHeight = labels.boxHeight ?? font.size;
    ctx.save();
    ctx.font = font.string;
    const texts = fitLegendTexts(
        items.map((item) => item.text),
        {
            measure: (text) => ctx.measureText(text).width,
            maxWidth,
            maxHeight,
            horizontal: legend.isHorizontal(),
            itemExtraWidth: (labels.boxWidth ?? font.size) + font.size / 2,
            lineHeight: Math.max(font.size, boxHeight) + labels.padding,
            padding: labels.padding,
        }
    );
    ctx.restore();
    items.forEach((item, i) => {
        // eslint-disable-next-line no-param-reassign
        item.text = texts[i];
    });
}

export function buildLegend(options: ChartOptions) {
    const fitLabels = !!options?.legend?.fitLabels;
    const setItemText = (item: LegendItem) => {
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
        /* eslint-enable no-param-reassign */
    };
    const legend: _DeepPartialObject<LegendOptions<'pie'>> = {
        display: defaultValue(options?.legend?.display, false),
        position: defaultValue(options?.legend?.position, 'bottom'),
        align: defaultValue(options?.legend?.align, 'center'),
        ...(options.series[0]?.type === 'pie' && { onHover: handleHoverPieChart }),
        ...(options.series[0]?.type === 'pie' && { onLeave: handleLeavePieChart }),
        labels: {
            boxWidth: 20,
            boxHeight: defaultValue(options?.legend?.boxStyle, 'rect') === 'rect' ? 16 : 0,
            // With `fitLabels`, texts set in `generateLabels` rather than in `filter`, which
            // Chart.js calls afterwards: the fitting needs every final text.
            ...(fitLabels && {
                // `this` is the legend, sized by then
                generateLabels(this: LegendElement<'pie'>, chart: Chart) {
                    const items = defaultLegendItems(chart);
                    items.forEach(setItemText);
                    // On a narrow chart, shorter texts so that every item shows
                    fitItemTexts(this, items);
                    return items;
                },
            }),
            filter: (item) => {
                /* eslint-disable no-param-reassign */
                if (!fitLabels) setItemText(item);
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
