import React from 'react';
import type { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { ChartSeriesType } from '@opendatasoft/visualizations';
import { Meta, StoryObj } from '@storybook/react';
import type { Props } from 'reactify';

import { compactNumberFormatter, defaultLinks } from '../../utils';
import ChartTemplate from '../ChartTemplate';

const meta: Meta = {
    title: 'Chart/StudioLayouts/DoughnutChart',
};

export default meta;

const df = [
    { x: 'Alpha', y: 100 },
    { x: 'Beta', y: -50 },
    { x: 'Gamma', y: 20 },
    { x: 'Delta', y: 30 },
];

const DoughnutTitleSectorsNameArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        links: defaultLinks,
        series: [
            {
                type: ChartSeriesType.Doughnut,
                valueColumn: 'y',
                cutout: '65%',
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
            text: 'Doughnut chart with title and sectors name',
        },
    },
};
export const DoughnutTitleSectorsName: StoryObj<typeof ChartTemplate> = {
    args: DoughnutTitleSectorsNameArgs,
    render: args => <ChartTemplate {...args} />,
};

const DoughnutTitleSectorsNameValueArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        links: defaultLinks,
        series: [
            {
                type: ChartSeriesType.Doughnut,
                cutout: '65%',
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
            text: 'Doughnut chart with title and sectors name with values',
        },
    },
};
export const DoughnutTitleSectorsNameValue: StoryObj<typeof ChartTemplate> = {
    args: DoughnutTitleSectorsNameValueArgs,
    render: args => <ChartTemplate {...args} />,
};

const DoughnutTitleLegendArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        links: defaultLinks,
        series: [
            {
                type: ChartSeriesType.Doughnut,
                valueColumn: 'y',
                cutout: '65%',
                backgroundColor: ['#CB4335', '#1F618D', '#F1C40F', '#27AE60'],
            },
        ],
        legend: {
            display: true,
            position: 'right',
        },
        title: {
            text: 'Doughnut chart with title and legend',
        },
    },
};
export const DoughnutTitleLegend: StoryObj<typeof ChartTemplate> = {
    args: DoughnutTitleLegendArgs,
    render: args => <ChartTemplate {...args} />,
};

const DoughnutTitleLegendValuesArgs: Props<DataFrame, ChartOptions> = {
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
        links: defaultLinks,
        series: [
            {
                type: ChartSeriesType.Doughnut,
                valueColumn: 'y',
                cutout: '65%',
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
            text: 'Doughnut chart with title and legend with values',
        },
    },
};
export const DoughnutTitleLegendValues: StoryObj<typeof ChartTemplate> = {
    args: DoughnutTitleLegendValuesArgs,
    render: args => <ChartTemplate {...args} />,
};
