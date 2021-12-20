import { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { Meta } from '@storybook/react';
import { Props } from '../../../src';
import { defaultSource } from '../../utils';
import { Sample } from '../Chart.stories';
import { storyWithArgs } from '../../utils';

const meta: Meta = {
    title: 'Chart/StudioLayouts/RadarChart',
};

export default meta;

const df = [
    { x: 'speed', y: 100, z: 10 },
    { x: 'strength', y: 50, z: 45 },
    { x: 'magic', y: 80, z: 100 },
    { x: 'luck', y: 30, z: 100 },
    { x: 'persuasion', y: 70, z: 2 },
];

export const RadarTitleScale = storyWithArgs<Props<DataFrame, ChartOptions>>(Sample, {
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
        source: defaultSource,
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
        rAxis: {
            gridLines: {},
        },
        title: {
            text: 'Radar chart with title and scale',
        },
    },
});

export const RadarTitleScaleNegativePositive = storyWithArgs<Props<DataFrame, ChartOptions>>(
    Sample,
    {
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
            source: defaultSource,
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
            rAxis: {
                gridLines: {
                    display: true,
                },
            },
            title: {
                text: 'Radar chart with title and scale',
            },
        },
    }
);

export const RadarTitle = storyWithArgs<Props<DataFrame, ChartOptions>>(Sample, {
    data: {
        loading: false,
        value: df,
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
        title: {
            text: 'Radar chart with title',
        },
        rAxis: {
            ticks: { display: false },
        },
    },
});

export const RadarTitleDataValues = storyWithArgs<Props<DataFrame, ChartOptions>>(Sample, {
    data: {
        loading: false,
        value: df,
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
                    align(index) {
                        if (df[index].y > 0) {
                            return 'end';
                        } else if (df[index].y === 0) {
                            return 'center';
                        }
                        return 'start';
                    },
                    color: 'rgb(127,10,210)',
                },
            },
        ],
        legend: {
            display: true,
        },
        title: {
            text: 'Radar chart with title and data values',
        },
        rAxis: {
            ticks: { display: false },
        },
    },
});
