import { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { Props } from '../../../src';
import { styleForLayouts } from '../../utils';

export const PieTitleSectorsName: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
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
        ariaLabel: 'Pie chart with title and sectors name',
        padding: 16,
        series: [
            {
                type: 'pie',
                valueColumn: 'y',
                backgroundColor: [
                    '#CB4335',
                    '#1F618D',
                    '#F1C40F',
                    '#27AE60',
                ],
                dataLabels: {
                    display: true,
                    formatter: function (index, { dataFrame }) {
                        return `${dataFrame[index].x}`;
                    },
                },
            },
        ],
        tooltips: {
            display: true,
        },
        title: {
            text: 'Pie chart with title and sectors name',
            align: 'center',
        },
    },
};

export const PieTitleSectorsNameValue: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
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
        ariaLabel: 'Pie chart with title and sectors name with values',
        padding: 16,
        series: [
            {
                type: 'pie',
                valueColumn: 'y',
                backgroundColor: [
                    '#CB4335',
                    '#1F618D',
                    '#F1C40F',
                    '#27AE60',
                ],
                dataLabels: {
                    display: true,
                    formatter: function (index, { dataFrame }) {
                        return [`${dataFrame[index].x}`, `${dataFrame[index].y}`];
                    },
                },
            },
        ],
        tooltips: {
            display: true,
        },
        title: {
            text: 'Pie chart with title and sectors name with values',
            align: 'center',
            padding: {
                bottom: 36,
            },
        },
    },
};

export const PieTitleLegend: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
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
        ariaLabel: 'Pie chart with title and legend',
        padding: 16,
        series: [
            {
                type: 'pie',
                valueColumn: 'y',
                backgroundColor: [
                    '#CB4335',
                    '#1F618D',
                    '#F1C40F',
                    '#27AE60',
                ],
            },
        ],
        legend: {
            display: true,
            position: 'right',
        },
        tooltips: {
            display: true,
        },
        title: {
            text: 'Pie chart with title and legend',
            align: 'center',
        },
    },
};

export const PieTitleLegendValues: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 'Alpha - 100', y: 100 },
            { x: 'Beta - 50', y: 50 },
            { x: 'Gamma - 20', y: 20 },
            { x: 'Delta - 30', y: 30 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Pie chart with title and legend with values',
        padding: 16,
        series: [
            {
                type: 'pie',
                valueColumn: 'y',
                backgroundColor: [
                    '#CB4335',
                    '#1F618D',
                    '#F1C40F',
                    'rgb(39,174,96)',
                ],
            },
        ],
        legend: {
            display: true,
            position: 'right',
        },
        tooltips: {
            display: true,
        },
        title: {
            text: 'Pie chart with title and legend with values',
            align: 'center',
        },
    },
};
