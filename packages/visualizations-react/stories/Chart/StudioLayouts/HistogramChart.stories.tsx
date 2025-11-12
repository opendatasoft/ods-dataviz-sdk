import React from 'react';
import type { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { ChartSeriesType } from '@opendatasoft/visualizations';
import { Meta, StoryObj } from '@storybook/react';
import type { Props } from 'reactify';

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
export const HistogramTitleAxisGrid: StoryObj<typeof ChartTemplate> = {
    args: HistogramTitleAxisGridArgs,
    render: args => <ChartTemplate {...args} />,
};

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
export const HistogramAxisGrid: StoryObj<typeof ChartTemplate> = {
    args: HistogramAxisGridArgs,
    render: args => <ChartTemplate {...args} />,
};

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
export const HistogramTitleDataValues: StoryObj<typeof ChartTemplate> = {
    args: HistogramTitleDataValuesArgs,
    render: args => <ChartTemplate {...args} />,
};

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
export const HistogramDataValues: StoryObj<typeof ChartTemplate> = {
    args: HistogramDataValuesArgs,
    render: args => <ChartTemplate {...args} />,
};

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
export const HistogramAxisDataValues: StoryObj<typeof ChartTemplate> = {
    args: HistogramAxisDataValuesArgs,
    render: args => <ChartTemplate {...args} />,
};

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
export const HistogramTitleAxisGridNegative: StoryObj<typeof ChartTemplate> = {
    args: HistogramTitleAxisGridNegativeArgs,
    render: args => <ChartTemplate {...args} />,
};
