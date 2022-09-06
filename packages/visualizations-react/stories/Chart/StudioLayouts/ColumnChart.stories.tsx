import { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { Meta } from '@storybook/react';
import { Props } from '../../../src';
import { defaultSource } from '../../utils';
import { ChartTemplate } from '../Chart.stories';

const meta: Meta = {
    title: 'Chart/StudioLayouts/ColumnChart',
};

export default meta;

const df = [
    { x: 0, y: 100 },
    { x: 1, y: 50 },
    { x: 2, y: 20 },
    { x: 3, y: -30 },
    { x: 4, y: 40 },
    { x: 5, y: -50 },
];

export const ColumnTitleAxisGrid = ChartTemplate.bind({});
const ColumnTitleAxisGridArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        ariaLabel: 'Column chart with title, axis and grid',
        series: [
            {
                type: 'bar',
                valueColumn: 'y',
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
            text: 'Column chart with title, axis and grid',
        },
    },
};
ColumnTitleAxisGrid.args = ColumnTitleAxisGridArgs;

export const ColumnAxisGrid = ChartTemplate.bind({});
const ColumnAxisGridArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        ariaLabel: 'Column chart with axis and grid',
        series: [
            {
                type: 'bar',
                valueColumn: 'y',
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
ColumnAxisGrid.args = ColumnAxisGridArgs;

export const ColumnTitleSubtitleDataValues = ChartTemplate.bind({});
const ColumnTitleSubtitleDataValuesArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        ariaLabel: 'Column chart with title, axis and grid',
        series: [
            {
                type: 'bar',
                valueColumn: 'y',
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
                display: false,
                type: 'category',
                offset: true,
                title: {
                    display: false,
                    text: 'x',
                    align: 'center',
                },
                gridLines: {
                    display: false,
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
        title: {
            text: 'Column chart with title, axis and grid',
        },
        subtitle: {
            text: 'Custom Chart Subtitle',
        },
    },
};
ColumnTitleSubtitleDataValues.args = ColumnTitleSubtitleDataValuesArgs;

export const ColumnDataValues = ChartTemplate.bind({});
const ColumnDataValuesArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        ariaLabel: 'Column chart with title, axis and grid',
        series: [
            {
                type: 'bar',
                valueColumn: 'y',
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
                display: false,
                type: 'category',
                offset: true,
                title: {
                    display: false,
                    text: 'x',
                    align: 'center',
                },
                gridLines: {
                    display: false,
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
ColumnDataValues.args = ColumnDataValuesArgs;

export const ColumnAxisDataValues = ChartTemplate.bind({});
const ColumnAxisDataValuesArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        ariaLabel: 'Column chart with title, axis and grid',
        series: [
            {
                type: 'bar',
                valueColumn: 'y',
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
                    display: 'single',
                },
                ticks: {
                    display: 'single',
                },
            },
        },
    },
};
ColumnAxisDataValues.args = ColumnAxisDataValuesArgs;

export const ColumnTitleAxisGridNegative = ChartTemplate.bind({});
const ColumnTitleAxisGridNegativeArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: [
            { x: 0, y: -100 },
            { x: 1, y: -50 },
            { x: 2, y: -20 },
            { x: 3, y: -30 },
            { x: 4, y: -40 },
            { x: 5, y: -50 },
        ],
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        ariaLabel: 'Column chart with title, axis and grid',
        series: [
            {
                type: 'bar',
                valueColumn: 'y',
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
            text: 'Column chart with title, axis and grid',
        },
    },
};
ColumnTitleAxisGridNegative.args = ColumnTitleAxisGridNegativeArgs;
