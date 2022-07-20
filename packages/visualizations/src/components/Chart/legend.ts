import type { LegendOptions, ChartTypeRegistry } from 'chart.js';
import type { _DeepPartialObject } from 'chart.js/types/utils';
import type { ChartOptions } from '../types';
import { assureMaxLength } from '../utils/formatter';
import { defaultValue } from './utils';

const LEGEND_MAX_LENGTH = 50;

const handleHoverPieChart: LegendOptions<'pie'>['onHover'] = (_, item, legend) => {
    const { tooltip, chartArea } = legend.chart;
    if (tooltip) {
        // FIXME: `TooltipModel` doesn't have a `setActiveElements` method.
        (tooltip as any).setActiveElements(
            [
                {
                    datasetIndex: 0,
                    index: (item as any).index,
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

export default function buildLegend(
    options: ChartOptions
): _DeepPartialObject<LegendOptions<keyof ChartTypeRegistry>> {
    const legend: _DeepPartialObject<LegendOptions<keyof ChartTypeRegistry>> = {
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
                        typeof (item as any).index === 'number'
                            ? (item as any).index
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
