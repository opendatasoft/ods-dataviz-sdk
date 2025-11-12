import React from 'react';
import type { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { ChartSeriesType } from '@opendatasoft/visualizations';
import { Meta, StoryObj } from '@storybook/react';
import type { Props } from 'reactify';

import { defaultSource } from '../../utils';
import ChartTemplate from '../ChartTemplate';

const meta: Meta = {
    title: 'Chart/StudioLayouts/AreaChart',
};

export default meta;

const df = [
    { x: 0, y: 2400, z: 1021 },
    { x: 1, y: -140, z: 2424 },
    { x: 2, y: 2000, z: 3222 },
    { x: 3, y: 3, z: 1255 },
    { x: 4, y: 180.47, z: 1424 },
    { x: 5, y: 778, z: 12 },
];

const AreaTitleAxisGridDotsArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        series: [
            {
                type: ChartSeriesType.Line,
                valueColumn: 'y',
                tension: 0.3,
                borderColor: 'rgb(22, 161, 145)',
                fill: {
                    mode: 'origin',
                    above: 'rgb(22, 161, 145, 0.26)',
                    below: 'rgb(22, 161, 145, 0.26)',
                },
            },
            {
                type: ChartSeriesType.Line,
                valueColumn: 'z',
                tension: 0.3,
                borderColor: 'rgb(119, 73, 54)',
                fill: {
                    mode: 'origin',
                    above: 'rgb(119, 73, 54, 0.26)',
                    below: 'rgb(119, 73, 54, 0.26)',
                },
            },
        ],
        axis: {
            x: {
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
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'hello',
                },
                gridLines: {
                    display: true,
                },
            },
        },
        title: {
            text: 'Area chart with title, axis, grid and dots',
        },
    },
};
export const AreaTitleAxisGridDots: StoryObj<typeof ChartTemplate> = {
    args: AreaTitleAxisGridDotsArgs,
    render: args => <ChartTemplate {...args} />,
};

const AreaAxisGridDotsArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        series: [
            {
                type: ChartSeriesType.Line,
                valueColumn: 'y',
                tension: 0.3,
                borderColor: 'rgb(22, 161, 145)',
                fill: {
                    mode: 'origin',
                    above: 'rgb(22, 161, 145, 0.26)',
                    below: 'rgb(22, 161, 145, 0.26)',
                },
            },
        ],
        axis: {
            x: {
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
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'y',
                    align: 'center',
                },
                gridLines: {
                    display: true,
                },
            },
        },
    },
};
export const AreaAxisGridDots: StoryObj<typeof ChartTemplate> = {
    args: AreaAxisGridDotsArgs,
    render: args => <ChartTemplate {...args} />,
};

const AreaTitleAxisGridArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        series: [
            {
                type: ChartSeriesType.Line,
                valueColumn: 'y',
                tension: 0.3,
                pointRadius: 0,
                borderColor: 'rgb(22, 161, 145)',
                fill: {
                    mode: 'origin',
                    above: 'rgb(22, 161, 145, 0.26)',
                    below: 'rgb(22, 161, 145, 0.26)',
                },
            },
        ],
        axis: {
            x: {
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
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'y',
                    align: 'center',
                },
                gridLines: {
                    display: true,
                },
            },
        },
        title: {
            text: 'Area chart with title, axis and grid',
        },
    },
};
export const AreaTitleAxisGrid: StoryObj<typeof ChartTemplate> = {
    args: AreaTitleAxisGridArgs,
    render: args => <ChartTemplate {...args} />,
};

const AreaTitleSubtitleGridArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        series: [
            {
                type: ChartSeriesType.Line,
                valueColumn: 'y',
                tension: 0.3,
                pointRadius: 0,
                borderColor: 'rgb(22, 161, 145)',
                fill: {
                    mode: 'origin',
                    above: 'rgb(22, 161, 145, 0.26)',
                    below: 'rgb(22, 161, 145, 0.26)',
                },
            },
        ],
        axis: {
            x: {
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
            y: {
                display: true,
                title: {
                    display: false,
                    text: 'y',
                    align: 'center',
                },
                gridLines: {
                    display: true,
                },
            },
        },
        title: {
            text: 'Area chart with title, subtitle and grid',
        },
        subtitle: {
            text: 'Custom Chart Subtitle',
        },
    },
};
export const AreaTitleSubtitleGrid: StoryObj<typeof ChartTemplate> = {
    args: AreaTitleSubtitleGridArgs,
    render: args => <ChartTemplate {...args} />,
};

const AreaTitleDataValuesArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        series: [
            {
                type: ChartSeriesType.Line,
                valueColumn: 'y',
                tension: 0.3,
                borderColor: 'rgb(22, 161, 145)',
                pointRadius: 0,
                dataLabels: {
                    display: true,
                    align(index: number) {
                        if (df[index].y >= 0) {
                            return 'end';
                        }
                        return 'start';
                    },
                    anchor(index: number) {
                        if (df[index].y >= 0) {
                            return 'end';
                        }
                        return 'start';
                    },
                    color: 'rgb(22, 161, 145)',
                },
                fill: {
                    mode: 'origin',
                    above: 'rgb(22, 161, 145, 0.26)',
                    below: 'rgb(22, 161, 145, 0.26)',
                },
            },
        ],
        axis: {
            x: {
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
        title: {
            text: 'Area chart with title and data values on axis',
        },
    },
};
export const AreaTitleDataValues: StoryObj<typeof ChartTemplate> = {
    args: AreaTitleDataValuesArgs,
    render: args => <ChartTemplate {...args} />,
};

const AreaDataValuesOnlyArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        series: [
            {
                type: ChartSeriesType.Line,
                valueColumn: 'y',
                tension: 0.3,
                borderColor: 'rgb(22, 161, 145)',
                fill: {
                    mode: 'origin',
                    above: 'rgb(22, 161, 145, 0.26)',
                    below: 'rgb(22, 161, 145, 0.26)',
                },
                pointRadius: 0,
                dataLabels: {
                    display: true,
                    align(index: number) {
                        if (df[index].y >= 0) {
                            return 'end';
                        }
                        return 'start';
                    },
                    anchor(index: number) {
                        if (df[index].y >= 0) {
                            return 'end';
                        }
                        return 'start';
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
                    text: 'x',
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
};
export const AreaDataValuesOnly: StoryObj<typeof ChartTemplate> = {
    args: AreaDataValuesOnlyArgs,
    render: args => <ChartTemplate {...args} />,
};
