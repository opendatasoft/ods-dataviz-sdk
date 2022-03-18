import React from 'react';
import { Meta } from '@storybook/react';
import { Choropleth, Props } from '../../src';
import { ChoroplethOptions, DataFrame } from '@opendatasoft/visualizations';
import { shapes } from './shapes';

const meta: Meta = {
    title: 'Map/Choropleth',
    component: Choropleth,
};

export default meta;
const Template = (args: Props<string, ChoroplethOptions>) => (
    <div
        style={{
            width: '60%',
            minHeight: '100px',
            minWidth: '100px',
            margin: 'auto',
            border: '1px solid black',
        }}
    >
        <Choropleth {...args} />
    </div>
);
export const StudioChoropleth = Template.bind({});
const StudioChoroplethArgs: Props<DataFrame, ChoroplethOptions> = {
    data: {
        loading: false,
        value: [
            { x: 'France', y: 35 },
            { x: 'Corsica', y: 95 },
        ],
    },
    options: {
        style: {},
        parameters: {},
        shapes,
        colorScale: '#222222',
        aspectRatio: 1,
    },
};
StudioChoropleth.args = StudioChoroplethArgs;
