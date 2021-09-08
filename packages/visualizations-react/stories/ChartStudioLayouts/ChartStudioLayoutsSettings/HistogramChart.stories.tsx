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
        padding: 6,
        series: [
            {
                type: 'bar',
                valueColumn: 'y',
                barPercentage: 1,
                categoryPercentage: 1,
                backgroundColor: 'rgba(50,50,225,0.5)',
                borderColor: 'rgba(50,50,225)',
                borderWidth: 2,
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
        padding: 6,
        series: [
            {
                type: 'bar',
                valueColumn: 'y',
                barPercentage: 1,
                categoryPercentage: 1,
                backgroundColor: 'rgba(50,50,225,0.5)',
                borderColor: 'rgba(50,50,225)',
                borderWidth: 2,
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
        padding: 6,
        series: [
            {
                type: 'bar',
                valueColumn: 'y',
                barPercentage: 1,
                categoryPercentage: 1,
                backgroundColor: 'rgba(50,50,225,0.5)',
                borderColor: 'rgba(50,50,225)',
                borderWidth: 2,
                dataLabels: {
                    display: true,
                    align: function (index, { dataFrame }) {
                        if (dataFrame[index].y > 0) {
                            return 'end';
                        } else if (dataFrame[index].y === 0) {
                            return 'center';
                        } else {
                            return 'start';
                        }
                    },
                    anchor: function (index, { dataFrame }) {
                        if (dataFrame[index].y > 0) {
                            return 'end';
                        } else if (dataFrame[index].y === 0) {
                            return 'center';
                        } else {
                            return 'start';
                        }
                    },
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
                drawBorder: false,
                display: true,
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
        padding: 6,
        series: [
            {
                type: 'bar',
                valueColumn: 'y',
                barPercentage: 1,
                categoryPercentage: 1,
                backgroundColor: 'rgba(50,50,225,0.5)',
                borderColor: 'rgba(50,50,225)',
                borderWidth: 2,
                dataLabels: {
                    display: true,
                    align: function (index, { dataFrame }) {
                        if (dataFrame[index].y > 0) {
                            return 'end';
                        } else if (dataFrame[index].y === 0) {
                            return 'center';
                        } else {
                            return 'start';
                        }
                    },
                    anchor: function (index, { dataFrame }) {
                        if (dataFrame[index].y > 0) {
                            return 'end';
                        } else if (dataFrame[index].y === 0) {
                            return 'center';
                        } else {
                            return 'start';
                        }
                    },
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
                drawBorder: false,
                display: true,
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
        padding: 6,
        series: [
            {
                type: 'bar',
                valueColumn: 'y',
                barPercentage: 1,
                categoryPercentage: 1,
                backgroundColor: 'rgba(50,50,225,0.5)',
                borderColor: 'rgba(50,50,225)',
                borderWidth: 2,
                dataLabels: {
                    display: true,
                    align: function (index, { dataFrame }) {
                        if (dataFrame[index].y > 0) {
                            return 'end';
                        } else if (dataFrame[index].y === 0) {
                            return 'center';
                        } else {
                            return 'start';
                        }
                    },
                    anchor: function (index, { dataFrame }) {
                        if (dataFrame[index].y > 0) {
                            return 'end';
                        } else if (dataFrame[index].y === 0) {
                            return 'center';
                        } else {
                            return 'start';
                        }
                    },
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
                drawBorder: false,
                display: true,
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
