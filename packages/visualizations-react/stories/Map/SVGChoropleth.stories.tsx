import React from 'react';
import { Meta } from '@storybook/react';
import { SvgChoropleth } from '../../src';
import { shapes } from './shapes';


const meta: Meta = {
    title: 'Map/SvgChoropleth',
    component: SvgChoropleth,
};

export default meta;
const Template = (args) => (
    <div
        style={{
            margin: 'auto',
            border: '1px solid black',
            padding: '13px',
            display: 'inline-block',
        }}
    >
        <SvgChoropleth {...args} style={{ height: '100px', width: '100px' }} />
    </div>
);

export const SvgChoroplethStory = Template.bind({});
SvgChoroplethStory.args = {
    options: {
        geoJson: shapes,
    },
    data: {
        value: [
            { x: 'France', y: 60 },
            { x: 'Île de France', y: 35 },
            { x: 'Corsica', y: 95 },
        ],
    },
};
