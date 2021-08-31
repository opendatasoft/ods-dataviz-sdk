import { COLORS, styleForLayouts } from '../../utils';

export const ColumnTitleAxisGrid = {
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
        },
        title: {
            text: 'Column chart with title, axis and grid',
            align: 'start',
        },
    },
};

export const ColumnAxisGrid = {
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
        },
    },
};

export const ColumnTitleSubtitleDataValues = {
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
            gridLines: {
                display: false,
            },
            ticks : {
                display:false,
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
            ticks : {
                display:false,
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

export const ColumnDataValues = {
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
            gridLines: {
                display: false,
            },
            ticks : {
                display:false,
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
            ticks : {
                display:false,
            },
        },
    },
};

export const ColumnAxisDataValues = {
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
            gridLines: {
                display: false,
            }
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
            }
        },
    },
};

