import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ChoroplethOptions, DataFrame } from '@opendatasoft/visualizations';
import { Choropleth, Props } from '../../src';
import { shapes } from './shapes';

const meta: ComponentMeta<typeof Choropleth> = {
    title: 'Map/Non Interactive Choropleth',
    component: Choropleth,
};

export default meta;
const Template: ComponentStory<typeof Choropleth> = (args: Props<DataFrame, ChoroplethOptions>) => (
    <div
        style={{
            width: '50%',
            minHeight: '100px',
            minWidth: '100px',
            margin: 'auto',
            border: '1px solid black',
        }}
    >
        <Choropleth {...args} />
    </div>
);

export const NonInteractiveChoropleth = Template.bind({});
const NonInteractiveChoroplethArgs: Props<DataFrame, ChoroplethOptions> = {
    data: {
        loading: false,
        value: [
            { x: 'France', y: 60 },
            { x: 'Île de France', y: 35 },
            { x: 'Corsica', y: 95 },
        ],
    },
    options: {
        style: {},
        parameters: {},
        shapes,
        aspectRatio: 1,
        activeShapes: ['France'],
        interactive: false,
    },
};
NonInteractiveChoropleth.args = NonInteractiveChoroplethArgs;
