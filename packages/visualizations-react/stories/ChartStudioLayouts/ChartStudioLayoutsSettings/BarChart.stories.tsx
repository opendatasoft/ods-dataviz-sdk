import { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { Props } from '../../../src';
import { COLORS, styleForLayouts } from '../../utils';

export const BarTitleAxisGrid: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
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
        ariaLabel: 'Bar chart with title, axis and grid',
        padding: 6,
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
                color: function (ticksValue) {
                    if (ticksValue === 0) {
                        return 'rgba(0, 0, 0, 0.4)';
                    } else {
                        return 'rgba(0, 0, 0, 0.1)';
                    }
                },
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
            align: 'start',
        },
    },
};

export const BarAxisGrid: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
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
        ariaLabel: 'Bar chart with axis and grid',
        padding: 6,
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
};

export const BarTitleAxisDataValues: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
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
        ariaLabel: 'Bar chart with title, axis and data values',
        padding: 6,
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
            type: 'linear',
            offset: false,
            title: {
                display: true,
                text: 'x',
                align: 'center',
            },
            ticks: {
                display: false,
            },
            gridLines: {
                display: true,
                color: function (ticksValue) {
                    if (ticksValue === 0) {
                        return 'rgba(0, 0, 0, 0.4)';
                    } else {
                        return 'transparent';
                    }
                },
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
            align: 'start',
        },
    },
};

export const BarAxisDataValues: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
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
        ariaLabel: 'Bar chart with axis and data values',
        padding: 6,
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
            type: 'linear',
            offset: false,
            title: {
                display: true,
                text: 'x',
                align: 'center',
            },
            gridLines: {
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
                display: false,
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
};

export const BarTitleSubTitleGrid: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
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
        ariaLabel: 'Bar chart with title, subtitle and grid',
        padding: 6,
        maintainAspectRatio: true,
        aspectRatio: 2/1.3,
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
                color: function (ticksValue) {
                    if (ticksValue === 0) {
                        return 'rgba(0, 0, 0, 0.4)';
                    } else {
                        return 'transparent';
                    }
                },
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
            align: 'start',
        },
        subtitle: {
            display: true,
            text: 'Custom Chart Subtitle',
            align: 'start',
        },
    },
};
