import { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { Props } from '../../../src';
import { COLORS, styleForLayouts } from '../../utils';

export const AreaTitleAxisGridDots: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 0, y: 2400},
            { x: 1, y: -140},
            { x: 2, y: 2000},
            { x: 3, y: 3},
            { x: 4, y: 180.47},
            { x: 5, y: 778},
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
                borderColor: 'rgb(22, 161, 145)',
                fill: {
                    mode: 'origin',
                    above: 'rgb(22, 161, 145, 0.26)',
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
            },
            gridLines: {
                display: true,
                color: function (ticksIndex, ticksToColor) {
                    if (ticksIndex === ticksToColor) {
                        return 'rgba(0, 0, 0, 0.4)';
                    } else {
                        return 'rgba(0, 0, 0, 0.1)';
                    }
                },
            },
        },
        title: {
            text: 'Area chart with title, axis, grid and dots',
            align: 'start',
        },
    },
};

export const AreaAxisGridDots: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 0, y: 2400},
            { x: 1, y: -140},
            { x: 2, y: 2000},
            { x: 3, y: 3},
            { x: 4, y: 180.47},
            { x: 5, y: 778},
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
                borderColor: 'rgb(22, 161, 145)',
                fill: {
                    mode: 'origin',
                    above: 'rgb(22, 161, 145, 0.26)',
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
                color: function (ticksIndex, ticksToColor) {
                    if (ticksIndex === ticksToColor) {
                        return 'rgba(0, 0, 0, 0.4)';
                    } else {
                        return 'rgba(0, 0, 0, 0.1)';
                    }
                },
            },
        },
    },
};

export const AreaTitleAxisGrid: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 0, y: 2400},
            { x: 1, y: -140},
            { x: 2, y: 2000},
            { x: 3, y: 3},
            { x: 4, y: 180.47},
            { x: 5, y: 778},
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
                pointRadius: 0,
                borderColor: 'rgb(22, 161, 145)',
                fill: {
                    mode: 'origin',
                    above: 'rgb(22, 161, 145, 0.26)',
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
                color: function (ticksIndex, ticksToColor) {
                    if (ticksIndex === ticksToColor) {
                        return 'rgba(0, 0, 0, 0.4)';
                    } else {
                        return 'rgba(0, 0, 0, 0.1)';
                    }
                },
            },
        },
        title: {
            text: 'Area chart with title, axis and grid',
            align: 'start',
        },
    },
};

export const AreaTitleSubtitleGrid: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 0, y: 2400},
            { x: 1, y: -140},
            { x: 2, y: 2000},
            { x: 3, y: 3},
            { x: 4, y: 180.47},
            { x: 5, y: 778},
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
                pointRadius: 0,
                borderColor: 'rgb(22, 161, 145)',
                fill: {
                    mode: 'origin',
                    above: 'rgb(22, 161, 145, 0.26)',
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
                color: function (ticksIndex, ticksToColor) {
                    if (ticksIndex === ticksToColor) {
                        return 'rgba(0, 0, 0, 0.4)';
                    } else {
                        return 'rgba(0, 0, 0, 0.1)';
                    }
                },
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

export const AreaTitleDataValues: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 0, y: 2400},
            { x: 1, y: -140},
            { x: 2, y: 2000},
            { x: 3, y: 3},
            { x: 4, y: 180.47},
            { x: 5, y: 778},
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Area chart with title and data values on axis',
        series: [
            {
                type: 'line',
                valueColumn: 'y',
                tension: 0.3,
                borderColor: 'rgb(22, 161, 145)',
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
                fill: {
                    mode: 'origin',
                    above: 'rgb(22, 161, 145, 0.26)',
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
            gridLines: {
                display: true,
                color: function (ticksIndex, ticksToColor) {
                    if (ticksIndex === ticksToColor) {
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
            text: 'Area chart with title and data values on axis',
            align: 'start',
        },
    },
};

export const AreaDataValuesOnly: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 0, y: 2400},
            { x: 1, y: -140},
            { x: 2, y: 2000},
            { x: 3, y: 3},
            { x: 4, y: 180.47},
            { x: 5, y: 778},
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
                borderColor: 'rgb(22, 161, 145)',
                fill: {
                    mode: 'origin',
                    above: 'rgb(22, 161, 145, 0.26)',
                },
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
            gridLines: {
                display: true,
                color: function (ticksIndex, ticksToColor) {
                    if (ticksIndex === ticksToColor) {
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
