import React from 'react';
import { Meta } from '@storybook/react';
import { Choropleth, Props } from '../../src';
import { ChoroplethOptions, DataFrame } from '@opendatasoft/visualizations';
import { shapes } from './shapes';

const meta: Meta = {
    title: 'Map/Non Interactive Choropleth',
    component: Choropleth,
};

export default meta;
const Template = (args: Props<DataFrame, ChoroplethOptions>) => (
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
        shapes,
        aspectRatio: 1,
        activeShapes: ['France'],
        interactive: false,
    },
};
NonInteractiveChoropleth.args = NonInteractiveChoroplethArgs;
