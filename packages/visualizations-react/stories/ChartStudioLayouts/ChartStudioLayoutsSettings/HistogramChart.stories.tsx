import { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { Props } from '../../../src';
import { COLORS, styleForLayouts } from '../../utils';

export const HistogramTitleAxisGrid: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 0, y: 100 },
            { x: 1, y: 50 },
            { x: 2, y: 20 },
            { x: 3, y: -30 },
            { x: 4, y: 40 },
            { x: 5, y: 50 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Histogram series chart',
        series: [
            {
                type: 'bar',
                valueColumn: 'y',
                barPercentage: 1,
                categoryPercentage: 1,
                backgroundColor: 'rgba(50,50,225,0.5)',
                borderColor: 'rgba(50,50,225)',
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
            text: 'Histogram chart with title, axis and grid',
            align: 'start',
        },
    },
};

export const HistogramAxisGrid: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 0, y: 100 },
            { x: 1, y: 50 },
            { x: 2, y: 20 },
            { x: 3, y: -30 },
            { x: 4, y: 40 },
            { x: 5, y: 50 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Histogram chart with axis and grid',
        series: [
            {
                type: 'bar',
                valueColumn: 'y',
                barPercentage: 1,
                categoryPercentage: 1,
                backgroundColor: 'rgba(50,50,225,0.5)',
                borderColor: 'rgba(50,50,225)',
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

export const HistogramTitleDataValues: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 0, y: 100 },
            { x: 1, y: 50 },
            { x: 2, y: 20 },
            { x: 3, y: -30 },
            { x: 4, y: 40 },
            { x: 5, y: 50 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Histogram chart with title, subtitle and data values',
        series: [
            {
                type: 'bar',
                valueColumn: 'y',
                barPercentage: 1,
                categoryPercentage: 1,
                backgroundColor: 'rgba(50,50,225,0.5)',
                borderColor: 'rgba(50,50,225)',
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
                    color: 'rgba(50,50,225)',
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
            ticks: {
                display: false,
            },
        },
        yAxis: {
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
                display: 'single'
            },
        },
        title: {
            text: 'Histogram chart with title, subtitle and data values',
            align: 'start',
        },
        subtitle: {
            display: true,
            text: 'Custom Chart Subtitle',
            align: 'start',
        },
    },
};

export const HistogramDataValues: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 0, y: 100 },
            { x: 1, y: 50 },
            { x: 2, y: 20 },
            { x: 3, y: -30 },
            { x: 4, y: 40 },
            { x: 5, y: 50 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Histogram chart with data values',
        series: [
            {
                type: 'bar',
                valueColumn: 'y',
                barPercentage: 1,
                categoryPercentage: 1,
                backgroundColor: 'rgba(50,50,225,0.5)',
                borderColor: 'rgba(50,50,225)',
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
                    color: 'rgba(50,50,225)',
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
                display: 'single'
            },
        },
    },
};

export const HistogramAxisDataValues: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 0, y: 100 },
            { x: 1, y: 50 },
            { x: 2, y: 20 },
            { x: 3, y: -30 },
            { x: 4, y: 40 },
            { x: 5, y: 50 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Histogram chart with axis and data values',
        series: [
            {
                type: 'bar',
                valueColumn: 'y',
                barPercentage: 1,
                categoryPercentage: 1,
                backgroundColor: 'rgba(50,50,225,0.5)',
                borderColor: 'rgba(50,50,225)',
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
                    color: 'rgba(50,50,225)',
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
            ticks: {
                display: true,
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
                display: 'single'
            },
        },
    },
};

export const HistogramTitleAxisGridNegative: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
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
        ariaLabel: 'Histogram series chart',
        series: [
            {
                type: 'bar',
                valueColumn: 'y',
                barPercentage: 1,
                categoryPercentage: 1,
                backgroundColor: 'rgba(50,50,225,0.5)',
                borderColor: 'rgba(50,50,225)',
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
            text: 'Histogram chart with title, axis and grid',
            align: 'start',
        },
    },
};
