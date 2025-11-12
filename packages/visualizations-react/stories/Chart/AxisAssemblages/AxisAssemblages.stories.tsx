import React from 'react';
import type { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { ChartSeriesType } from '@opendatasoft/visualizations';
import { Meta, StoryObj } from '@storybook/react';
import type { Props } from 'reactify';
import { COLORS } from '../../utils';
import ChartTemplate from '../ChartTemplate';

const meta: Meta = {
    component: ChartTemplate,
    title: 'Chart/AxisAssemblages',
};

export default meta;

const AreaChartStackedArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: [
            { x: '2001', series_001: 0, series_002: 0 },
            { x: '2002', series_001: 1, series_002: 1.6 },
            { x: '2003', series_001: 2, series_002: 2.4 },
            { x: '2004', series_001: 3, series_002: 3.9 },
            { x: '2005', series_001: 4, series_002: 4.1 },
            { x: '2006', series_001: 5, series_002: 5.5 },
            { x: '2007', series_001: 6, series_002: 6.2 },
            { x: '2008', series_001: 7, series_002: 7.8 },
            { x: '2009', series_001: 8, series_002: 8.7 },
            { x: '2010', series_001: 9, series_002: 9.3 },
        ],
    },
    options: {
        labelColumn: 'x',
        series: [
            {
                type: ChartSeriesType.Line,
                valueColumn: 'series_001',
                backgroundColor: COLORS.green,
                fill: { mode: 'origin' },
            },
            {
                type: ChartSeriesType.Line,
                valueColumn: 'series_002',
                backgroundColor: COLORS.yellow,
                fill: { mode: 'origin' },
            },
        ],
        axis: {
            x: {
                display: true,
                type: 'time',
                timeUnit: 'year',
            },
            y: {
                display: true,
            },
            assemblage: {
                stacked: true,
                percentaged: false,
            },
        },
        title: {
            text: 'Years',
        },
    },
};
export const AreaChartStacked: StoryObj<typeof ChartTemplate> = {
    args: AreaChartStackedArgs,
    render: args => <ChartTemplate {...args} />,
};

const AreaChartPercentageArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: [
            { x: '2001', series_001: 0, series_002: 0 },
            { x: '2002', series_001: 1, series_002: 1.6 },
            { x: '2003', series_001: 2, series_002: 2.4 },
            { x: '2004', series_001: 3, series_002: 3.9 },
            { x: '2005', series_001: 4, series_002: 4.1 },
            { x: '2006', series_001: 5, series_002: 5.5 },
            { x: '2007', series_001: 6, series_002: 6.2 },
            { x: '2008', series_001: 7, series_002: 7.8 },
            { x: '2009', series_001: 8, series_002: 8.7 },
            { x: '2010', series_001: 9, series_002: 9.3 },
        ],
    },
    options: {
        labelColumn: 'x',
        series: [
            {
                type: ChartSeriesType.Line,
                valueColumn: 'series_001',
                backgroundColor: COLORS.green,
                fill: { mode: 'origin' },
            },
            {
                type: ChartSeriesType.Line,
                valueColumn: 'series_002',
                backgroundColor: COLORS.yellow,
                fill: { mode: 'origin' },
            },
        ],
        axis: {
            x: {
                display: true,
                type: 'time',
                timeUnit: 'year',
            },
            y: {
                display: true,
            },
            assemblage: {
                stacked: true,
                percentaged: true,
            },
        },
        title: {
            text: 'Years',
        },
    },
};
export const AreaChartPercentage: StoryObj<typeof ChartTemplate> = {
    args: AreaChartPercentageArgs,
    render: args => <ChartTemplate {...args} />,
};

const LineChartStackedArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: [
            { x: '2001', series_001: 0, series_002: 0 },
            { x: '2002', series_001: 1, series_002: 1.6 },
            { x: '2003', series_001: 2, series_002: 2.4 },
            { x: '2004', series_001: 3, series_002: 3.9 },
            { x: '2005', series_001: 4, series_002: 4.1 },
            { x: '2006', series_001: 5, series_002: 5.5 },
            { x: '2007', series_001: 6, series_002: 6.2 },
            { x: '2008', series_001: 7, series_002: 7.8 },
            { x: '2009', series_001: 8, series_002: 8.7 },
            { x: '2010', series_001: 9, series_002: 9.3 },
        ],
    },
    options: {
        labelColumn: 'x',
        series: [
            {
                type: ChartSeriesType.Line,
                valueColumn: 'series_001',
                borderColor: COLORS.purple,
                backgroundColor: COLORS.red,
                spanGaps: 1000 * 60 * 60 * 24 * 366, // 1 year
            },
            {
                type: ChartSeriesType.Line,
                valueColumn: 'series_002',
                borderColor: COLORS.orange,
                backgroundColor: COLORS.blue,
                spanGaps: 1000 * 60 * 60 * 24 * 366, // 1 year
            },
        ],
        axis: {
            x: {
                display: true,
                type: 'time',
                timeUnit: 'year',
            },
            y: {
                display: true,
            },
            assemblage: {
                stacked: true,
                percentaged: false,
            },
        },
        title: {
            text: 'Years with gap',
        },
    },
};
export const LineChartStacked: StoryObj<typeof ChartTemplate> = {
    args: LineChartStackedArgs,
    render: args => <ChartTemplate {...args} />,
};

const LineChartPercentageArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: [
            { x: '2001', series_001: 0, series_002: 0 },
            { x: '2002', series_001: 1, series_002: 1.6 },
            { x: '2003', series_001: 2, series_002: 2.4 },
            { x: '2004', series_001: 3, series_002: 3.9 },
            { x: '2005', series_001: 4, series_002: 4.1 },
            { x: '2006', series_001: 5, series_002: 5.5 },
            { x: '2007', series_001: 6, series_002: 6.2 },
            { x: '2008', series_001: 7, series_002: 7.8 },
            { x: '2009', series_001: 8, series_002: 8.7 },
            { x: '2010', series_001: 9, series_002: 9.3 },
        ],
    },
    options: {
        labelColumn: 'x',
        series: [
            {
                type: ChartSeriesType.Line,
                valueColumn: 'series_001',
                borderColor: COLORS.purple,
                backgroundColor: COLORS.red,
                spanGaps: 1000 * 60 * 60 * 24 * 366, // 1 year
            },
            {
                type: ChartSeriesType.Line,
                valueColumn: 'series_002',
                borderColor: COLORS.orange,
                backgroundColor: COLORS.blue,
                spanGaps: 1000 * 60 * 60 * 24 * 366, // 1 year
            },
        ],
        axis: {
            x: {
                display: true,
                type: 'time',
                timeUnit: 'year',
            },
            y: {
                display: true,
            },
            assemblage: {
                stacked: true,
                percentaged: true,
            },
        },
        title: {
            text: 'Years with gap',
        },
    },
};
export const LineChartPercentage: StoryObj<typeof ChartTemplate> = {
    args: LineChartPercentageArgs,
    render: args => <ChartTemplate {...args} />,
};

const BarChartStackedArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: [
            { series_001: null, series_002: 20, x: 'Acer' },
            { series_001: 22, series_002: 28, x: 'Aesculus' },
            { series_001: 18, series_002: 18, x: 'Alnus' },
            { series_001: 11, series_002: 11, x: 'Araucaria' },
            { series_001: 20, series_002: 20, x: 'Betula' },
            { series_001: 21, series_002: 21, x: 'Calocedrus' },
            { series_001: 10, series_002: 9, x: 'Catalpa' },
            { series_001: 21, series_002: 19.375, x: 'Cedrus' },
            { series_001: 18, series_002: 15, x: 'Celtis' },
        ],
    },
    options: {
        labelColumn: 'x',
        title: {
            text: 'Bar Chart - Stacked',
        },
        series: [
            {
                type: ChartSeriesType.Bar,
                valueColumn: 'series_001',
                indexAxis: 'y',
                borderColor: 'rgba(255, 0, 0, 1)',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                dataLabels: {
                    display: false,
                    color: 'rgba(255, 0, 0, 1)',
                },
            },
            {
                type: ChartSeriesType.Bar,
                valueColumn: 'series_002',
                indexAxis: 'y',
                borderColor: 'rgba(38, 56, 145, 1)',
                backgroundColor: 'rgba(38, 56, 145, 0.5)',
                dataLabels: {
                    display: false,
                    color: 'rgba(38, 56, 145, 1)',
                },
            },
        ],
        axis: {
            x: {
                display: true,
                type: 'linear',
                gridLines: {
                    display: true,
                },
                ticks: {
                    display: true,
                },
            },
            y: {
                display: true,
                gridLines: {
                    display: false,
                },
                type: 'category',
            },
            assemblage: {
                stacked: true,
                percentaged: false,
            },
        },
    },
};
export const BarChartStacked: StoryObj<typeof ChartTemplate> = {
    args: BarChartStackedArgs,
    render: args => <ChartTemplate {...args} />,
};

const BarChartPercentageArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: [
            { series_001: null, series_002: 20, x: 'Acer' },
            { series_001: 22, series_002: 28, x: 'Aesculus' },
            { series_001: 18, series_002: 18, x: 'Alnus' },
            { series_001: 11, series_002: 11, x: 'Araucaria' },
            { series_001: 20, series_002: 20, x: 'Betula' },
            { series_001: 21, series_002: 21, x: 'Calocedrus' },
            { series_001: 10, series_002: 9, x: 'Catalpa' },
            { series_001: 21, series_002: 19.375, x: 'Cedrus' },
            { series_001: 18, series_002: 15, x: 'Celtis' },
        ],
    },
    options: {
        labelColumn: 'x',
        title: {
            text: 'Bar Chart - Percentage',
        },
        series: [
            {
                type: ChartSeriesType.Bar,
                valueColumn: 'series_001',
                indexAxis: 'y',
                borderColor: 'rgba(255, 0, 0, 1)',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                dataLabels: {
                    display: false,
                    color: 'rgba(255, 0, 0, 1)',
                },
            },
            {
                type: ChartSeriesType.Bar,
                valueColumn: 'series_002',
                indexAxis: 'y',
                borderColor: 'rgba(38, 56, 145, 1)',
                backgroundColor: 'rgba(38, 56, 145, 0.5)',
                dataLabels: {
                    display: false,
                    color: 'rgba(38, 56, 145, 1)',
                },
            },
        ],
        axis: {
            x: {
                display: true,
                type: 'linear',
                gridLines: {
                    display: true,
                },
                ticks: {
                    display: true,
                },
            },
            y: {
                display: true,
                gridLines: {
                    display: false,
                },
                type: 'category',
            },
            assemblage: {
                stacked: true,
                percentaged: true,
            },
        },
    },
};
export const BarChartPercentage: StoryObj<typeof ChartTemplate> = {
    args: BarChartPercentageArgs,
    render: args => <ChartTemplate {...args} />,
};

const BarChartStackedGroupsArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: [
            { series_001: null, series_002: 20, series_003: 50, series_004: 11, x: 'Acer' },
            { series_001: 22, series_002: 28, series_003: 27, series_004: 67, x: 'Aesculus' },
            { series_001: 18, series_002: 18, series_003: 11, series_004: 10, x: 'Alnus' },
            { series_001: 11, series_002: 11, series_003: 33, series_004: 21, x: 'Araucaria' },
            { series_001: 20, series_002: 20, series_003: 9, series_004: 22, x: 'Betula' },
            { series_001: 21, series_002: 21, series_003: 21, series_004: 18.14, x: 'Calocedrus' },
            { series_001: 10, series_002: 9, series_003: 22, series_004: 10, x: 'Catalpa' },
            { series_001: 21, series_002: 19.375, series_003: 15, series_004: 12, x: 'Cedrus' },
            { series_001: 18, series_002: 15, series_003: 20, series_004: 27, x: 'Celtis' },
        ],
    },
    options: {
        labelColumn: 'x',
        title: {
            text: 'Bar Chart - Stacked Groups',
        },
        series: [
            {
                type: ChartSeriesType.Bar,
                valueColumn: 'series_001',
                indexAxis: 'y',
                stack: 'stack_0',
                borderColor: 'rgba(255, 0, 0, 1)',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                dataLabels: {
                    display: false,
                    color: 'rgba(255, 0, 0, 1)',
                },
            },
            {
                type: ChartSeriesType.Bar,
                valueColumn: 'series_002',
                indexAxis: 'y',
                stack: 'stack_0',
                borderColor: 'rgba(38, 56, 145, 1)',
                backgroundColor: 'rgba(38, 56, 145, 0.5)',
                dataLabels: {
                    display: false,
                    color: 'rgba(38, 56, 145, 1)',
                },
            },
            {
                type: ChartSeriesType.Bar,
                valueColumn: 'series_003',
                indexAxis: 'y',
                stack: 'stack_1',
                borderColor: 'rgba(218, 30, 127, 0.8)',
                backgroundColor: 'rgba(218, 30, 127, 0.8)',
                dataLabels: {
                    display: false,
                    color: 'rgba(218, 30, 127, 0.8)',
                },
            },
            {
                type: ChartSeriesType.Bar,
                valueColumn: 'series_004',
                indexAxis: 'y',
                stack: 'stack_1',
                borderColor: 'rgba(30, 218, 147, 0.8)',
                backgroundColor: 'rgba(30, 218, 147, 0.8)',
                dataLabels: {
                    display: false,
                    color: 'rgba(30, 218, 147, 0.8)',
                },
            },
        ],
        axis: {
            x: {
                display: true,
                type: 'linear',
                gridLines: {
                    display: true,
                },
                ticks: {
                    display: true,
                },
            },
            y: {
                display: true,
                gridLines: {
                    display: false,
                },
                type: 'category',
            },
            assemblage: {
                stacked: true,
                percentaged: false,
            },
        },
    },
};
export const BarChartStackedGroups: StoryObj<typeof ChartTemplate> = {
    args: BarChartStackedGroupsArgs,
    render: args => <ChartTemplate {...args} />,
};

const ColumnChartStackedArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: [
            { series_001: 17, series_002: 20, x: 'Acer' },
            { series_001: 22, series_002: 28, x: 'Aesculus' },
            { series_001: 18, series_002: 18, x: 'Alnus' },
            { series_001: 11, series_002: 11, x: 'Araucaria' },
            { series_001: 20, series_002: 20, x: 'Betula' },
            { series_001: 21, series_002: 21, x: 'Calocedrus' },
            { series_001: 10, series_002: 9, x: 'Catalpa' },
            { series_001: 21, series_002: 19.375, x: 'Cedrus' },
            { series_001: 18, series_002: 15, x: 'Celtis' },
        ],
    },
    options: {
        labelColumn: 'x',
        title: {
            text: 'Column Chart - Stacked',
        },
        series: [
            {
                type: ChartSeriesType.Bar,
                valueColumn: 'series_001',
                borderColor: 'rgba(255, 0, 0, 1)',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                dataLabels: {
                    display: false,
                    color: 'rgba(255, 0, 0, 1)',
                },
            },
            {
                type: ChartSeriesType.Bar,
                valueColumn: 'series_002',
                borderColor: 'rgba(38, 56, 145, 1)',
                backgroundColor: 'rgba(38, 56, 145, 0.5)',
                dataLabels: {
                    display: false,
                    color: 'rgba(38, 56, 145, 1)',
                },
            },
        ],
        axis: {
            x: {
                display: true,
                offset: true,
                gridLines: {
                    display: false,
                },
                type: 'category',
            },
            y: {
                display: true,
                type: 'linear',
                gridLines: {
                    display: true,
                },
                ticks: {
                    display: true,
                },
            },
            assemblage: {
                stacked: true,
                percentaged: false,
            },
        },
    },
};
export const ColumnChartStacked: StoryObj<typeof ChartTemplate> = {
    args: ColumnChartStackedArgs,
    render: args => <ChartTemplate {...args} />,
};

const ColumnChartPercentageArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: [
            { series_001: 17, series_002: 20, x: 'Acer' },
            { series_001: 22, series_002: 28, x: 'Aesculus' },
            { series_001: 18, series_002: 18, x: 'Alnus' },
            { series_001: 11, series_002: 11, x: 'Araucaria' },
            { series_001: 20, series_002: 20, x: 'Betula' },
            { series_001: 21, series_002: 21, x: 'Calocedrus' },
            { series_001: 10, series_002: 9, x: 'Catalpa' },
            { series_001: 21, series_002: 19.375, x: 'Cedrus' },
            { series_001: 18, series_002: 15, x: 'Celtis' },
        ],
    },
    options: {
        labelColumn: 'x',
        title: {
            text: 'Column Chart - Percentage',
        },
        series: [
            {
                type: ChartSeriesType.Bar,
                valueColumn: 'series_001',
                borderColor: 'rgba(255, 0, 0, 1)',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                dataLabels: {
                    display: false,
                    color: 'rgba(255, 0, 0, 1)',
                },
            },
            {
                type: ChartSeriesType.Bar,
                valueColumn: 'series_002',
                borderColor: 'rgba(38, 56, 145, 1)',
                backgroundColor: 'rgba(38, 56, 145, 0.5)',
                dataLabels: {
                    display: false,
                    color: 'rgba(38, 56, 145, 1)',
                },
            },
        ],
        axis: {
            x: {
                display: true,
                offset: true,
                gridLines: {
                    display: false,
                },
                type: 'category',
            },
            y: {
                display: true,
                type: 'linear',
                gridLines: {
                    display: true,
                },
                ticks: {
                    display: true,
                },
            },
            assemblage: {
                stacked: true,
                percentaged: true,
            },
        },
    },
};
export const ColumnChartPercentage: StoryObj<typeof ChartTemplate> = {
    args: ColumnChartPercentageArgs,
    render: args => <ChartTemplate {...args} />,
};

const ColumnChartStackedGroupsArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: [
            { series_001: null, series_002: 20, series_003: 50, series_004: 11, x: 'Acer' },
            { series_001: 22, series_002: 28, series_003: 27, series_004: 67, x: 'Aesculus' },
            { series_001: 18, series_002: 18, series_003: 11, series_004: 10, x: 'Alnus' },
            { series_001: 11, series_002: 11, series_003: 33, series_004: 21, x: 'Araucaria' },
            { series_001: 20, series_002: 20, series_003: 9, series_004: 22, x: 'Betula' },
            { series_001: 21, series_002: 21, series_003: 21, series_004: 18.14, x: 'Calocedrus' },
            { series_001: 10, series_002: 9, series_003: 22, series_004: 10, x: 'Catalpa' },
            { series_001: 21, series_002: 19.375, series_003: 15, series_004: 12, x: 'Cedrus' },
            { series_001: 18, series_002: 15, series_003: 20, series_004: 27, x: 'Celtis' },
        ],
    },
    options: {
        labelColumn: 'x',
        title: {
            text: 'Column Chart - Stacked Groups',
        },
        series: [
            {
                type: ChartSeriesType.Bar,
                valueColumn: 'series_001',
                borderColor: 'rgba(255, 0, 0, 1)',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                dataLabels: {
                    display: false,
                    color: 'rgba(255, 0, 0, 1)',
                },
                stack: 'stack_0',
            },
            {
                type: ChartSeriesType.Bar,
                valueColumn: 'series_002',
                borderColor: 'rgba(38, 56, 145, 1)',
                backgroundColor: 'rgba(38, 56, 145, 0.5)',
                dataLabels: {
                    display: false,
                    color: 'rgba(38, 56, 145, 1)',
                },
                stack: 'stack_0',
            },
            {
                type: ChartSeriesType.Bar,
                valueColumn: 'series_003',
                stack: 'stack_1',
                borderColor: 'rgba(218, 30, 127, 0.8)',
                backgroundColor: 'rgba(218, 30, 127, 0.8)',
                dataLabels: {
                    display: false,
                    color: 'rgba(218, 30, 127, 0.8)',
                },
            },
            {
                type: ChartSeriesType.Bar,
                valueColumn: 'series_004',
                stack: 'stack_1',
                borderColor: 'rgba(30, 218, 147, 0.8)',
                backgroundColor: 'rgba(30, 218, 147, 0.8)',
                dataLabels: {
                    display: false,
                    color: 'rgba(30, 218, 147, 0.8)',
                },
            },
        ],
        axis: {
            x: {
                display: true,
                offset: true,
                gridLines: {
                    display: false,
                },
                type: 'category',
            },
            y: {
                display: true,
                type: 'linear',
                gridLines: {
                    display: true,
                },
                ticks: {
                    display: true,
                },
            },
            assemblage: {
                stacked: true,
                percentaged: false,
            },
        },
    },
};
export const ColumnChartStackedGroups: StoryObj<typeof ChartTemplate> = {
    args: ColumnChartStackedGroupsArgs,
    render: args => <ChartTemplate {...args} />,
};

const ScatterPlotChartArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: [
            { label: 'id-0', x: -10, y: 20 },
            { label: 'id-1', x: 20, y: -10 },
            { label: 'id-2', x: 5, y: 2 },
            { label: 'id-3', x: 7, y: 3 },
        ],
    },
    options: {
        labelColumn: 'label',
        series: [
            {
                type: ChartSeriesType.Scatter,
                label: 'Serie 1',
                valueColumn: 'x',
                indexAxis: 'y',
                backgroundColor: COLORS.blue,
            },
        ],
        axis: {
            x: {
                display: true,
                type: 'linear',
                title: {
                    display: true,
                    text: 'Horizontal axis',
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Vertical axis',
                },
                type: 'linear',
            },
        },
        title: {
            text: 'Scatterplot Chart',
        },
    },
};
export const ScatterplotChart: StoryObj<typeof ChartTemplate> = {
    args: ScatterPlotChartArgs,
    render: args => <ChartTemplate {...args} />,
};

function randomNormal(mean = 0, stdDev = 1) {
    let u1 = 0;
    let u2 = 0;
    while (u1 === 0) u1 = Math.random();
    while (u2 === 0) u2 = Math.random();
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    return z0 * stdDev + mean;
}

function generateNormalDistribution(n: number, xMean = 0, xStdDev = 1, yMean = 0, yStdDev = 1) {
    const points = [];
    for (let i = 0; i < n; i++) {
        points.push({
            label: `id-${i}`,
            x: randomNormal(xMean, xStdDev),
            y: randomNormal(yMean, yStdDev),
        });
    }
    return points;
}

const ScatterplotNormalDistribChartArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: generateNormalDistribution(1000, 5, 2, 5, 2),
    },
    options: {
        labelColumn: 'label',
        series: [
            {
                label: 'Serie 1',
                type: ChartSeriesType.Scatter,
                valueColumn: 'y',
                indexAxis: 'x',
                backgroundColor: COLORS.blue,
            },
        ],
        axis: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Horizontal axis',
                },
                beginAtZero: true,
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Vertical axis',
                },
                beginAtZero: true,
            },
        },
        title: {
            text: 'Scatterplot Chart - Normal distribution',
        },
    },
};
export const ScatterplotNormalDistribChart = {
    args: ScatterplotNormalDistribChartArgs,
    parameters: { chromatic: { disableSnapshot: true } },
};
