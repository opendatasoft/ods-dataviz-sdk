import { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { Meta } from '@storybook/react';
import type { Props } from '../../../src';
import { COLORS } from '../../utils';
import { ChartTemplate } from '../Chart.stories';

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
        ariaLabel: 'Years',
        series: [
            {
                type: 'line',
                valueColumn: 'series_001',
                backgroundColor: COLORS.green,
                fill: { mode: 'origin' },
            },
            {
                type: 'line',
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
        ariaLabel: 'Years',
        series: [
            {
                type: 'line',
                valueColumn: 'series_001',
                backgroundColor: COLORS.green,
                fill: { mode: 'origin' },
            },
            {
                type: 'line',
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
        ariaLabel: 'Years',
        series: [
            {
                type: 'line',
                valueColumn: 'series_001',
                borderColor: COLORS.purple,
                backgroundColor: COLORS.red,
                spanGaps: 1000 * 60 * 60 * 24 * 366, // 1 year
            },
            {
                type: 'line',
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
        ariaLabel: 'Years',
        series: [
            {
                type: 'line',
                valueColumn: 'series_001',
                borderColor: COLORS.purple,
                backgroundColor: COLORS.red,
                spanGaps: 1000 * 60 * 60 * 24 * 366, // 1 year
            },
            {
                type: 'line',
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
        ariaLabel: 'Test',
        title: {
            text: 'Bar Chart - Stacked',
        },
        series: [
            {
                type: 'bar',
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
                type: 'bar',
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
        ariaLabel: 'Test',
        title: {
            text: 'Bar Chart - Percentage',
        },
        series: [
            {
                type: 'bar',
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
                type: 'bar',
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
        ariaLabel: 'Test',
        title: {
            text: 'Column Chart - Stacked',
        },
        series: [
            {
                type: 'bar',
                valueColumn: 'series_001',
                borderColor: 'rgba(255, 0, 0, 1)',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                dataLabels: {
                    display: false,
                    color: 'rgba(255, 0, 0, 1)',
                },
            },
            {
                type: 'bar',
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
        ariaLabel: 'Test',
        title: {
            text: 'Column Chart - Percentage',
        },
        series: [
            {
                type: 'bar',
                valueColumn: 'series_001',
                borderColor: 'rgba(255, 0, 0, 1)',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                dataLabels: {
                    display: false,
                    color: 'rgba(255, 0, 0, 1)',
                },
            },
            {
                type: 'bar',
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
