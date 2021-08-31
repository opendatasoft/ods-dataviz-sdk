import { COLORS, styleForLayouts } from '../../utils';

export const HistogramTitleAxisGrid = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 0, y: 100 },
            { x: 1, y: 50 },
            { x: 2, y: 20 },
            { x: 3, y: 30 },
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
            },
        ],
        xAxis: {
            display: true,
            type: 'category',
            title: {
                display: true,
                text: 'x',
                align: 'center',
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
                display: false,
            },
        },
        title: {
            text: 'Histogram chart with title, axis and grid',
            align: 'start',
        },
    },
};

export const HistogramAxisGrid = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 0, y: 100 },
            { x: 1, y: 50 },
            { x: 2, y: 20 },
            { x: 3, y: 30 },
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
            },
        ],
        xAxis: {
            display: true,
            type: 'category',
            title: {
                display: true,
                text: 'x',
                align: 'center',
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
                display: false,
            },
        },
    },
};

export const HistogramTitleDataValues = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 0, y: 100 },
            { x: 1, y: 50 },
            { x: 2, y: 20 },
            { x: 3, y: 30 },
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
                dataLabels: {
                    display: true,
                    align: 'end',
                    anchor: 'end',
                },
            },
        ],
        xAxis: {
            display: false,
            type: 'category',
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
            display: false,
            title: {
                display: false,
                text: 'y',
                align: 'center',
            },
            gridLines: {
                display: false,
            },
            ticks: {
                display: false,
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

export const HistogramDataValues = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 0, y: 100 },
            { x: 1, y: 50 },
            { x: 2, y: 20 },
            { x: 3, y: 30 },
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
                dataLabels: {
                    display: true,
                    align: 'end',
                    anchor: 'end',
                },
            },
        ],
        xAxis: {
            display: false,
            type: 'category',
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
            display: false,
            title: {
                display: false,
                text: 'y',
                align: 'center',
            },
            gridLines: {
                display: false,
            },
            ticks: {
                display: false,
            },
        },
    },
};

export const HistogramAxisDataValues = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 0, y: 100 },
            { x: 1, y: 50 },
            { x: 2, y: 20 },
            { x: 3, y: 30 },
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
                dataLabels: {
                    display: true,
                    align: 'end',
                    anchor: 'end',
                },
            },
        ],
        xAxis: {
            display: true,
            type: 'category',
            title: {
                display: true,
                text: 'x',
                align: 'center',
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
                display: false,
            },
            ticks: {
                display: true,
            },
        },
    },
};
