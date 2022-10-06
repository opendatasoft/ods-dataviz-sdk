import { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { Meta } from '@storybook/react';
import { Props } from '../../../src';
import { defaultSource } from '../../utils';
import ChartTemplate from '../ChartTemplate';

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

export const RadarTitleScale = ChartTemplate.bind({});
const RadarTitleScaleArgs: Props<DataFrame, ChartOptions> = {
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
        axis: {
            r: {
                gridLines: {},
            },
        },
        title: {
            text: 'Radar chart with title and scale',
        },
    },
};
RadarTitleScale.args = RadarTitleScaleArgs;

export const RadarTitleScaleNegativePositive = ChartTemplate.bind({});
const RadarTitleScaleNegativePositiveArgs: Props<DataFrame, ChartOptions> = {
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
        axis: {
            r: {
                gridLines: {
                    display: true,
                },
            },
        },
        title: {
            text: 'Radar chart with title and scale',
        },
    },
};
RadarTitleScaleNegativePositive.args = RadarTitleScaleNegativePositiveArgs;

export const RadarTitle = ChartTemplate.bind({});
const RadarTitleArgs: Props<DataFrame, ChartOptions> = {
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
        axis: {
            r: {
                ticks: { display: false },
            },
        },
    },
};
RadarTitle.args = RadarTitleArgs;

export const RadarTitleDataValues = ChartTemplate.bind({});
const RadarTitleDataValuesArg: Props<DataFrame, ChartOptions> = {
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
                    align(index: number) {
                        if (df[index].y > 0) {
                            return 'end';
                        }
                        if (df[index].y === 0) {
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
        axis: {
            r: {
                ticks: { display: false },
            },
        },
    },
};
RadarTitleDataValues.args = RadarTitleDataValuesArg;
