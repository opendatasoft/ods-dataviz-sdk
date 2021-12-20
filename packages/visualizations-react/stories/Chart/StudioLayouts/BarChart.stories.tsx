import { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { Meta } from '@storybook/react';
import { Props } from '../../../src';
import { defaultSource } from '../../utils';
import { Sample } from '../Chart.stories';
import { storyWithArgs } from '../../utils';

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

export const BarTitleAxisGrid = storyWithArgs<Props<DataFrame, ChartOptions>>(Sample, {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        ariaLabel: 'Bar chart with title, axis and grid',
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
        xAxis: {
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
        yAxis: {
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
        title: {
            text: 'Bar chart with title, axis and grid',
        },
    },
});

export const BarAxisGrid = storyWithArgs<Props<DataFrame, ChartOptions>>(Sample, {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        ariaLabel: 'Bar chart with axis and grid',
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
        xAxis: {
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
        yAxis: {
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
});

export const BarTitleAxisDataValues = storyWithArgs<Props<DataFrame, ChartOptions>>(Sample, {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        ariaLabel: 'Bar chart with title, axis and data values',
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
                    align: function (index) {
                        if (df[index].y >= 0) {
                            return 'end';
                        } else {
                            return 'start';
                        }
                    },
                    anchor: function (index) {
                        if (df[index].y >= 0) {
                            return 'end';
                        } else {
                            return 'start';
                        }
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
                    align: function (index) {
                        if (df[index].y >= 0) {
                            return 'end';
                        } else {
                            return 'start';
                        }
                    },
                    anchor: function (index) {
                        if (df[index].y >= 0) {
                            return 'end';
                        } else {
                            return 'start';
                        }
                    },
                    color: 'rgba(119, 73, 54)',
                },
            },
        ],
        xAxis: {
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
        yAxis: {
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
        title: {
            text: 'Bar chart with title, axis and data values',
        },
    },
});

export const BarAxisDataValues = storyWithArgs<Props<DataFrame, ChartOptions>>(Sample, {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        ariaLabel: 'Bar chart with axis and data values',
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
                        } else {
                            return 'start';
                        }
                    },
                    anchor(index) {
                        if (df[index].y >= 0) {
                            return 'end';
                        } else {
                            return 'start';
                        }
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
        xAxis: {
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
        yAxis: {
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
});

export const BarTitleSubTitleGrid = storyWithArgs<Props<DataFrame, ChartOptions>>(Sample, {
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
        ariaLabel: 'Bar chart with title, subtitle and grid',
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
        xAxis: {
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
        yAxis: {
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
        title: {
            text: 'Bar chart with title, subtitle and grid',
        },
        subtitle: {
            text: 'Custom Chart Subtitle',
        },
    },
});
