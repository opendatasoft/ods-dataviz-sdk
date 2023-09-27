import type { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { ChartSeriesType } from '@opendatasoft/visualizations';
import { Meta } from '@storybook/react';
import type { Props } from '../../../src';
import ChartTemplate from '../ChartTemplate';

const meta: Meta = {
    title: 'Chart/Treemap',
};

export default meta;

export const TreemapChart = ChartTemplate.bind({});
const DATA = [
    { category: 'a very very very very very very very very very very very very very very very long text', color: '#F1C40F', count: 100 },
    { category: 'first category', color: '#27AE60', count: 50 },
    { category: 'second category', color: '#1F618D', count: 20 },
    { category: 'third category', color: '#CB4335', count: 20 },
    { category: 'fourth category', color: '#27AE60', count: 10 },
    { category: 'fifth category', color: '#1F618D', count: 10 },
];
const TreemapChartArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: DATA,
    },
    options: {
        aspectRatio: 2,
        series: [
            {
                type: ChartSeriesType.Treemap,
                keyColumn: 'count',
                keyGroups: ['category'],
                borderColor: 'white',
                colorFormatter: (index: number) => DATA[index].color,
                labels: {
                    align: 'center',
                    display: true,
                    maxLength: 10,
                    labelsFormatter: (index: number ) => [DATA[index].category],
                    color: ['white'],
                    font: [{ size: 20 }],
                    hoverColor: ['white', 'whiteSmoke'],
                    hoverFont: [{ size: 21, weight: 'bold' }],
                    position: 'middle',
                    overflow: 'fit',
                }
            },
        ],
    },
};
TreemapChart.args = TreemapChartArgs;