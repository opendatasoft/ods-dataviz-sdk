import React from 'react';
import type { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { ChartSeriesType } from '@opendatasoft/visualizations';
import { Meta, StoryObj } from '@storybook/react';
import type { Props } from 'reactify';

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
        series: [
            {
                type: ChartSeriesType.Radar,
                valueColumn: 'y',
                label: 'User 1',
                backgroundColor: 'rgba(27,210,210,0.5)',
                borderColor: 'rgb(27,210,210)',
            },
            {
                type: ChartSeriesType.Radar,
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
export const RadarTitleScale: StoryObj<typeof ChartTemplate> = {
    args: RadarTitleScaleArgs,
    render: args => <ChartTemplate {...args} />,
};

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
        series: [
            {
                type: ChartSeriesType.Radar,
                valueColumn: 'y',
                label: 'User 1',
                backgroundColor: 'rgba(27,210,210,0.5)',
                borderColor: 'rgb(27,210,210)',
            },
            {
                type: ChartSeriesType.Radar,
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
export const RadarTitleScaleNegativePositive: StoryObj<typeof ChartTemplate> = {
    args: RadarTitleScaleNegativePositiveArgs,
    render: args => <ChartTemplate {...args} />,
};

const RadarTitleArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        series: [
            {
                type: ChartSeriesType.Radar,
                valueColumn: 'y',
                label: 'User 1',
                backgroundColor: 'rgba(27,210,210,0.5)',
                borderColor: 'rgb(27,210,210)',
            },
            {
                type: ChartSeriesType.Radar,
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
export const RadarTitle: StoryObj<typeof ChartTemplate> = {
    args: RadarTitleArgs,
    render: args => <ChartTemplate {...args} />,
};

const RadarTitleDataValuesArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        series: [
            {
                type: ChartSeriesType.Radar,
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
                type: ChartSeriesType.Radar,
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
export const RadarTitleDataValues: StoryObj<typeof ChartTemplate> = {
    args: RadarTitleDataValuesArgs,
    render: args => <ChartTemplate {...args} />,
};
