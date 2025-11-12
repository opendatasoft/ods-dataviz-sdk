import React from 'react';
import type { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { ChartSeriesType } from '@opendatasoft/visualizations';
import { Meta, StoryObj } from '@storybook/react';
import type { Props } from 'reactify';
import { compactNumberFormatter, defaultSource } from '../../utils';

import ChartTemplate from '../ChartTemplate';

const meta: Meta = {
    title: 'Chart/RadialCharts',
};
const df = [
    { x: 'Alpha', y: 100 },
    { x: 'Beta', y: 50 },
    { x: 'Gamma', y: 20 },
    { x: 'Delta', y: 30 },
];
export default meta;

const basePieChartArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        title: {
            text: 'Pie Chart',
        },
        series: [
            {
                type: ChartSeriesType.Pie,
                valueColumn: 'y',
                backgroundColor: ['#CB4335', '#1F618D', '#F1C40F', '#27AE60'],
            },
        ],
    },
};
export const PieChart: StoryObj<typeof ChartTemplate> = {
    args: basePieChartArgs,
    render: args => <ChartTemplate {...args} />,
};

const PieDataLabelCustomLegendValuesArgs: Props<DataFrame, ChartOptions> = {
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
                },
            },
        ],
        padding: 32,
        legend: {
            display: false,
            custom: true,
            position: 'bottom',
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
export const PieDataLabelCustomLegendValues: StoryObj<typeof ChartTemplate> = {
    args: PieDataLabelCustomLegendValuesArgs,
    render: args => <ChartTemplate {...args} />,
};

const DoughnutChartArgs: Props<DataFrame, ChartOptions> = {
    ...basePieChartArgs,
    options: {
        labelColumn: 'x',
        title: {
            text: 'Doughnut Chart',
        },
        series: [
            {
                type: ChartSeriesType.Doughnut,
                valueColumn: 'y',
                cutout: '65%',
                backgroundColor: ['#CB4335', '#1F618D', '#F1C40F', '#27AE60'],
            },
        ],
    },
};
export const DoughnutChart: StoryObj<typeof ChartTemplate> = {
    args: DoughnutChartArgs,
    render: args => <ChartTemplate {...args} />,
};

const DoughnutDataLabelCustomLegendValuesArgs: Props<DataFrame, ChartOptions> = {
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
                type: ChartSeriesType.Doughnut,
                cutout: '65%',
                valueColumn: 'y',
                backgroundColor: ['#CB4335', '#1F618D', '#F1C40F', '#27AE60'],
                dataLabels: {
                    display: true,
                },
            },
        ],
        padding: 32,
        legend: {
            display: false,
            custom: true,
            position: 'bottom',
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
export const DoughnutDataLabelCustomLegendValues: StoryObj<typeof ChartTemplate> = {
    args: DoughnutDataLabelCustomLegendValuesArgs,
    render: args => <ChartTemplate {...args} />,
};
