import type {
    ChartOptions as ChartJsChartOptions,
    CartesianScaleOptions,
    RadialLinearScaleOptions,
    Scale,
    Tick,
    GridLineOptions,
} from 'chart.js';
import { DateTime } from 'luxon';
import type { _DeepPartialObject } from 'chart.js/types/utils';
import type {
    CartesianAxisConfiguration,
    ChartOptions,
    GridLinesConfiguration,
    TicksConfiguration,
    TimeCartesianAxisConfiguration,
} from '../types';
import { defaultValue, singleChartJsColor } from './utils';
import { compactStringOrNumber } from '../../utils';

function computeFormatTick(
    displayTick: TicksConfiguration['display'],
    type: CartesianAxisConfiguration['type']
) {
    function formatTick(this: Scale, tickValue: number, _index: number, ticks: Tick[]) {
        const minAbsTickValue = Math.min(...ticks.map((tick) => Math.abs(tick.value)));
        if (displayTick === 'single' && tickValue !== minAbsTickValue) {
            return '';
        }
        if (type === 'category') {
            return compactStringOrNumber(this.getLabelForValue(tickValue));
        }
        return compactStringOrNumber(tickValue);
    }
    return formatTick;
}

const computeGridLineColor: (
    display: GridLinesConfiguration['display']
) => GridLineOptions['color'] = (display) => (context) => {
    const ticksAbsoluteValues = context.scale.ticks.map((tick) => Math.abs(tick.value));
    let minAbsoluteTicksIndex = ticksAbsoluteValues.indexOf(Math.min(...ticksAbsoluteValues));
    if (context.scale.type === 'radialLinear') {
        // On radar, chartjs compute one supplementary grid line
        minAbsoluteTicksIndex -= 1;
    }
    if (display) {
        if (context.index === minAbsoluteTicksIndex) return 'rgba(0, 0, 0, 0.4)';
        if (display !== 'single') return 'rgba(0, 0, 0, 0.1)';
    }
    return 'rgba(0, 0, 0, 0)';
};

const DATE_TOOLTIP_FORMATS = {
    millisecond: 'h:mm:ss.SSS a',
    second: DateTime.DATETIME_MED_WITH_SECONDS,
    minute: DateTime.DATETIME_MED,
    hour: DateTime.DATETIME_MED,
    day: { day: 'numeric', month: 'long' },
    week: 'DD',
    month: { month: 'long', year: 'numeric' },
    quarter: "'Q'q - yyyy",
    year: { year: 'numeric' },
};

function getDateTooltipFormat(unit?: TimeCartesianAxisConfiguration['timeUnit']) {
    if (unit) return DATE_TOOLTIP_FORMATS[unit];
    return undefined;
}

export default function buildScales(options: ChartOptions): ChartJsChartOptions['scales'] {
    const scales: ChartJsChartOptions['scales'] = {};

    // X Axis
    if (options.xAxis) {
        scales.x = {
            type: options?.xAxis?.type,
            ...(options?.xAxis?.type === 'time'
                ? {
                      time: {
                          unit: options?.xAxis?.timeUnit,
                          tooltipFormat: getDateTooltipFormat(options?.xAxis?.timeUnit),
                      },
                  }
                : {}),
            display: options?.xAxis?.display,
            offset: defaultValue(options?.xAxis?.offset, false),
            title: {
                display: options?.xAxis?.title?.display,
                color: defaultValue(options?.xAxis?.title?.color, 'rgb(0, 0, 0)'),
                align: options?.xAxis?.title?.align,
                text: options?.xAxis?.title?.text,
                font: {
                    weight: defaultValue(options?.xAxis?.title?.font?.weight, '400'),
                    size: defaultValue(options?.xAxis?.title?.font?.size, 12),
                },
            },
            grid: {
                display: !!defaultValue(options.xAxis?.gridLines?.display, true),
                offset: false,
                drawBorder: false,
                color: computeGridLineColor(defaultValue(options.xAxis?.gridLines?.display, true)),
            },
            ticks: {
                display: !!defaultValue(options?.xAxis?.ticks?.display, true),
                color: defaultValue(options?.xAxis?.ticks?.color, 'rgb(86, 86, 86)'),
                callback: computeFormatTick(
                    defaultValue(options?.xAxis?.ticks?.display, true),
                    options?.xAxis?.type
                ),
            },
        } as _DeepPartialObject<CartesianScaleOptions>;
    }

    // Y Axis
    if (options.yAxis) {
        scales.y = {
            type: options?.yAxis?.type,
            display: options?.yAxis?.display,
            title: {
                display: options?.yAxis?.title?.display,
                align: options?.yAxis?.title?.align,
                text: options?.yAxis?.title?.text,
                color: defaultValue(options?.yAxis?.title?.color, 'rgb(0, 0, 0)'),
                font: {
                    weight: defaultValue(options?.yAxis?.title?.font?.weight, '400'),
                    size: defaultValue(options?.yAxis?.title?.font?.size, 12),
                },
            },
            grid: {
                display: !!defaultValue(options.yAxis?.gridLines?.display, true),
                drawBorder: false,
                color: computeGridLineColor(defaultValue(options.yAxis?.gridLines?.display, true)),
            },
            ticks: {
                display: !!defaultValue(options?.yAxis?.ticks?.display, true),
                color: defaultValue(
                    singleChartJsColor(options?.yAxis?.ticks?.color),
                    'rgb(86, 86, 86)'
                ),
                callback: computeFormatTick(
                    defaultValue(options?.yAxis?.ticks?.display, true),
                    options?.yAxis?.type
                ),
            },
        } as _DeepPartialObject<CartesianScaleOptions>;
    } else {
        scales.y = { display: false };
    }

    // R Axis
    if (options.rAxis) {
        scales.r = {
            beginAtZero: defaultValue(options?.rAxis?.beginAtZero, true),
            ticks: {
                display: defaultValue(options?.rAxis?.ticks?.display, true),
                color: defaultValue(options?.rAxis?.ticks?.color, 'rgb(86, 86, 86)'),
                callback: computeFormatTick(
                    defaultValue(options?.rAxis?.ticks?.display, true),
                    undefined
                ),
            },
            grid: {
                display: defaultValue(options.rAxis?.gridLines?.display, true),
                drawBorder: false,
                offset: false,
                color: computeGridLineColor(defaultValue(options.rAxis?.gridLines?.display, true)),
            },
        } as _DeepPartialObject<RadialLinearScaleOptions>;
    }

    return scales;
}
