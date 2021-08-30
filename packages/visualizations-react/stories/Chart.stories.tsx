import { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import type { Props } from '../src';
import { Chart } from '../src';
import { COLORS, style } from './utils';

const meta: Meta = {
    title: 'Chart',
    component: Chart,
    parameters: {
        controls: {
            expanded: true,
        },
    },
};

export default meta;

const Template = (args: Props<DataFrame, ChartOptions>) => <Chart {...args} />;

export const Loading: Story<Props<DataFrame, ChartOptions>> = Template.bind({});

Loading.args = {
    style,
    data: {
        loading: true,
    },
    options: {
        labelColumn: 'y',
        ariaLabel: 'should not be visible',
        series: [{ type: 'line', valueColumn: 'y' }],
    },
};

export const Default: Story<Props<DataFrame, ChartOptions>> = Template.bind({});

Default.args = {
    style,
    data: {
        loading: false,
        value: [
            { x: '01/01', y: 10, z: 1 },
            { x: '02/01', y: 5, z: 2 },
            { x: '03/01', y: 2, z: 2 },
            { x: '04/01', y: 3, z: 7 },
            { x: '05/01', y: 4, z: 8 },
            { x: '06/01', y: 5, z: 10 },
        ],
    },
    options: {
        labelColumn: 'x',
        series: [
            {
                type: 'line',
                valueColumn: 'z',
                label: 'line dataset',
                backgroundColor: COLORS.red,
                borderColor: COLORS.red,
                tension: 0.4,
                dataLabels: {
                    display: true,
                    backgroundColor: COLORS.red,
                    color: 'white',
                    borderRadius: 4,
                },
            },
            {
                type: 'bar',
                valueColumn: 'y',
                label: 'bar dataset',
                backgroundColor: COLORS.blue,
                dataLabels: {
                    display: true,
                    backgroundColor: COLORS.blue,
                    color: 'white',
                    borderRadius: 4,
                    align: 'end',
                    offset: 4,
                },
            },
        ],
        xAxis: {
            display: true,
            type: 'category',
            title: {
                display: true,
                text: 'Day',
                align: 'start',
            },
            gridLines: {
                display: false,
            },
        },
        yAxis: {
            display: true,
            title: {
                display: true,
                text: 'count(*)',
                align: 'center',
            },
        },
        legend: {
            display: true,
            position: 'top',
            align: 'center',
        },
        title: {
            display: true,
            text: 'A line at the bar',
            position: 'bottom',
        },
        tooltips: {
            display: true,
        },
        ariaLabel: 'A line and bar chart, showing random data',
    },
};

export const Line: Story<Props<DataFrame, ChartOptions>> = Template.bind({});

Line.args = {
    style,
    data: {
        loading: false,
        value: [
            { x: 0, y: 2400, z: 1 },
            { x: 1, y: 140, z: 2 },
            { x: 2, y: 2000, z: 3 },
            { x: 3, y: 3, z: 1 },
            { x: 4, y: 180.47, z: 1 },
            { x: 5, y: 778, z: 1 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Single line chart with tension and no grids',
        series: [
            {
                type: 'line',
                valueColumn: 'y',
                tension: 0.3,
                borderColor: COLORS.orange,
            },
        ],
        xAxis: {
            display: true,
            type: 'linear',
            title: {
                display: true,
                text: 'x',
                align: 'center',
            },
            gridLines: {
                display: false,
            },
        },
        yAxis: {
            display: true,
            title: {
                display: true,
                text: 'y',
                align: 'center',
            },
            gridLines: {
                display: false,
            },
        },
        title: {
            text: 'Single line chart with tension and no grids',
        },
    },
};

export const Area: Story<Props<DataFrame, ChartOptions>> = Template.bind({});

Area.args = {
    style,
    data: {
        loading: false,
        value: [
            { x: 0, y: 2400, z: 1000 },
            { x: 1, y: 140, z: 1000 },
            { x: 2, y: 2000, z: 1000 },
            { x: 3, y: 3, z: 1000 },
            { x: 4, y: 1200, z: 1000 },
            { x: 5, y: 778, z: 1000 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Area chart with fill mode green above 1000 and red below',
        series: [
            {
                type: 'line',
                valueColumn: 'y',
                borderColor: 'rgba(0,0,0,0)',
                tension: 0.4,
                fill: {
                    mode: 1,
                    above: COLORS.green,
                    below: COLORS.red,
                },
            },
            {
                type: 'line',
                valueColumn: 'z',
                borderColor: 'rgba(0,0,0,0)',
                backgroundColor: 'rgba(0,0,0,0)',
            },
        ],
        xAxis: {
            display: true,
            type: 'linear',
            title: {
                display: true,
                text: 'x',
                align: 'center',
            },
            gridLines: {
                display: false,
            },
        },
        yAxis: {
            display: true,
            title: {
                display: true,
                text: 'y',
                align: 'center',
            },
        },
        title: {
            text: 'Area chart with fill mode green above 1000 and red below',
        },
    },
};

export const Column: Story<Props<DataFrame, ChartOptions>> = Template.bind({});

Column.args = {
    style,
    data: {
        loading: false,
        value: [
            { x: 0, y: 100 },
            { x: 1, y: 50 },
            { x: 2, y: 20 },
            { x: 3, y: -30 },
            { x: 4, y: 40 },
            { x: 5, y: -50 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Column series chart',
        series: [
            {
                type: 'bar',
                valueColumn: 'y',
            },
        ],
        xAxis: {
            display: true,
            type: 'category',
            title: {
                display: true,
                text: 'x',
                align: 'center',
            },
            gridLines: {
                display: false,
            },
        },
        yAxis: {
            display: true,
            title: {
                display: true,
                text: 'y',
                align: 'center',
            },
        },
    },
};

export const Bar: Story<Props<DataFrame, ChartOptions>> = Template.bind({});

Bar.args = {
    style,
    data: {
        loading: false,
        value: [
            { x: '01/01', y: 100 },
            { x: '02/01', y: 50 },
            { x: '03/01', y: 20 },
            { x: '04/01', y: 30 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Horizontal Bar series chart',
        series: [
            {
                type: 'bar',
                valueColumn: 'y',
                indexAxis: 'y',
                backgroundColor: [
                    'rgba(250,50,50,0.5)',
                    'rgba(50,250,50,0.5)',
                    'rgba(50,50,250,0.5)',
                    'rgba(250,50,250,0.5)',
                ],
            },
        ],
        xAxis: {
            display: true,
            type: 'linear',
            title: {
                display: true,
                text: 'x',
                align: 'center',
            },
            gridLines: {
                display: false,
            },
        },
        yAxis: {
            display: true,
            type: 'category',
            title: {
                display: true,
                text: 'y',
                align: 'center',
            },
            gridLines: {
                display: false,
            },
        },
    },
};

export const Histogram: Story<Props<DataFrame, ChartOptions>> = Template.bind({});

Histogram.args = {
    style,
    data: {
        loading: false,
        value: [
            { x: 0, y: 100 },
            { x: 1, y: 50 },
            { x: 2, y: 20 },
            { x: 3, y: 30 },
            { x: 4, y: 40 },
            { x: 5, y: 50 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Histogram series chart',
        series: [
            {
                type: 'bar',
                valueColumn: 'y',
                barPercentage: 1,
                categoryPercentage: 1,
                backgroundColor: 'rgba(50,50,225,0.5)',
            },
        ],
        xAxis: {
            display: true,
            type: 'category',
            title: {
                display: true,
                text: 'x',
                align: 'center',
            },
        },
        yAxis: {
            display: true,
            title: {
                display: true,
                text: 'y',
                align: 'center',
            },
            gridLines: {
                display: false,
            },
        },
    },
};

export const Pie: Story<Props<DataFrame, ChartOptions>> = Template.bind({});

Pie.args = {
    style,
    data: {
        loading: false,
        value: [
            { x: 'A', y: 100 },
            { x: 'B', y: 50 },
            { x: 'C', y: 20 },
            { x: 'D', y: 30 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Pie chart',
        maintainAspectRatio: true,
        aspectRatio: 2,
        series: [
            {
                type: 'pie',
                valueColumn: 'y',
                backgroundColor: [
                    'rgba(250,50,50,0.5)',
                    'rgba(50,250,50,0.5)',
                    'rgba(50,50,250,0.5)',
                    'rgba(250,50,250,0.5)',
                ],
            },
        ],
        legend: {
            display: true,
        },
        tooltips: {
            display: true,
        },
    },
};

export const Radar: Story<Props<DataFrame, ChartOptions>> = Template.bind({});

Radar.args = {
    style,
    data: {
        loading: false,
        value: [
            { x: 'speed', y: 100, z: 10 },
            { x: 'strength', y: 50, z: 45 },
            { x: 'magic', y: 80, z: 100 },
            { x: 'luck', y: 30, z: 100 },
            { x: 'persuasion', y: 70, z: 2 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Radar chart',
        maintainAspectRatio: true,
        aspectRatio: 2,
        series: [
            {
                type: 'radar',
                valueColumn: 'y',
                label: 'User 1',
                backgroundColor: 'rgba(27,210,210,0.5)',
                borderColor: 'rgb(27,210,210)',
            },
            {
                type: 'radar',
                valueColumn: 'z',
                label: 'User 2',
                backgroundColor: 'rgba(127,10,210,0.5)',
                borderColor: 'rgb(127,10,210)',
            },
        ],
        legend: {
            display: true,
        },
        tooltips: {
            display: true,
        },
    },
};
