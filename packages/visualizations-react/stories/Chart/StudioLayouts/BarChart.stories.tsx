import { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { Meta } from '@storybook/react';
import { Props } from '../../../src';
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

export const BarTitleAxisGrid = ChartTemplate.bind({});
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
                type: 'bar',
                valueColumn: 'y',
                indexAxis: 'y',
                backgroundColor: 'rgba(22, 161, 145, 0.26)',
                borderColor: 'rgba(22, 161, 145)',
                label: 'User 1',
            },
            {
                type: 'bar',
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
BarTitleAxisGrid.args = BarTitleAxisGridArgs;

export const BarAxisGrid = ChartTemplate.bind({});
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
                type: 'bar',
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
BarAxisGrid.args = BarAxisGridArgs;

export const BarTitleAxisDataValues = ChartTemplate.bind({});
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
                type: 'bar',
                valueColumn: 'y',
                indexAxis: 'y',
                backgroundColor: 'rgba(22, 161, 145, 0.26)',
                borderColor: 'rgba(22, 161, 145)',
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
                    color: 'rgba(22, 161, 145)',
                },
            },
            {
                type: 'bar',
                valueColumn: 'z',
                indexAxis: 'y',
                backgroundColor: 'rgba(119, 73, 54, 0.26)',
                borderColor: 'rgba(119, 73, 54)',
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
BarTitleAxisDataValues.args = BarTitleAxisDataValuesArgs;

export const BarAxisDataValues = ChartTemplate.bind({});
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
                type: 'bar',
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
BarAxisDataValues.args = BarAxisDataValuesArgs;

export const BarTitleSubTitleGrid = ChartTemplate.bind({});
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
                type: 'bar',
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
BarTitleSubTitleGrid.args = BarTitleSubTitleGridArgs;
