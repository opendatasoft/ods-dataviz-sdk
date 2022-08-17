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
// SVGChoroplethStory.args = {};
//     data: {
//         loading: false,
//         value: [
//             { x: 'France', y: 60 },
//             { x: 'Île de France', y: 35 },
//             { x: 'Corsica', y: 95 },
//         ],
//     },
//     options: {
//         style: {},
//         parameters: {},
//         shapes,
//         aspectRatio: 1,
//     },
// };
// SVGChoropleth.args = StudioChoroplethArgs;
