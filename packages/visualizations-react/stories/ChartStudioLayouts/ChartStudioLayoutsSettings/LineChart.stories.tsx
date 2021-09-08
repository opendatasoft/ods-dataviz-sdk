import { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { Props } from '../../../src';
import { COLORS, styleForLayouts } from '../../utils';

// Axis title cannot be rotated by default options
// We can change also size of different elements paddings margin

export const LineTitleAxisGridDots: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 0, y: 2400, z: 1 },
            { x: 1, y: -140, z: 2 },
            { x: 2, y: 2000, z: 3 },
            { x: 3, y: 3, z: 1 },
            { x: 4, y: 180.47, z: 1 },
            { x: 5, y: 778, z: 1 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Line chart with title, axis, grid and dots',
        padding: 6,
        series: [
            {
                type: 'line',
                valueColumn: 'y',
                tension: 0,
                borderColor: COLORS.red,
            },
        ],
        xAxis: {
            display: true,
            type: 'linear',
            title: {
                display: true,
                text: 'x / min',
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
                text: 'Hello / km',
                align: 'center',
            },
            gridLines: {
                display: true,
                color: function (ticksValue) {
                    if (ticksValue === 0) {
                        return 'rgba(0, 0, 0, 0.4)';
                    } else {
                        return 'rgba(0, 0, 0, 0.1)';
                    }
                },
            },
        },
        title: {
            text: 'Line chart with title, axis, grid and dots',
            align: 'start',
        },
    },
};

export const LineAxisGridDots: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 0, y: 2400, z: 1 },
            { x: 1, y: -140, z: 2 },
            { x: 2, y: 2000, z: 3 },
            { x: 3, y: 3, z: 1 },
            { x: 4, y: 180.47, z: 1 },
            { x: 5, y: 778, z: 1 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Line chart with axis, grid and dots',
        padding: 6,
        series: [
            {
                type: 'line',
                valueColumn: 'y',
                tension: 0,
                borderColor: COLORS.red,
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
                color: function (ticksValue) {
                    if (ticksValue === 0) {
                        return 'rgba(0, 0, 0, 0.4)';
                    } else {
                        return 'rgba(0, 0, 0, 0.1)';
                    }
                },
            },
        },
    },
};

export const LineTitleAxisGrid: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 0, y: 2400, z: 1 },
            { x: 1, y: -140, z: 2 },
            { x: 2, y: 2000, z: 3 },
            { x: 3, y: 3, z: 1 },
            { x: 4, y: 180.47, z: 1 },
            { x: 5, y: 778, z: 1 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Line chart with title, axis and grid',
        padding: 6,
        series: [
            {
                type: 'line',
                valueColumn: 'y',
                tension: 0,
                borderColor: COLORS.red,
                pointRadius: 0,
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
                color: function (ticksValue) {
                    if (ticksValue === 0) {
                        return 'rgba(0, 0, 0, 0.4)';
                    } else {
                        return 'rgba(0, 0, 0, 0.1)';
                    }
                },
            },
        },
        title: {
            text: 'Line chart with title, axis and grid',
            align: 'start',
        },
    },
};

export const LineTitleSubtitleGrid: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 0, y: 2400, z: 1 },
            { x: 1, y: -140, z: 2 },
            { x: 2, y: 2000, z: 3 },
            { x: 3, y: 3, z: 1 },
            { x: 4, y: 180.47, z: 1 },
            { x: 5, y: 778, z: 1 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Line chart with title, subtitle and grid',
        padding: 6,
        series: [
            {
                type: 'line',
                valueColumn: 'y',
                tension: 0,
                borderColor: COLORS.red,
                pointRadius: 0,
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
                text: 'yfdfgergergejrngoje',
                align: 'center',
            },
            gridLines: {
                display: true,
                color: function (ticksValue) {
                    if (ticksValue === 0) {
                        return 'rgba(0, 0, 0, 0.4)';
                    } else {
                        return 'rgba(0, 0, 0, 0.1)';
                    }
                },
            },
        },
        title: {
            text: 'Line chart with title, subtitle and grid',
            align: 'start',
        },
        subtitle: {
            display: true,
            text: ['Custom Chart Subtitle'],
            align: 'start',
        },
    },
};

export const LineTitleDataValues: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 0, y: 2400, z: 1 },
            { x: 1, y: -140, z: 2 },
            { x: 2, y: 2000, z: 3 },
            { x: 3, y: 3, z: 1 },
            { x: 4, y: 180.47, z: 1 },
            { x: 5, y: 778, z: 1 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Line chart with title and data values on axis',
        padding: 6,
        series: [
            {
                type: 'line',
                valueColumn: 'y',
                tension: 0,
                borderColor: COLORS.red,
                pointRadius: 0,
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
                },
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
            gridLines: {
                display: true,
                drawBorder: false,
                color: function (ticksValue) {
                    if (ticksValue === 0) {
                        return 'rgba(0, 0, 0, 0.4)';
                    } else {
                        return 'transparent';
                    }
                },
            },
            ticks: {
                display: true,
                zeroTick: true,
            },
        },
        title: {
            text: 'Line chart with title and data values on axis',
            align: 'start',
        },
    },
};

export const LineDataValuesOnly: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 0, y: 2400, z: 1 },
            { x: 1, y: -140, z: 2 },
            { x: 2, y: 2000, z: 3 },
            { x: 3, y: 3, z: 1 },
            { x: 4, y: 180.47, z: 1 },
            { x: 5, y: 778, z: 1 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Line chart with data values on axis',
        padding: 6,
        series: [
            {
                type: 'line',
                valueColumn: 'y',
                tension: 0,
                borderColor: COLORS.red,
                pointRadius: 0,
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
                },
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
            gridLines: {
                display: true,
                drawBorder: false,
                color: function (ticksValue) {
                    if (ticksValue === 0) {
                        return 'rgba(0, 0, 0, 0.4)';
                    } else {
                        return 'transparent';
                    }
                },
            },
            ticks: {
                display: true,
                zeroTick: true,
            },
        },
    },
};
