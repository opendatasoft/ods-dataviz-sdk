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
} from './types';
import { defaultValue, singleChartJsColor } from './utils';
import { assureMaxLength, defaultCompactNumberFormat } from '../utils/formatter';
import type { DataFrame } from '../types';

const TICK_MAX_LENGTH = 40;

function computeFormatTick(
    displayTick: TicksConfiguration['display'],
    type: CartesianAxisConfiguration['type'],
    formatNumber: (value: number) => string
) {
    function formatTick(this: Scale, tickValue: number, _index: number, ticks: Tick[]) {
        const minAbsTickValue = Math.min(...ticks.map((tick) => Math.abs(tick.value)));
        if (displayTick === 'single' && tickValue !== minAbsTickValue) {
            return '';
        }
        if (type === 'category') {
            return assureMaxLength(this.getLabelForValue(tickValue), TICK_MAX_LENGTH);
        }
        if (type === 'time') {
            return tickValue;
        }
        return formatNumber(tickValue);
    }
    return formatTick;
}

const computeGridLineColor: (
    display: GridLinesConfiguration['display']
) => GridLineOptions['color'] = (display) => (context) => {
    if (!context?.scale?.ticks) return 'rgba(0, 0, 0, 0)';
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

// FIXME
// -add checks on other time units if the approach of passing dataFrame to buildScales seems reasonable
// -send an error or message to display instead of fallback
function isRangeTimeUnitCompatible(min: string, max: string, unit: string | undefined) {
    let stepSize = 86400 * 1000;
    let minTimestamp;
    let splittedMin;
    let maxTimestamp;
    let splittedMax;
    if (min && max && unit) {
        switch (unit) {
            case "day":
                stepSize = 86400 * 1000;
                splittedMin = min.split("-");
                minTimestamp = new Date(
                    Number(splittedMin[0]), Number(splittedMin[1]) - 1, Number(splittedMin[2])).getTime();
                splittedMax = max.split("-");
                maxTimestamp = new Date(
                    Number(splittedMax[0]), Number(splittedMax[1]) - 1, Number(splittedMax[2])).getTime();
                break;
            case "month":
                stepSize = 30*86400 * 1000;
                splittedMin = min.split("-");
                minTimestamp = new Date(
                    Number(splittedMin[0]), Number(splittedMin[1]) - 1).getTime();
                splittedMax = max.split("-");
                maxTimestamp = new Date(
                    Number(splittedMax[0]), Number(splittedMax[1]) - 1).getTime();
                break;
            case "year":
                stepSize = 12*30*86400 * 1000;
                minTimestamp = new Date(
                    Number(min)).getTime();
                maxTimestamp = new Date(
                    Number(max)).getTime();
                break;
            default:
                stepSize = 86400 * 1000;
                splittedMin = min.split("-");
                minTimestamp = new Date(
                    Number(splittedMin[0]), Number(splittedMin[1]) - 1, Number(splittedMin[2])).getTime();
                splittedMax = max.split("-");
                maxTimestamp = new Date(
                    Number(splittedMax[0]), Number(splittedMax[1]) - 1, Number(splittedMax[2])).getTime();
        }
        if (maxTimestamp - minTimestamp > (100000 * stepSize)) {
          return false;
        }
        return true;
    }
    return true;
}

export default function buildScales(options: ChartOptions, dataFrame: DataFrame): ChartJsChartOptions['scales'] {
    const scales: ChartJsChartOptions['scales'] = {};
    // X Axis
    if (options.axis?.x) {
        scales.x = {
            stacked: options.axis?.assemblage?.stacked,
            max:
                options?.axis?.x?.type === 'linear' && options.axis?.assemblage?.percentaged
                    ? 100
                    : undefined,
            type: options?.axis?.x?.type,
            ...(options?.axis?.x?.type === 'time'
                ? {
                      time: {
                          ...(isRangeTimeUnitCompatible(
                                dataFrame[0]?.x, dataFrame[dataFrame.length - 1]?.x, options?.axis?.x?.timeUnit
                            )
                          ? { unit: options?.axis?.x?.timeUnit }
                          : {}),
                          tooltipFormat: getDateTooltipFormat(options?.axis?.x?.timeUnit),
                      },
                  }
                : {}),
            display: options?.axis?.x?.display,
            offset: defaultValue(options?.axis?.x?.offset, false),
            title: {
                display: options?.axis?.x?.title?.display,
                color: defaultValue(options?.axis?.x?.title?.color, 'rgb(0, 0, 0)'),
                align: options?.axis?.x?.title?.align,
                text: options?.axis?.x?.title?.text,
                font: {
                    weight: defaultValue(options?.axis?.x?.title?.font?.weight, '400'),
                    size: defaultValue(options?.axis?.x?.title?.font?.size, 12),
                },
            },
            grid: {
                display: !!defaultValue(options.axis?.x?.gridLines?.display, true),
                offset: false,
                drawBorder: false,
                color: computeGridLineColor(
                    defaultValue(options.axis?.x?.gridLines?.display, true)
                ),
            },
            ticks: {
                display: !!defaultValue(options?.axis?.x?.ticks?.display, true),
                color: defaultValue(options?.axis?.x?.ticks?.color, 'rgb(86, 86, 86)'),
                callback: computeFormatTick(
                    defaultValue(options?.axis?.x?.ticks?.display, true),
                    options?.axis?.x?.type,
                    defaultValue(options?.axis?.x?.ticks?.format, defaultCompactNumberFormat)
                ),
            },
        } as _DeepPartialObject<CartesianScaleOptions>;
    }

    // Y Axis
    if (options.axis?.y) {
        scales.y = {
            stacked: options.axis?.assemblage?.stacked,
            max:
                options?.axis?.y?.type === 'linear' && options.axis?.assemblage?.percentaged
                    ? 100
                    : undefined,
            type: options?.axis?.y?.type,
            display: options?.axis?.y?.display,
            title: {
                display: options?.axis?.y?.title?.display,
                align: options?.axis?.y?.title?.align,
                text: options?.axis?.y?.title?.text,
                color: defaultValue(options?.axis?.y?.title?.color, 'rgb(0, 0, 0)'),
                font: {
                    weight: defaultValue(options?.axis?.y?.title?.font?.weight, '400'),
                    size: defaultValue(options?.axis?.y?.title?.font?.size, 12),
                },
            },
            grid: {
                display: !!defaultValue(options.axis?.y?.gridLines?.display, true),
                drawBorder: false,
                color: computeGridLineColor(
                    defaultValue(options.axis?.y?.gridLines?.display, true)
                ),
            },
            ticks: {
                display: !!defaultValue(options?.axis?.y?.ticks?.display, true),
                color: defaultValue(
                    singleChartJsColor(options?.axis?.y?.ticks?.color),
                    'rgb(86, 86, 86)'
                ),
                callback: computeFormatTick(
                    defaultValue(options?.axis?.y?.ticks?.display, true),
                    options?.axis?.y?.type,
                    defaultValue(options?.axis?.y?.ticks?.format, defaultCompactNumberFormat)
                ),
            },
        } as _DeepPartialObject<CartesianScaleOptions>;
    } else {
        scales.y = { display: false };
    }

    // R Axis
    if (options.axis?.r) {
        scales.r = {
            beginAtZero: defaultValue(options?.axis?.r?.beginAtZero, true),
            ticks: {
                display: defaultValue(options?.axis?.r?.ticks?.display, true),
                color: defaultValue(options?.axis?.r?.ticks?.color, 'rgb(86, 86, 86)'),
                callback: computeFormatTick(
                    defaultValue(options?.axis?.r?.ticks?.display, true),
                    undefined,
                    defaultValue(options?.axis?.r?.ticks?.format, defaultCompactNumberFormat)
                ),
            },
            grid: {
                display: defaultValue(options.axis?.r?.gridLines?.display, true),
                drawBorder: false,
                offset: false,
                color: computeGridLineColor(
                    defaultValue(options.axis?.r?.gridLines?.display, true)
                ),
            },
        } as _DeepPartialObject<RadialLinearScaleOptions>;
    }

    return scales;
}
