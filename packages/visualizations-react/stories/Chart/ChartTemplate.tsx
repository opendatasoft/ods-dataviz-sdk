import React from 'react';
import { ComponentStory } from '@storybook/react';
import { Chart } from 'src';

const ChartTemplate: ComponentStory<typeof Chart> = args => (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '60vw',
        }}
    >
        <Chart {...args} />
    </div>
);

export default ChartTemplate;
