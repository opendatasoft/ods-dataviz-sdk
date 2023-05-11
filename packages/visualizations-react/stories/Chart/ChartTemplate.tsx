import React from 'react';
import { ComponentStory } from '@storybook/react';
import { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { Chart, Props } from '../../src';

const ChartTemplate: ComponentStory<typeof Chart> = (
    args: Props<DataFrame, ChartOptions>
) => (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <Chart {...args} style={{ width: '60vw' }} />
    </div>
);

export default ChartTemplate;
