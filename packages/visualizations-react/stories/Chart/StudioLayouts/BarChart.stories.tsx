import React from 'react';
import type { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { ChartSeriesType } from '@opendatasoft/visualizations';
import { Meta, StoryObj } from '@storybook/react';
import type { Props } from 'reactify';

import { defaultSource } from '../../utils';
import ChartTemplate from '../ChartTemplate';

const meta: Meta = {
    title: 'Chart/StudioLayouts/BarChart',
};

export default meta;

const df = [
    { x: '01/01', y: 100, z: 45 },
    { x: '02/01', y: -50, z: 50 },
    { x: '03/01', y: 20, z: 100 },
    { x: '04/01', y: 30, z: 20 },
];

const BarTitleAxisGridArgs: Props<DataFrame, ChartOptions> = {
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
                indexAxis: 'y',
                backgroundColor: 'rgba(22, 161, 145, 0.26)',
                borderColor: 'rgba(22, 161, 145)',
                label: 'User 1',
            },
            {
                type: ChartSeriesType.Bar,
                valueColumn: 'z',
                indexAxis: 'y',
                backgroundColor: 'rgba(119, 73, 54, 0.26)',
                borderColor: 'rgba(119, 73, 54)',
                label: 'User 2',
            },
        ],
        axis: {
            x: {
                display: true,
                type: 'linear',
                offset: false,
                title: {
                    display: true,
                    text: 'x',
                    align: 'center',
                },
                gridLines: {
                    display: true,
                },
            },
            y: {
                display: true,
                type: 'category',
                title: {
                    display: true,
                    text: 'y',
                    align: 'center',
                },
                gridLines: {
                    display: false,
                },
            },
        },
        title: {
            text: 'Bar chart with title, axis and grid',
        },
    },
};
export const BarTitleAxisGrid: StoryObj<typeof ChartTemplate> = {
    args: BarTitleAxisGridArgs,
    render: args => <ChartTemplate {...args} />,
};

const BarAxisGridArgs: Props<DataFrame, ChartOptions> = {
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
                indexAxis: 'y',
                backgroundColor: [
                    'rgba(250,50,50,0.5)',
                    'rgba(50,250,50,0.5)',
                    'rgba(50,50,250,0.5)',
                    'rgba(250,50,250,0.5)',
                ],
                borderColor: [
                    'rgba(250,50,50)',
                    'rgba(50,250,50)',
                    'rgba(50,50,250)',
                    'rgba(250,50,250)',
                ],
            },
        ],
        axis: {
            x: {
                display: true,
                type: 'linear',
                offset: false,
                title: {
                    display: true,
                    text: 'x',
                    align: 'center',
                },
                gridLines: {
                    display: true,
                },
            },
            y: {
                display: true,
                type: 'category',
                title: {
                    display: true,
                    text: 'y',
                    align: 'center',
                },
                gridLines: {
                    display: false,
                },
            },
        },
    },
};
export const BarAxisGrid: StoryObj<typeof ChartTemplate> = {
    args: BarAxisGridArgs,
    render: args => <ChartTemplate {...args} />,
};

const BarTitleAxisDataValuesArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        padding: 24,
        series: [
            {
                type: ChartSeriesType.Bar,
                valueColumn: 'y',
                indexAxis: 'y',
                backgroundColor: 'rgba(22, 161, 145, 0.26)',
                borderColor: 'rgba(22, 161, 145)',
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
                    color: 'rgba(22, 161, 145)',
                },
            },
            {
                type: ChartSeriesType.Bar,
                valueColumn: 'z',
                indexAxis: 'y',
                backgroundColor: 'rgba(119, 73, 54, 0.26)',
                borderColor: 'rgba(119, 73, 54)',
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
                    color: 'rgba(119, 73, 54)',
                },
            },
        ],
        axis: {
            x: {
                display: true,
                type: 'linear',
                offset: false,
                title: {
                    display: true,
                    text: 'x',
                    align: 'center',
                },
                ticks: {
                    display: 'single',
                },
                gridLines: {
                    display: 'single',
                },
            },
            y: {
                display: true,
                type: 'category',
                title: {
                    display: true,
                    text: 'y',
                    align: 'center',
                },
                gridLines: {
                    display: false,
                },
            },
        },
        title: {
            text: 'Bar chart with title, axis and data values',
        },
    },
};
export const BarTitleAxisDataValues: StoryObj<typeof ChartTemplate> = {
    args: BarTitleAxisDataValuesArgs,
    render: args => <ChartTemplate {...args} />,
};

const BarAxisDataValuesArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        padding: 24,
        series: [
            {
                type: ChartSeriesType.Bar,
                valueColumn: 'y',
                indexAxis: 'y',
                backgroundColor: [
                    'rgba(250,50,50,0.5)',
                    'rgba(50,250,50,0.5)',
                    'rgba(50,50,250,0.5)',
                    'rgba(250,50,250,0.5)',
                ],
                borderColor: [
                    'rgba(250,50,50)',
                    'rgba(50,250,50)',
                    'rgba(50,50,250)',
                    'rgba(250,50,250)',
                ],
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
                    color: [
                        'rgba(250,50,50)',
                        'rgba(50,250,50)',
                        'rgba(50,50,250)',
                        'rgba(250,50,250)',
                    ],
                },
            },
        ],
        axis: {
            x: {
                display: true,
                type: 'linear',
                offset: false,
                title: {
                    display: true,
                    text: 'x',
                    align: 'center',
                },
                gridLines: {
                    display: 'single',
                },
                ticks: {
                    display: 'single',
                },
            },
            y: {
                display: true,
                type: 'category',
                title: {
                    display: true,
                    text: 'y',
                    align: 'center',
                },
                gridLines: {
                    display: false,
                },
            },
        },
    },
};
export const BarAxisDataValues: StoryObj<typeof ChartTemplate> = {
    args: BarAxisDataValuesArgs,
    render: args => <ChartTemplate {...args} />,
};

const BarTitleSubTitleGridArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: [
            { x: '01/01', y: 100 },
            { x: '02/01', y: -50 },
            { x: '03/01', y: 20 },
            { x: '04/01', y: 30 },
        ],
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        series: [
            {
                type: ChartSeriesType.Bar,
                valueColumn: 'y',
                indexAxis: 'y',
                backgroundColor: [
                    'rgba(250,50,50,0.5)',
                    'rgba(50,250,50,0.5)',
                    'rgba(50,50,250,0.5)',
                    'rgba(250,50,250,0.5)',
                ],
                borderColor: [
                    'rgba(250,50,50)',
                    'rgba(50,250,50)',
                    'rgba(50,50,250)',
                    'rgba(250,50,250)',
                ],
            },
        ],
        axis: {
            x: {
                display: true,
                type: 'linear',
                title: {
                    display: false,
                    text: 'x',
                    align: 'center',
                },
                gridLines: {
                    display: true,
                },
            },
            y: {
                display: true,
                type: 'category',
                title: {
                    display: true,
                    text: 'y',
                    align: 'center',
                },
                gridLines: {
                    display: false,
                },
            },
        },
        title: {
            text: 'Bar chart with title, subtitle and grid',
        },
        subtitle: {
            text: 'Custom Chart Subtitle',
        },
        description: 'Accessible description',
    },
};
export const BarTitleSubTitleGrid: StoryObj<typeof ChartTemplate> = {
    args: BarTitleSubTitleGridArgs,
    render: args => <ChartTemplate {...args} />,
};
