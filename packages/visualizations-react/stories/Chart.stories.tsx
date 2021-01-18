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

const Template = (args) => <Chart {...args} />;

export const Default: Story<Props<DataFrame, ChartOptions>> = Template.bind({});

Default.args = {
    style: {
        width: '50%',
    },
    data: {
        loading: false,
        value: [
            { x: '01/01', y: 10 },
            { x: '02/01', y: 5 },
            { x: '03/01', y: 2 },
            { x: '04/01', y: 3 },
            { x: '05/01', y: 4 },
            { x: '06/01', y: 10 },
        ],
    },
    options: {
        type: 'radar',
        xAxis: 'x',
        yAxis: 'y',
        label: 'My dataset',
        colorConfiguration: {
            type: 'roundrobin',
            colors: [
                'rgba(254,14,23,0.5)',
                'rgba(54,174,23,0.5)',
                'rgba(200,74,223,0.5)',
                'rgba(255,255,23,0.5)',
                'rgba(54,74,223,0.5)',
            ],
        },
    },
};
