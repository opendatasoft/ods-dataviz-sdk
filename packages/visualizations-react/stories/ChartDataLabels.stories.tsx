import { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import type { Props } from '../src';
import { Chart } from '../src';
import { casual, COLORS, generateArrayOf, style } from './utils';

const meta: Meta = {
    title: 'Chart/DataLabels',
    component: Chart,
    parameters: {
        controls: {
            expanded: true,
        },
    },
};

export default meta;

const Template = (args: Props<DataFrame, ChartOptions>) => <Chart {...args} />;

export const Overlap: Story<Props<DataFrame, ChartOptions>> = Template.bind({});

Overlap.args = {
    style,
    data: {
        value: generateArrayOf(
            (index) => ({
                y: Math.pow(2, 24) + index * 1000, // Need big number, close to each other
                x: index,
            }),
            50
        ),
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Overlapping data labels',
        title: {
            text: 'Overlapping data labels',
        },
        series: [
            {
                type: 'bar',
                valueColumn: 'y',
                backgroundColor: COLORS.purple,
                dataLabels: {
                    display: 'auto',
                    color: 'white',
                    backgroundColor: COLORS.purple,
                },
            },
        ],
    },
};

export const OutOfBound: Story<Props<DataFrame, ChartOptions>> = Template.bind({});

OutOfBound.args = {
    style,
    data: {
        value: generateArrayOf(
            (index) => ({
                y: ((index % 3) - 1) * 999999, // Need alternating extreme number
                x: index,
            }),
            21
        ),
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Out of bounds data labels',
        title: {
            display: false,
        },
        series: [
            {
                type: 'line',
                valueColumn: 'y',
                backgroundColor: COLORS.blue,
                borderColor: COLORS.blue,
                dataLabels: {
                    display: true,
                    color: 'white',
                    backgroundColor: COLORS.blue,
                    borderRadius: 4,
                },
            },
        ],
        xAxis: {
            display: false,
        },
        yAxis: {
            display: false,
        },
        legend: {
            display: false,
        },
    },
};

export const OutOfBoundFixed: Story<Props<DataFrame, ChartOptions>> = Template.bind({});

OutOfBoundFixed.args = {
    style,
    data: {
        value: generateArrayOf(
            (index) => ({
                y: ((index % 3) - 1) * 999999, // Need alternating extreme number
                x: index,
            }),
            21
        ),
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Out of bounds data labels',
        padding: 40,
        title: {
            display: false,
        },
        series: [
            {
                type: 'line',
                valueColumn: 'y',
                backgroundColor: COLORS.blue,
                borderColor: COLORS.blue,
                dataLabels: {
                    display: true,
                    color: 'white',
                    backgroundColor: COLORS.blue,
                    borderRadius: 4,
                },
            },
        ],
        xAxis: {
            display: false,
        },
        yAxis: {
            display: false,
        },
        legend: {
            display: false,
        },
    },
};
