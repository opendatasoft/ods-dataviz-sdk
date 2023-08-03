import type { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { ChartSeriesType } from '@opendatasoft/visualizations';
import { Meta } from '@storybook/react';
import { Props } from '../../../src';
import { compactNumberFormatter, defaultSource } from '../../utils';
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

export const DoughnutTitleSectorsName = ChartTemplate.bind({});
const DoughnutTitleSectorsNameArgs: Props<DataFrame,ChartOptions> = {
            data: {
                loading: false,
                value: df,
            },
            options: {
                labelColumn: 'x',
                source: defaultSource,
                series: [
                    {
                        type: ChartSeriesType.Doughnut,
                        valueColumn: 'y',
                        cutout:"65%",
                        backgroundColor: ['#CB4335', '#1F618D', '#F1C40F', '#27AE60'],
                        dataLabels: {
                            display: true,
                            text (index:number) {return df[index].x;}
                        },
                    },
                ],
                title: {
                    text: 'Doughnut chart with title and sectors name',
                },
            },
};
DoughnutTitleSectorsName.args = DoughnutTitleSectorsNameArgs;

export const DoughnutTitleSectorsNameValue = ChartTemplate.bind({});
const DoughnutTitleSectorsNameValueArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        series: [
            {
                type: ChartSeriesType.Doughnut,
                cutout:"65%",
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
DoughnutTitleSectorsNameValue.args = DoughnutTitleSectorsNameValueArgs;

export const DoughnutTitleLegend = ChartTemplate.bind({});
const DoughnutTitleLegendArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        series: [
            {
                type: ChartSeriesType.Doughnut,
                valueColumn: 'y',
                cutout:"65%",
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
DoughnutTitleLegend.args = DoughnutTitleLegendArgs;

export const DoughnutTitleLegendValues = ChartTemplate.bind({});
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
        source: defaultSource,
        series: [
            {
                type: ChartSeriesType.Doughnut,
                valueColumn: 'y',
                cutout:"65%",
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
DoughnutTitleLegendValues.args = DoughnutTitleLegendValuesArgs;

