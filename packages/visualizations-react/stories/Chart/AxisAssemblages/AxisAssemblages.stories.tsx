import type { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { ChartSeriesType } from '@opendatasoft/visualizations';
import { Meta } from '@storybook/react';
import type { Props } from '../../../src';
import { COLORS } from '../../utils';
import ChartTemplate from '../ChartTemplate';

const meta: Meta = {
    title: 'Chart/AxisAssemblages',
};

export default meta;

export const AreaChartStacked = ChartTemplate.bind({});
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
AreaChartStacked.args = AreaChartStackedArgs;

export const AreaChartPercentage = ChartTemplate.bind({});
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
AreaChartPercentage.args = AreaChartPercentageArgs;

export const LineChartStacked = ChartTemplate.bind({});
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
LineChartStacked.args = LineChartStackedArgs;

export const LineChartPercentage = ChartTemplate.bind({});
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
LineChartPercentage.args = LineChartPercentageArgs;

export const BarChartStacked = ChartTemplate.bind({});
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
BarChartStacked.args = BarChartStackedArgs;

export const BarChartPercentage = ChartTemplate.bind({});
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
BarChartPercentage.args = BarChartPercentageArgs;

export const BarChartStackedGroups = ChartTemplate.bind({});
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
BarChartStackedGroups.args = BarChartStackedGroupsArgs;

export const ColumnChartStacked = ChartTemplate.bind({});
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
ColumnChartStacked.args = ColumnChartStackedArgs;

export const ColumnChartPercentage = ChartTemplate.bind({});
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
ColumnChartPercentage.args = ColumnChartPercentageArgs;


export const ColumnChartStackedGroups = ChartTemplate.bind({});
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
ColumnChartStackedGroups.args = ColumnChartStackedGroupsArgs;
function generateUniformDistribution(n:number, xRange = [0, 1], yRange = [0, 1]) {
    const points = [];
    for (let i = 0; i < n; i++) {
      points.push({
        x: xRange[0] + Math.random() * (xRange[1] - xRange[0]),
        y: yRange[0] + Math.random() * (yRange[1] - yRange[0])
      });
    }
    return points;
  }
  

export const ScatterplotChart = ChartTemplate.bind({});
const ScatterPlotChartArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: generateUniformDistribution(1000, [0, 10], [0, 10]),
    },
    options: {
        labelColumn: 'label',
        series: [
            {
                type: ChartSeriesType.Scatter,
                valueColumn:"x",
                indexAxis:"y",
                label:"Group 1",
                pointRadius: 5,
                hitRadius: 5,
                pointHoverRadius: 4,
                backgroundColor: 'rgba(255, 0, 0, .5)',
                dataLabels:{
                    display:false
                }
            },
        ],
        legend: {
            display: true,
        },
        axis: {
            x: {
                display: true,
            },
            y: {
                display: true,
            },
            assemblage: {
                stacked: false,
                percentaged: false,
            },
        },
        title: {
            text: 'test with gap',
        },
    },
};
ScatterplotChart.args = ScatterPlotChartArgs;

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
        x: randomNormal(xMean, xStdDev),
        y: randomNormal(yMean, yStdDev)
      });
    }
    return points;
  }

  
export const ScatterplotNormalDistribChart = ChartTemplate.bind({});
const ScatterplotNormalDistribChartArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: generateNormalDistribution(10000, 5, 2, 5, 2),
    },
    options: {
        labelColumn: 'label',
        series: [
            {
                type: ChartSeriesType.Scatter,
                valueColumn:"x",
                indexAxis:"y",
                label:"Group 1",
                pointRadius: .08,
                hitRadius: 5,
                pointHoverRadius: 4,
                pointBorderColor: "#00000000",
                backgroundColor: 'rgba(255, 0, 0)',
                dataLabels:{
                    display:false
                }
            },
        ],
        legend: {
            display: true,
        },
        axis: {
            x: {
                display: true,
            },
            y: {
                display: true,
            },
            assemblage: {
                stacked: false,
                percentaged: false,
            },
        },
        title: {
            text: 'test with gap',
        },
    },
};
ScatterplotNormalDistribChart.args = ScatterplotNormalDistribChartArgs;

function randomExponential(lambda :number) {
    return -Math.log(1.0 - Math.random()) / lambda;
  }
  
  function generateExponentialDistribution(n :number, lambda = 1, yRange = [0, 1]) {
    const points = [];
    for (let i = 0; i < n; i++) {
      points.push({
        x: randomExponential(lambda),
        y: yRange[0] + Math.random() * (yRange[1] - yRange[0])
      });
    }
    return points;
  }
  
  export const ScatterplotExponentialDistribChart = ChartTemplate.bind({});
const ScatterplotExponentialDistribChartArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: generateExponentialDistribution(1000, 10, [0, 10]),
    },
    options: {
        labelColumn: 'label',
        series: [
            {
                type: ChartSeriesType.Scatter,
                valueColumn:"x",
                indexAxis:"y",
                label:"Group 1",
                pointRadius: 5,
                hitRadius: 5,
                pointBorderColor: "#000000",
                pointHoverRadius: 4,
                backgroundColor: 'rgba(255, 0, 0, .5)',
                dataLabels:{
                    display:false
                }
            },
        ],
        legend: {
            display: true,
        },
        axis: {
            x: {
                display: true,
            },
            y: {
                display: true,
            },
            assemblage: {
                stacked: false,
                percentaged: false,
            },
        },
        title: {
            text: 'test with gap',
        },
    },
};
ScatterplotExponentialDistribChart.args = ScatterplotExponentialDistribChartArgs;
