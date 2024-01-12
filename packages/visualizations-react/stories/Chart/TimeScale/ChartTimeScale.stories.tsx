import type { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { ChartSeriesType } from '@opendatasoft/visualizations';
import { Meta } from '@storybook/react';
import type { Props } from 'reactify';
import { COLORS, generateArrayOf } from '../../utils';
import ChartTemplate from '../ChartTemplate';

const meta: Meta = {
    title: 'Chart/TimeScale',
};

export default meta;

export const AreaChartYears = ChartTemplate.bind({});
const AreaChartYearsArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: generateArrayOf(
            index => ({
                x: `${2000 + index}`,
                y: index * index * 100,
            }),
            9
        ),
    },
    options: {
        labelColumn: 'x',
        series: [
            {
                type: ChartSeriesType.Line,
                valueColumn: 'y',
                backgroundColor: COLORS.green,
                fill: { mode: 'origin' },
            },
        ],
        axis: {
            x: {
                display: true,
                type: 'time',
                timeUnit: 'year',
            },
            y: {
                display: true,
            },
        },
        title: {
            text: 'Years',
        },
    },
};
AreaChartYears.args = AreaChartYearsArgs;

export const LineChartYearsWithGap = ChartTemplate.bind({});
const LineChartYearsWithGapArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: [
            { year: '2001', y: 0 },
            { year: '2002', y: 2 },
            { year: '2003', y: 3 },
            { year: '2005', y: 3.5 },
            { year: '2006', y: 3.5 },
            { year: '2007', y: 4 },
            { year: '2010', y: 8 },
            { year: '2011', y: 9 },
            { year: '2012', y: 10 },
            { year: '2015', y: 12 },
        ],
    },
    options: {
        labelColumn: 'year',
        series: [
            {
                type: ChartSeriesType.Line,
                valueColumn: 'y',
                borderColor: COLORS.purple,
                backgroundColor: COLORS.red,
                spanGaps: 1000 * 60 * 60 * 24 * 366, // 1 year
            },
        ],
        axis: {
            x: {
                display: true,
                type: 'time',
                timeUnit: 'year',
            },
            y: {
                display: true,
            },
        },
        title: {
            text: 'Years with gap',
        },
    },
};
LineChartYearsWithGap.args = LineChartYearsWithGapArgs;

export const LineChartMonths = ChartTemplate.bind({});
const LineChartMonthsArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: generateArrayOf(
            index => ({
                x: `2021-0${index + 1}`,
                y: index * index * 100,
            }),
            9
        ),
    },
    options: {
        labelColumn: 'x',
        series: [
            {
                type: ChartSeriesType.Line,
                valueColumn: 'y',
                borderColor: COLORS.blue,
            },
        ],
        axis: {
            x: {
                display: true,
                type: 'time',
                timeUnit: 'month',
            },
            y: {
                display: true,
            },
        },
        title: {
            text: 'Months',
        },
    },
};
LineChartMonths.args = LineChartMonthsArgs;

export const LineChartDays = ChartTemplate.bind({});
const LineChartDaysArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: generateArrayOf(
            (index: number) => ({
                x: `2021-0${index + 1}-0${index + 1}`,
                y: (index * 2) ^ (index + 1), // eslint-disable-line no-bitwise
            }),
            9
        ),
    },
    options: {
        labelColumn: 'x',
        series: [
            {
                type: ChartSeriesType.Line,
                valueColumn: 'y',
                borderColor: COLORS.blue,
                tension: 0.5,
            },
        ],
        axis: {
            x: {
                display: true,
                type: 'time',
                timeUnit: 'day',
            },
            y: {
                display: true,
            },
        },
        title: {
            text: 'Days',
        },
    },
};
LineChartDays.args = LineChartDaysArgs;

export const LineChartHours = ChartTemplate.bind({});
const LineChartHoursArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: generateArrayOf(
            index => ({
                x: index < 5 ? `2021-12-09T${index + 19}` : `2021-12-10T0${index - 5}`,
                y: (index ^ (1 - index)) * 100, // eslint-disable-line no-bitwise
            }),
            9
        ),
    },
    options: {
        labelColumn: 'x',
        series: [
            {
                type: ChartSeriesType.Line,
                valueColumn: 'y',
                borderColor: COLORS.orange,
            },
        ],
        axis: {
            x: {
                display: true,
                type: 'time',
                timeUnit: 'hour',
            },
            y: {
                display: true,
            },
        },
        title: {
            text: 'Hours',
        },
    },
};
LineChartHours.args = LineChartHoursArgs;

export const LineChartMinutes = ChartTemplate.bind({});
const LineChartMinutesArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: generateArrayOf(
            (index: number) => ({
                x: index < 5 ? `2021-01-01T10:${index + 55}` : `2021-01-01T11:0${index - 5}`,
                y: (index ^ (1 + index)) * 100, // eslint-disable-line no-bitwise
            }),
            9
        ),
    },
    options: {
        labelColumn: 'x',
        series: [
            {
                type: ChartSeriesType.Line,
                valueColumn: 'y',
                borderColor: COLORS.red,
            },
        ],
        axis: {
            x: {
                display: true,
                type: 'time',
                timeUnit: 'minute',
            },
            y: {
                display: true,
            },
        },
        title: {
            text: 'Minutes',
        },
    },
};
LineChartMinutes.args = LineChartMinutesArgs;

export const BarChartSeconds = ChartTemplate.bind({});
const BarChartSecondsArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: generateArrayOf(
            index => ({
                x: index < 5 ? `2021-01-01T10:00:${index + 55}` : `2021-01-01T10:01:0${index - 5}`,
                y: Math.sin(index) * 100,
            }),
            9
        ),
    },
    options: {
        labelColumn: 'x',
        series: [
            {
                type: ChartSeriesType.Bar,
                valueColumn: 'y',
                backgroundColor: COLORS.grey,
            },
        ],
        axis: {
            x: {
                display: true,
                type: 'time',
                timeUnit: 'second',
            },
            y: {
                display: true,
            },
        },
        title: {
            text: 'Seconds',
        },
    },
};
BarChartSeconds.args = BarChartSecondsArgs;
