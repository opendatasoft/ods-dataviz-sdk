import React from 'react';
import { ComponentStory } from '@storybook/react';
import { Chart } from 'src';

const ChartTemplate: ComponentStory<typeof Chart> = args => (
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
