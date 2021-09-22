import { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { Props } from '../../../src';
import { styleForLayouts } from '../../utils';

export const RadarTitleScale: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 'speed', y: -100, z: -10 },
            { x: 'strength', y: -50, z: -45 },
            { x: 'magic', y: -80, z: -100 },
            { x: 'luck', y: -30, z: -100 },
            { x: 'persuasion', y: -70, z: -2 },
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
            },
            {
                type: 'radar',
                valueColumn: 'z',
                label: 'User 2',
                backgroundColor: 'rgba(127,10,210,0.5)',
                borderColor: 'rgb(127,10,210)',
            },
        ],
        legend: {
            display: true,
        },
        tooltips: {
            display: true,
        },
        rAxis: {
            gridLines: {
            },
        },
        title: {
            text: 'Radar chart with title and scale',
            align: 'center',
        },
    },
};

export const RadarTitleScaleNegativePositive: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 'speed', y: 100, z: 10 },
            { x: 'strength', y: -50, z: 45 },
            { x: 'magic', y: 80, z: -100 },
            { x: 'luck', y: 30, z: 100 },
            { x: 'persuasion', y: 70, z: 2 },
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
            },
            {
                type: 'radar',
                valueColumn: 'z',
                label: 'User 2',
                backgroundColor: 'rgba(127,10,210,0.5)',
                borderColor: 'rgb(127,10,210)',
            },
        ],
        legend: {
            display: true,
        },
        tooltips: {
            display: true,
        },
        rAxis: {
            gridLines: {
                display: true,
            },
        },
        title: {
            text: 'Radar chart with title and scale',
            align: 'center',
        },
    },
};

export const RadarTitle: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 'speed', y: 100, z: 10 },
            { x: 'strength', y: 50, z: 45 },
            { x: 'magic', y: 80, z: 100 },
            { x: 'luck', y: 30, z: 100 },
            { x: 'persuasion', y: 70, z: 2 },
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
            },
            {
                type: 'radar',
                valueColumn: 'z',
                label: 'User 2',
                backgroundColor: 'rgba(127,10,210,0.5)',
                borderColor: 'rgb(127,10,210)',
            },
        ],
        legend: {
            display: true,
        },
        tooltips: {
            display: true,
        },
        title: {
            text: 'Radar chart with title',
            align: 'center',
        },
        rAxis: {
            ticks: { display: false },
        },
    },
};

export const RadarTitleDataValues: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 'speed', y: 100, z: 10 },
            { x: 'strength', y: 50, z: 45 },
            { x: 'magic', y: 80, z: 100 },
            { x: 'luck', y: 30, z: 100 },
            { x: 'persuasion', y: 70, z: 2 },
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
            text: 'Radar chart with title and data values',
            align: 'center',
        },
        rAxis: {
            ticks: { display: false },
        },
    },
};
