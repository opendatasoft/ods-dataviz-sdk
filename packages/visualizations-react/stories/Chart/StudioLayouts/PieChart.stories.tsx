import type { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { ChartSeriesType } from '@opendatasoft/visualizations';
import { Meta } from '@storybook/react';
import { Props } from '../../../src';
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

export const PieTitleSectorsName = ChartTemplate.bind({});
const PieTitleSectorsNameArgs: Props<DataFrame,ChartOptions> = {
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
                title: {
                    text: 'Pie chart with title and sectors name',
                },
            },
};
PieTitleSectorsName.args = PieTitleSectorsNameArgs;

export const PieTitleSectorsNameValue = ChartTemplate.bind({});
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
PieTitleSectorsNameValue.args = PieTitleSectorsNameValueArgs;

export const PieTitleLegend = ChartTemplate.bind({});
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
PieTitleLegend.args = PieTitleLegendArgs;

export const PieTitleLegendValues = ChartTemplate.bind({});
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
PieTitleLegendValues.args = PieTitleLegendValuesArgs;

export const PieDataLabelCustomLegendValues = ChartTemplate.bind({});
const PieDataLabelCustomLegendValuesArgs: Props<DataFrame, ChartOptions> = {
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
PieDataLabelCustomLegendValues.args = PieDataLabelCustomLegendValuesArgs;
