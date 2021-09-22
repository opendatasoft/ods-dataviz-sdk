import { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { Props } from '../../../src';
import { styleForLayouts } from '../../utils';

export const ColumnTitleAxisGrid: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 0, y: 100 },
            { x: 1, y: 50 },
            { x: 2, y: 20 },
            { x: 3, y: -30 },
            { x: 4, y: 40 },
            { x: 5, y: -50 },
        ],
    },
    options: {
        labelColumn: 'x',
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
        xAxis: {
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
        yAxis: {
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
        title: {
            text: 'Column chart with title, axis and grid',
            align: 'start',
        },
    },
};

export const ColumnAxisGrid: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 0, y: 100 },
            { x: 1, y: 50 },
            { x: 2, y: 20 },
            { x: 3, y: -30 },
            { x: 4, y: 40 },
            { x: 5, y: -50 },
        ],
    },
    options: {
        labelColumn: 'x',
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
        xAxis: {
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
        yAxis: {
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
};

export const ColumnTitleSubtitleDataValues: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 0, y: 100 },
            { x: 1, y: 50 },
            { x: 2, y: 20 },
            { x: 3, y: -30 },
            { x: 4, y: 40 },
            { x: 5, y: -50 },
        ],
    },
    options: {
        labelColumn: 'x',
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
                    align: function (index, { dataFrame }) {
                        if (dataFrame[index].y >= 0) {
                            return 'end';
                        } else {
                            return 'start';
                        }
                    },
                    anchor: function (index, { dataFrame }) {
                        if (dataFrame[index].y >= 0) {
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
        yAxis: {
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
        title: {
            text: 'Column chart with title, axis and grid',
            align: 'start',
        },
        subtitle: {
            display: true,
            text: 'Custom Chart Subtitle',
            align: 'start',
        },
    },
};

export const ColumnDataValues: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 0, y: 100 },
            { x: 1, y: 50 },
            { x: 2, y: 20 },
            { x: 3, y: -30 },
            { x: 4, y: 40 },
            { x: 5, y: -50 },
        ],
    },
    options: {
        labelColumn: 'x',
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
                    align(index, { dataFrame }) {
                        if (dataFrame[index].y >= 0) {
                            return 'end';
                        } else {
                            return 'start';
                        }
                    },
                    anchor(index, { dataFrame }) {
                        if (dataFrame[index].y >= 0) {
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
        yAxis: {
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
};

export const ColumnAxisDataValues: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 0, y: 100 },
            { x: 1, y: 50 },
            { x: 2, y: 20 },
            { x: 3, y: -30 },
            { x: 4, y: 40 },
            { x: 5, y: -50 },
        ],
    },
    options: {
        labelColumn: 'x',
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
                    align(index, { dataFrame }) {
                        if (dataFrame[index].y >= 0) {
                            return 'end';
                        } else {
                            return 'start';
                        }
                    },
                    anchor(index, { dataFrame }) {
                        if (dataFrame[index].y >= 0) {
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
        yAxis: {
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
};

export const ColumnTitleAxisGridNegative: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
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
        xAxis: {
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
        yAxis: {
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
        title: {
            text: 'Column chart with title, axis and grid',
            align: 'start',
        },
    },
};
