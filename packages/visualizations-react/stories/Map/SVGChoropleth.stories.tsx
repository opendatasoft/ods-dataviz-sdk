import React from 'react';
import { Meta } from '@storybook/react';
import { SvgChoropleth } from '../../src';
import { shapes } from './shapes';

const scales = {
    grey: undefined,
    blue: {
        type: 'gradient',
        colors: {
            start: '#bcf5f9',
            end: '#0229bf',
        }
    }
};

const meta: Meta = {
    title: 'Map/SvgChoropleth',
    component: SvgChoropleth,
};

export default meta;
const Template = ({ height, width, colorsScale, ...args }) => {
    const options = { colorsScale: scales[colorsScale], ...args.options };
    return (
        <div
            style={{
                margin: 'auto',
                border: '1px solid black',
                padding: '13px',
                display: 'inline-block',
                height,
                width,
            }}
        >
            <SvgChoropleth options={options} data={args.data} style={{height: '100%', width: '100%'}} />
        </div>
    )
};

export const SvgChoroplethStory = Template.bind({});
SvgChoroplethStory.argTypes = {
    colorsScale: {
        options: ['grey', 'blue'],
        control: { type: 'select' },
    },
}
SvgChoroplethStory.args = {
    height: '100px',
    width: '100px',
    colorsScale: null,
    options: { geoJson: shapes },
    data: {
        value: [
            { x: 'France', y: 60 },
            { x: 'Île de France', y: 35 },
            { x: 'Corsica', y: 95 },
        ],
    },
};
