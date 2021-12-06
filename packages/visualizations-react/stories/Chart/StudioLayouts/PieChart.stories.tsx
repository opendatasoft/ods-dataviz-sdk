import { ChartOptions, DataFrame, compactStringOrNumber } from '@opendatasoft/visualizations';
import { Meta } from '@storybook/react';
import { Props } from '../../../src';
import { defaultSource } from '../../utils';
import { Sample } from '../Chart.stories';
import { storyWithArgs } from '../../utils';

const meta: Meta = {
    title: 'Chart/StudioLayouts/PieChart',
};

export default meta;

export const PieTitleSectorsName = storyWithArgs<Props<DataFrame, ChartOptions>>(Sample, {
    data: {
        loading: false,
        value: [
            { x: 'Alpha', y: 100 },
            { x: 'Beta', y: -50 },
            { x: 'Gamma', y: 20 },
            { x: 'Delta', y: 30 },
        ],
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        ariaLabel: 'Pie chart with title and sectors name',
        series: [
            {
                type: 'pie',
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
});

export const PieTitleSectorsNameValue = storyWithArgs<Props<DataFrame, ChartOptions>>(Sample, {
    data: {
        loading: false,
        value: [
            { x: 'Alpha', y: 100 },
            { x: 'Beta', y: -50 },
            { x: 'Gamma', y: 20 },
            { x: 'Delta', y: 30 },
        ],
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
                    formatter: function (index, { dataFrame }) {
                        const xData = compactStringOrNumber(dataFrame[index].x);
                        const yData = compactStringOrNumber(dataFrame[index].y);
                        return [xData, yData];
                    },
                },
            },
        ],
        title: {
            text: 'Pie chart with title and sectors name with values',
        },
    },
});

export const PieTitleLegend = storyWithArgs<Props<DataFrame, ChartOptions>>(Sample, {
    data: {
        loading: false,
        value: [
            { x: 'Alpha', y: 100 },
            { x: 'Beta', y: -50 },
            { x: 'Gamma', y: 20 },
            { x: 'Delta', y: 30 },
        ],
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        ariaLabel: 'Pie chart with title and legend',
        series: [
            {
                type: 'pie',
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
});

export const PieTitleLegendValues = storyWithArgs<Props<DataFrame, ChartOptions>>(Sample, {
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
        ariaLabel: 'Pie chart with title and legend with values',
        series: [
            {
                type: 'pie',
                valueColumn: 'y',
                backgroundColor: ['#CB4335', '#1F618D', '#F1C40F', 'rgb(39,174,96)'],
            },
        ],
        legend: {
            display: true,
            position: 'right',
            labels: {
                formatter(index, { dataFrame }) {
                    const xData = compactStringOrNumber(dataFrame[index]['x']);
                    const yData = compactStringOrNumber(dataFrame[index]['y']);
                    return `${xData} - ${yData}`;
                },
            },
        },
        title: {
            text: 'Pie chart with title and legend with values',
        },
    },
});