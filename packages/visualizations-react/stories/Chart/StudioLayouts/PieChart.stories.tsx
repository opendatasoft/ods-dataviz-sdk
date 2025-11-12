import React from 'react';
import type { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { ChartSeriesType } from '@opendatasoft/visualizations';
import { Meta, StoryObj } from '@storybook/react';
import type { Props } from 'reactify';

import { compactNumberFormatter, defaultSource } from '../../utils';
import ChartTemplate from '../ChartTemplate';

const meta: Meta = {
    title: 'Chart/StudioLayouts/PieChart',
};

export default meta;

const df = [
    { x: 'Alpha', y: 100 },
    { x: 'Beta', y: -50 },
    { x: 'Gamma', y: 20 },
    { x: 'Delta', y: 30 },
];

const PieTitleSectorsNameArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        series: [
            {
                type: ChartSeriesType.Pie,
                valueColumn: 'y',
                backgroundColor: ['#CB4335', '#1F618D', '#F1C40F', '#27AE60'],
                dataLabels: {
                    display: true,
                    text(index: number) {
                        return df[index].x;
                    },
                },
            },
        ],
        title: {
            text: 'Pie chart with title and sectors name',
        },
    },
};
export const PieTitleSectorsName: StoryObj<typeof ChartTemplate> = {
    args: PieTitleSectorsNameArgs,
    render: args => <ChartTemplate {...args} />,
};

const PieTitleSectorsNameValueArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        series: [
            {
                type: ChartSeriesType.Pie,
                valueColumn: 'y',
                backgroundColor: ['#CB4335', '#1F618D', '#F1C40F', '#27AE60'],
                dataLabels: {
                    display: true,
                    text(index: number) {
                        const xData = df[index].x;
                        const yData = compactNumberFormatter.format(df[index].y);
                        return [xData, yData];
                    },
                },
            },
        ],
        title: {
            text: 'Pie chart with title and sectors name with values',
        },
    },
};
export const PieTitleSectorsNameValue: StoryObj<typeof ChartTemplate> = {
    args: PieTitleSectorsNameValueArgs,
    render: args => <ChartTemplate {...args} />,
};

const PieTitleLegendArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        series: [
            {
                type: ChartSeriesType.Pie,
                valueColumn: 'y',
                backgroundColor: ['#CB4335', '#1F618D', '#F1C40F', '#27AE60'],
            },
        ],
        legend: {
            display: true,
            position: 'right',
        },
        title: {
            text: 'Pie chart with title and legend',
        },
    },
};
export const PieTitleLegend: StoryObj<typeof ChartTemplate> = {
    args: PieTitleLegendArgs,
    render: args => <ChartTemplate {...args} />,
};

const PieTitleLegendValuesArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: [
            { x: 'Alpha', y: 100 },
            { x: 'Beta', y: 50 },
            { x: 'Gamma', y: 20 },
            { x: 'Delta', y: 30 },
        ],
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        series: [
            {
                type: ChartSeriesType.Pie,
                valueColumn: 'y',
                backgroundColor: ['#CB4335', '#1F618D', '#F1C40F', 'rgb(39,174,96)'],
            },
        ],
        legend: {
            display: true,
            position: 'right',
            labels: {
                text(index: number) {
                    const xData = df[index].x;
                    const yData = compactNumberFormatter.format(df[index].y);
                    return `${xData} - ${yData}`;
                },
            },
        },
        title: {
            text: 'Pie chart with title and legend with values',
        },
    },
};
export const PieTitleLegendValues: StoryObj<typeof ChartTemplate> = {
    args: PieTitleLegendValuesArgs,
    render: args => <ChartTemplate {...args} />,
};
