import React from 'react';
import { Meta } from '@storybook/react';
import { SvgChoropleth } from '../../src';
import { shapes, multiPolygonShapes } from './shapes';

const meta: Meta = {
    title: 'Map/SVGChoropleth',
    component: SvgChoropleth,
};

export default meta;
const Template = (args) => (
    <div
        style={{
            width: '90%',
            minHeight: '100px',
            minWidth: '100px',
            margin: 'auto',
            border: '1px solid black',
        }}
    >
        <SvgChoropleth {...args} />
    </div>
);

export const SVGChoroplethStory = Template.bind({});
SVGChoroplethStory.args = {
    options: {
        shapes,
    },
};

export const SVGChoroplethMultipolygonStory = Template.bind({});
SVGChoroplethMultipolygonStory.args = {
    options: {
        shapes: multiPolygonShapes,
    },
};

