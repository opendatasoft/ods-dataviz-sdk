import { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { Props } from '../../../src';
import { COLORS, styleForLayouts } from '../../utils';

export const BarTitleAxisGrid: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: '01/01', y: 100, z: 45 },
            { x: '02/01', y: -50, z: 50 },
            { x: '03/01', y: 20, z: 100 },
            { x: '04/01', y: 30, z: 20 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Bar chart with title, axis and grid',
        series: [
            {
                type: 'bar',
                valueColumn: 'y',
                indexAxis: 'y',
                backgroundColor: 'rgba(22, 161, 145, 0.26)',
                borderColor:'rgba(22, 161, 145)',
            },
            {
                type: 'bar',
                valueColumn: 'z',
                indexAxis: 'y',
                backgroundColor:'rgba(119, 73, 54, 0.26)',
                borderColor: 'rgba(119, 73, 54)',
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
                color: function (ticksIndex, ticksToColor) {
                    if (ticksIndex === ticksToColor) {
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
            type: 'linear',
            offset: false,
            title: {
                display: true,
                text: 'x',
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
            { x: '01/01', y: 100, z: 45 },
            { x: '02/01', y: -50, z: 50 },
            { x: '03/01', y: 20, z: 100 },
            { x: '04/01', y: 30, z: 20 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Bar chart with title, axis and data values',
        padding:24,
        series: [
            {
                type: 'bar',
                valueColumn: 'y',
                indexAxis: 'y',
                backgroundColor: 'rgba(22, 161, 145, 0.26)',
                borderColor:'rgba(22, 161, 145)',
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
                type: 'bar',
                valueColumn: 'z',
                indexAxis: 'y',
                backgroundColor: 'rgba(119, 73, 54, 0.26)',
                borderColor:'rgba(119, 73, 54)',
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
            offset: false,
            title: {
                display: true,
                text: 'x',
                align: 'center',
            },
            ticks: {
                display: true,
                zeroTick: true,
            },
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
        padding:24,
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
            type: 'linear',
            title: {
                display: false,
                text: 'x',
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


export const BarTitleSubTitleGridNegative: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: '01/01', y: -100 },
            { x: '02/01', y: -50 },
            { x: '03/01', y: -20 },
            { x: '04/01', y: -30 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Bar chart with title, subtitle and grid',
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
            type: 'linear',
            title: {
                display: false,
                text: 'x',
                align: 'center',
            },
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
