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
            { x: '03/01', y: 2, z: 3 },
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
                backgroundColor: {
                    type: 'roundrobin',
                    colors: ['rgba(255,50,50,.5)'],
                },
            },
            {
                type: 'line',
                valueColumn: 'z',
                label: 'line dataset',
                backgroundColor: {
                    type: 'roundrobin',
                    colors: ['rgba(55,250,50,.5)'],
                },
            },
        ],
        xAxis: {
            display: true,
            type: 'category',
            label: {
                display: true,
                value: 'Jour',
                align: 'start',
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
        ariaLabel: 'A line and bar chart, showing random data',
    },
};
