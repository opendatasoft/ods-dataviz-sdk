import React from 'react';
import { Meta } from '@storybook/react';
import { SvgChoropleth } from '../../src';
import { shapes } from './shapes';


const meta: Meta = {
    title: 'Map/SVGChoropleth',
    component: SvgChoropleth,
};

export default meta;
const Template = (args) => (
    <div
        style={{
            height: '100px',
            width: '100px',
            margin: 'auto',
            border: '1px solid black',
        }}
    >
        <SvgChoropleth {...args} style={{ height: '100px', width: '100px' }} />
    </div>
);

export const SvgChoroplethStory = Template.bind({});
SvgChoroplethStory.args = {
    options: {
        geoJson: shapes,
    }
}
