import { COLORS, styleForLayouts } from '../../utils';

// Axis title cannot be rotated by default options
// We can change also size of different elements paddings margin

export const AreaTitleAxisGridDots = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 0, y: 2400, z: 1 },
            { x: 1, y: 140, z: 2 },
            { x: 2, y: 2000, z: 3 },
            { x: 3, y: 3, z: 1 },
            { x: 4, y: 180.47, z: 1 },
            { x: 5, y: 778, z: 1 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Area chart with title, axis, grid and dots',
        series: [
            {
                type: 'line',
                valueColumn: 'y',
                tension: 0.3,
                borderColor: COLORS.red,
                fill: {
                    mode: 1,
                    above: COLORS.pink,
                },
            },
            {
                type: 'line',
                valueColumn: 'z',
            },
        ],
        xAxis: {
            display: true,
            type: 'linear',
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
                text: 'hello',
                align: 'end',
                rotation: 90,
            },
            gridLines: {
                display: true,
            },
        },
        title: {
            text: 'Area chart with title, axis, grid and dots',
            align: 'start',
        },
    },
};

export const AreaAxisGridDots = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 0, y: 2400, z: 1 },
            { x: 1, y: 140, z: 2 },
            { x: 2, y: 2000, z: 3 },
            { x: 3, y: 3, z: 1 },
            { x: 4, y: 180.47, z: 1 },
            { x: 5, y: 778, z: 1 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Area chart with axis, grid and dots',
        series: [
            {
                type: 'line',
                valueColumn: 'y',
                tension: 0.3,
                borderColor: COLORS.red,
                fill: {
                    mode: 1,
                    above: COLORS.pink,
                },
            },
            {
                type: 'line',
                valueColumn: 'z',
            },
        ],
        xAxis: {
            display: true,
            type: 'linear',
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

export const AreaTitleAxisGrid = {
    style: styleForLayouts,
    datasets: [{ pointRadius: 0 }],
    data: {
        loading: false,
        value: [
            { x: 0, y: 2400, z: 1 },
            { x: 1, y: 140, z: 2 },
            { x: 2, y: 2000, z: 3 },
            { x: 3, y: 3, z: 1 },
            { x: 4, y: 180.47, z: 1 },
            { x: 5, y: 778, z: 1 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Area chart with title, axis and grid',
        series: [
            {
                type: 'line',
                valueColumn: 'y',
                tension: 0.3,
                borderColor: COLORS.red,
                pointRadius: 0,
                fill: {
                    mode: 1,
                    above: COLORS.pink,
                },
            },
            {
                type: 'line',
                valueColumn: 'z',
            },
        ],
        xAxis: {
            display: true,
            type: 'linear',
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
            text: 'Area chart with title, axis and grid',
            align: 'start',
        },
    },
};

export const AreaTitleSubtitleGrid = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 0, y: 2400, z: 1 },
            { x: 1, y: 140, z: 2 },
            { x: 2, y: 2000, z: 3 },
            { x: 3, y: 3, z: 1 },
            { x: 4, y: 180.47, z: 1 },
            { x: 5, y: 778, z: 1 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Area chart with title, subtitle and grid',
        series: [
            {
                type: 'line',
                valueColumn: 'y',
                tension: 0.3,
                borderColor: COLORS.red,
                pointRadius: 0,
                fill: {
                    mode: 1,
                    above: COLORS.pink,
                },
            },
            {
                type: 'line',
                valueColumn: 'z',
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
                display: true,
            },
        },
        title: {
            text: 'Area chart with title, subtitle and grid',
            align: 'start',
        },
        subtitle: {
            display: true,
            text: 'Custom Chart Subtitle',
            align: 'start',
        },
    },
};

export const AreaTitleDataValues = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 0, y: 2400, z: 1 },
            { x: 1, y: 140, z: 2 },
            { x: 2, y: 2000, z: 3 },
            { x: 3, y: 3, z: 1 },
            { x: 4, y: 180.47, z: 1 },
            { x: 5, y: 778, z: 1 },
        ],
        hidden: false,
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Area chart with title and data values on axis',
        series: [
            {
                type: 'line',
                valueColumn: 'y',
                tension: 0.3,
                borderColor: COLORS.red,
                pointRadius: 0,
                dataLabels: {
                    display: true,
                    align: 'end',
                    anchor: 'end',
                },
                fill: {
                    mode: 1,
                    above: COLORS.pink,
                },
            },
            {
                type: 'line',
                valueColumn: 'z',
            },
        ],
        xAxis: {
            display: true,
            type: 'linear',
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
            display: false,
        },
        title: {
            text: 'Area chart with title and data values on axis',
            align: 'start',
        },
    },
};

export const AreaDataValuesOnly = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 0, y: 2400, z: 1 },
            { x: 1, y: 140, z: 2 },
            { x: 2, y: 2000, z: 3 },
            { x: 3, y: 3, z: 1 },
            { x: 4, y: 180.47, z: 1 },
            { x: 5, y: 778, z: 1 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Area chart with data values on axis',
        series: [
            {
                type: 'line',
                valueColumn: 'y',
                tension: 0.3,
                borderColor: COLORS.red,
                pointRadius: 0,
                dataLabels: {
                    display: true,
                    align: 'end',
                    anchor: 'end',
                },
                fill: {
                    mode: 1,
                    above: COLORS.pink,
                },
            },
            {
                type: 'line',
                valueColumn: 'z',
            },
        ],
        xAxis: {
            display: true,
            type: 'linear',
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
            display: false,
        },
    },
};
