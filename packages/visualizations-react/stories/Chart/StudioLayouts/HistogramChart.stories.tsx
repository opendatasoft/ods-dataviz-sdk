import type { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { ChartSeriesType } from '@opendatasoft/visualizations';
import { Meta } from '@storybook/react';
import { Props } from '../../../src';
import { defaultSource } from '../../utils';
import ChartTemplate from '../ChartTemplate';

const meta: Meta = {
    title: 'Chart/StudioLayouts/HistogramChart',
};

export default meta;

const df = [
    { x: 0, y: 100 },
    { x: 1, y: 50 },
    { x: 2, y: 20 },
    { x: 3, y: -30 },
    { x: 4, y: 40 },
    { x: 5, y: 50 },
];

export const HistogramTitleAxisGrid = ChartTemplate.bind({});
const HistogramTitleAxisGridArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        series: [
            {
                type: ChartSeriesType.Bar,
                valueColumn: 'y',
                barPercentage: 1,
                categoryPercentage: 1,
                backgroundColor: 'rgba(50,50,225,0.5)',
                borderColor: 'rgba(50,50,225)',
            },
        ],
        axis: {
            x: {
                display: true,
                type: 'category',
                offset: true,
                title: {
                    display: true,
                    text: 'x',
                    align: 'center',
                },
                gridLines: {
                    display: false,
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'y',
                    align: 'center',
                },
                gridLines: {
                    display: true,
                },
            },
        },
        title: {
            text: 'Histogram chart with title, axis and grid',
        },
    },
};
HistogramTitleAxisGrid.args = HistogramTitleAxisGridArgs;

export const HistogramAxisGrid = ChartTemplate.bind({});
const HistogramAxisGridArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        series: [
            {
                type: ChartSeriesType.Bar,
                valueColumn: 'y',
                barPercentage: 1,
                categoryPercentage: 1,
                backgroundColor: 'rgba(50,50,225,0.5)',
                borderColor: 'rgba(50,50,225)',
            },
        ],
        axis: {
            x: {
                display: true,
                type: 'category',
                offset: true,
                title: {
                    display: true,
                    text: 'x',
                    align: 'center',
                },
                gridLines: {
                    display: false,
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'y',
                    align: 'center',
                },
                gridLines: {
                    display: true,
                },
            },
        },
    },
};
HistogramAxisGrid.args = HistogramAxisGridArgs;

export const HistogramTitleDataValues = ChartTemplate.bind({});
const HistogramTitleDataValuesArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        series: [
            {
                type: ChartSeriesType.Bar,
                valueColumn: 'y',
                barPercentage: 1,
                categoryPercentage: 1,
                backgroundColor: 'rgba(50,50,225,0.5)',
                borderColor: 'rgba(50,50,225)',
                dataLabels: {
                    display: true,
                    align(index: number) {
                        if (df[index].y >= 0) {
                            return 'end';
                        }
                        return 'start';
                    },
                    anchor(index: number) {
                        if (df[index].y >= 0) {
                            return 'end';
                        }
                        return 'start';
                    },
                    color: 'rgba(50,50,225)',
                },
            },
        ],
        axis: {
            x: {
                display: false,
                type: 'category',
                offset: true,
                title: {
                    display: false,
                    text: 'x',
                    align: 'center',
                },
                ticks: {
                    display: false,
                },
            },
            y: {
                display: true,
                type: 'category',
                title: {
                    display: false,
                    text: 'y',
                    align: 'center',
                },
                gridLines: {
                    display: 'single',
                },
                ticks: {
                    display: 'single',
                },
            },
        },
        title: {
            text: 'Histogram chart with title, subtitle and data values',
        },
        subtitle: {
            text: 'Custom Chart Subtitle',
        },
    },
};
HistogramTitleDataValues.args = HistogramTitleDataValuesArgs;

export const HistogramDataValues = ChartTemplate.bind({});
const HistogramDataValuesArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        series: [
            {
                type: ChartSeriesType.Bar,
                valueColumn: 'y',
                barPercentage: 1,
                categoryPercentage: 1,
                backgroundColor: 'rgba(50,50,225,0.5)',
                borderColor: 'rgba(50,50,225)',
                dataLabels: {
                    display: true,
                    align(index) {
                        if (df[index].y >= 0) {
                            return 'end';
                        }
                        return 'start';
                    },
                    anchor(index) {
                        if (df[index].y >= 0) {
                            return 'end';
                        }
                        return 'start';
                    },
                    color: 'rgba(50,50,225)',
                },
            },
        ],
        axis: {
            x: {
                display: false,
                type: 'category',
                offset: true,
                title: {
                    display: false,
                    text: 'x',
                    align: 'center',
                },
                ticks: {
                    display: false,
                },
            },
            y: {
                display: true,
                title: {
                    display: false,
                    text: 'y',
                    align: 'center',
                },
                gridLines: {
                    display: 'single',
                },
                ticks: {
                    display: 'single',
                },
            },
        },
    },
};
HistogramDataValues.args = HistogramDataValuesArgs;

export const HistogramAxisDataValues = ChartTemplate.bind({});
const HistogramAxisDataValuesArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        series: [
            {
                type: ChartSeriesType.Bar,
                valueColumn: 'y',
                barPercentage: 1,
                categoryPercentage: 1,
                backgroundColor: 'rgba(50,50,225,0.5)',
                borderColor: 'rgba(50,50,225)',
                dataLabels: {
                    display: true,
                    align(index) {
                        if (df[index].y >= 0) {
                            return 'end';
                        }
                        return 'start';
                    },
                    anchor(index) {
                        if (df[index].y >= 0) {
                            return 'end';
                        }
                        return 'start';
                    },
                    color: 'rgba(50,50,225)',
                },
            },
        ],
        axis: {
            x: {
                display: true,
                type: 'category',
                offset: true,
                title: {
                    display: true,
                    text: 'x',
                    align: 'center',
                },
                gridLines: {
                    display: false,
                },
                ticks: {
                    display: true,
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'y',
                    align: 'center',
                },
                gridLines: {
                    display: 'single',
                },
                ticks: {
                    display: 'single',
                },
            },
        },
    },
};
HistogramAxisDataValues.args = HistogramAxisDataValuesArgs;

export const HistogramTitleAxisGridNegative = ChartTemplate.bind({});
const HistogramTitleAxisGridNegativeArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: [
            { x: 0, y: -10000 },
            { x: 1, y: -5000 },
            { x: 2, y: -2000 },
            { x: 3, y: -3000 },
            { x: 4, y: -4000 },
            { x: 5, y: -5000 },
        ],
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        series: [
            {
                type: ChartSeriesType.Bar,
                valueColumn: 'y',
                barPercentage: 1,
                categoryPercentage: 1,
                backgroundColor: 'rgba(50,50,225,0.5)',
                borderColor: 'rgba(50,50,225)',
            },
        ],
        axis: {
            x: {
                display: true,
                type: 'category',
                offset: true,
                title: {
                    display: true,
                    text: 'x',
                    align: 'center',
                },
                gridLines: {
                    display: false,
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'y',
                    align: 'center',
                },
                gridLines: {
                    display: true,
                },
            },
        },
        title: {
            text: 'Histogram chart with title, axis and grid',
        },
    },
};
HistogramTitleAxisGridNegative.args = HistogramTitleAxisGridNegativeArgs;
