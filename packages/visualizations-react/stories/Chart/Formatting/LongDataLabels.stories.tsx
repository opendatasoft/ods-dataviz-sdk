import { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { Meta } from '@storybook/react';
import { Props } from '../../../src';
import { compactNumberFormatter, defaultSource } from '../../utils';
import { Sample } from '../Chart.stories';
import { storyWithArgs } from '../../utils';

const meta: Meta = {
    title: 'Chart/Formatting/LongDataLabels',
};

export default meta;

const lineDataFrame = [
    { x: 0, y: 240000000, z: 1 },
    { x: 1, y: -14000000, z: 2 },
    { x: 2, y: 200000000, z: 3 },
    { x: 3, y: 300000, z: 1 },
    { x: 4, y: 1800000.47, z: 1 },
    { x: 5, y: 778000, z: 1 },
];

export const LineLongDataLabels = storyWithArgs<Props<DataFrame, ChartOptions>>(Sample, {
    data: {
        loading: false,
        value: lineDataFrame,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
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
                    align: function (index) {
                        if (lineDataFrame[index].y >= 0) {
                            return 'end';
                        } else {
                            return 'start';
                        }
                    },
                    anchor: function (index) {
                        if (lineDataFrame[index].y >= 0) {
                            return 'end';
                        } else {
                            return 'start';
                        }
                    },
                    color: 'rgb(22, 161, 145)',
                },
            },
        ],
        axis: {
            x: {
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
            y: {
                display: true,
                gridLines: {
                    display: 'single',
                },
                ticks: {
                    display: 'single',
                },
            },
        },
    },
});

const pieDataFrame = [
    {
        x: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla optio unde porro incidunt provident quis amet saepe voluptas explicabo maiores. Voluptatum itaque dolores consectetur assumenda repellendus accusamus laudantium vero deleniti.',
        y: 1000000,
    },
    { x: 'Beta', y: -5000000 },
    { x: 'Gamma', y: 2000000 },
    { x: 'Delta', y: 3000000 },
];

export const PieLongDataLabels = storyWithArgs<Props<DataFrame, ChartOptions>>(Sample, {
    data: {
        loading: false,
        value: pieDataFrame,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        ariaLabel: 'Pie chart with title and sectors name with values',
        series: [
            {
                type: 'pie',
                valueColumn: 'y',
                backgroundColor: ['#CB4335', '#1F618D', '#F1C40F', '#27AE60'],
                dataLabels: {
                    display: true,
                    text(index) {
                        return [
                            pieDataFrame[index].x,
                            compactNumberFormatter.format(pieDataFrame[index].y),
                        ];
                    },
                },
            },
        ],
        title: {
            text: 'Pie chart with long data labels',
        },
    },
});

const radarDataFrame = [
    { x: 'speed', y: 10000, z: 1740 },
    { x: 'strength', y: 50000, z: 450 },
    { x: 'magic', y: 80000, z: 1010 },
    { x: 'luck', y: 30000, z: 100 },
    { x: 'persuasion', y: 7000, z: 24 },
];

export const RadarLongDataLabels = storyWithArgs<Props<DataFrame, ChartOptions>>(Sample, {
    data: {
        loading: false,
        value: radarDataFrame,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
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
                    color: 'rgb(27,210,210)',
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
                    align: function (index) {
                        if (radarDataFrame[index].y > 0) {
                            return 'end';
                        } else if (radarDataFrame[index].y === 0) {
                            return 'center';
                        } else {
                            return 'start';
                        }
                    },
                    color: 'rgb(127,10,210)',
                },
            },
        ],
        legend: {
            display: true,
        },
        title: {
            text: 'Radar chart with long data labels',
        },
        axis: {
            r: {
                ticks: { display: false },
            },
        },
    },
});
