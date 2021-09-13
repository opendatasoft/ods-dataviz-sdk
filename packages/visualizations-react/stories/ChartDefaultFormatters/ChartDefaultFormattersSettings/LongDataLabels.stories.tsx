import { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { Props } from '../../../src';
import { COLORS, styleForLayouts } from '../../utils';

export const LineLongDataLabels: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 0, y: 240000000, z: 1 },
            { x: 1, y: -14000000, z: 2 },
            { x: 2, y: 200000000, z: 3 },
            { x: 3, y: 300000, z: 1 },
            { x: 4, y: 1800000.47, z: 1 },
            { x: 5, y: 778000, z: 1 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Line chart with data values on axis',
        series: [
            {
                type: 'line',
                valueColumn: 'y',
                tension: 0,
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
            },
        ],
        xAxis: {
            display: true,
            type: 'linear',
            title: {
                display: true,
                text: 'Date de plantation',
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

export const PieLongDataLabels: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla optio unde porro incidunt provident quis amet saepe voluptas explicabo maiores. Voluptatum itaque dolores consectetur assumenda repellendus accusamus laudantium vero deleniti.', y: 1000000 },
            { x: 'Beta', y: -5000000 },
            { x: 'Gamma', y: 2000000 },
            { x: 'Delta', y: 3000000 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Pie chart with title and sectors name with values',
        series: [
            {
                type: 'pie',
                valueColumn: 'y',
                backgroundColor: [
                    '#CB4335',
                    '#1F618D',
                    '#F1C40F',
                    '#27AE60',
                ],
                dataLabels: {
                    display: true,
                    formatter: function (index, dataFrame ) {
                        return [`${dataFrame[index].x}`, `${dataFrame[index].y}`];
                    },
                },
            },
        ],
        tooltips: {
            display: true,
        },
        title: {
            text: 'Pie chart with long data labels',
            align: 'center',
            padding: {
                bottom: 36,
            },
        },
    },
};

export const RadarLongDataLabels: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 'speed', y: 10000, z: 10 },
            { x: 'strength', y: 50000, z: 45 },
            { x: 'magic', y: 80000, z: 100 },
            { x: 'luck', y: 30000, z: 100 },
            { x: 'persuasion', y: 7000, z: 2 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Radar chart',
        series: [
            {
                type: 'radar',
                valueColumn: 'y',
                label: 'User 1',
                backgroundColor: 'rgba(27,210,210,0.5)',
                borderColor: 'rgb(27,210,210)',
                dataLabels: {
                    display: 'auto',
                    borderRadius: 4,
                },
            },
            {
                type: 'radar',
                valueColumn: 'z',
                label: 'User 2',
                backgroundColor: 'rgba(127,10,210,0.5)',
                borderColor: 'rgb(127,10,210)',
                dataLabels: {
                    display: 'auto',
                    borderRadius: 4,
                    align: function (index, { dataFrame }) {
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
        legend: {
            display: true,
        },
        tooltips: {
            display: true,
        },
        title: {
            text: 'Radar chart with long data labels',
            align: 'center',
        },
        rAxis: {
            ticks: { display: false },
        },
    },
};