import { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import type { Props } from '../src';
import { Chart } from '../src';

const meta: Meta = {
    title: 'Chart',
    component: Chart,
    parameters: {
        controls: {
            expanded: true,
        },
    },
    decorators: [
        (Story) => (
            <div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '90vh',
                    }}
                >
                    <Story />
                </div>
            </div>
        ),
    ],
};

export default meta;

const Template = (args: Props<DataFrame, ChartOptions>) => <Chart {...args} />;

export const Default: Story<Props<DataFrame, ChartOptions>> = Template.bind({});

Default.args = {
    style: {
        width: '50%',
    },
    data: {
        loading: false,
        value: [
            { x: '01/01', y: 10, z: 1 },
            { x: '02/01', y: 5, z: 2 },
            { x: '03/01', y: 2, z: 2 },
            { x: '04/01', y: 3, z: 1 },
            { x: '05/01', y: 4, z: 1 },
            { x: '06/01', y: 10, z: 1 },
        ],
    },
    options: {
        labelColumn: 'x',
        series: [
            {
                type: 'bar',
                valueColumn: 'y',
                label: 'bar dataset',
                backgroundColor: 'rgba(255,50,50,.5)',
            },
            {
                type: 'line',
                valueColumn: 'z',
                label: 'line dataset',
                backgroundColor: 'rgba(55,250,50,.5)',
            },
        ],
        xAxis: {
            display: true,
            type: 'category',
            label: {
                display: true,
                value: 'Day',
                align: 'start',
            },
            gridLines: {
                display: false,
            },
        },
        yAxis: {
            display: true,
            label: {
                display: true,
                value: 'count(*)',
                align: 'center',
            },
        },
        legend: {
            display: true,
            position: 'top',
            align: 'start',
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
    style: {
        width: '50%',
    },
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
        ariaLabel: 'Single line series chart',
        series: [
            {
                type: 'line',
                valueColumn: 'y',
            },
        ],
        xAxis: {
            display: true,
            type: 'linear',
            label: {
                display: true,
                value: 'x',
                align: 'center',
            },
            gridLines: {
                display: false,
            },
        },
        yAxis: {
            display: true,
            label: {
                display: true,
                value: 'y',
                align: 'center',
            },
        },
    },
};

export const Area: Story<Props<DataFrame, ChartOptions>> = Template.bind({});

Area.args = {
    style: {
        width: '50%',
    },
    data: {
        loading: false,
        value: [
            { x: 0, y: 2400, z: 1000 },
            { x: 1, y: 140, z: 1000 },
            { x: 2, y: 2000, z: 1000 },
            { x: 3, y: 3, z: 1000 },
            { x: 4, y: 180.47, z: 1000 },
            { x: 5, y: 778, z: 1000 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Area series chart',
        series: [
            {
                type: 'line',
                valueColumn: 'y',
                fill: {
                    mode: 1,
                    above: 'rgba(50,210,50,.5)',
                    below: 'rgba(250,50,50,.5)',
                },
            },
            {
                type: 'line',
                valueColumn: 'z',
                borderColor: 'rgb(0,0,0)',
            },
        ],
        xAxis: {
            display: true,
            type: 'linear',
            label: {
                display: true,
                value: 'x',
                align: 'center',
            },
            gridLines: {
                display: false,
            },
        },
        yAxis: {
            display: true,
            label: {
                display: true,
                value: 'y',
                align: 'center',
            },
        },
    },
};

export const Column: Story<Props<DataFrame, ChartOptions>> = Template.bind({});

Column.args = {
    style: {
        width: '50%',
    },
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
            label: {
                display: true,
                value: 'x',
                align: 'center',
            },
            gridLines: {
                display: false,
            },
        },
        yAxis: {
            display: true,
            label: {
                display: true,
                value: 'y',
                align: 'center',
            },
        },
    },
};

export const Bar: Story<Props<DataFrame, ChartOptions>> = Template.bind({});

Bar.args = {
    style: {
        width: '50%',
    },
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
            label: {
                display: true,
                value: 'x',
                align: 'center',
            },
            gridLines: {
                display: false,
            },
        },
        yAxis: {
            display: true,
            type: 'category',
            label: {
                display: true,
                value: 'y',
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
    style: {
        width: '50%',
    },
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
            label: {
                display: true,
                value: 'x',
                align: 'center',
            },
        },
        yAxis: {
            display: true,
            label: {
                display: true,
                value: 'y',
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
    style: {
        width: '50%',
    },
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
    style: {
        width: '50%',
    },
    data: {
        loading: false,
        value: [
            { x: 'A', y: 100 },
            { x: 'B', y: 50 },
            { x: 'C', y: 80 },
            { x: 'D', y: 30 },
            { x: 'E', y: 70 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Radar chart',
        series: [
            {
                type: 'radar',
                valueColumn: 'y',
                label: 'Radar',
                backgroundColor: 'rgba(27,210,210,0.5)',
                borderColor: 'rgb(27,210,210)',
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
