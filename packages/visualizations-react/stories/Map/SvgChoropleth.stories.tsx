import React from 'react';
import { Meta } from '@storybook/react';
import { SvgChoropleth } from '../../src';
import { shapes } from './shapes';

const scales = {
    none: undefined,
    blue: {
        type: 'gradient',
        colors: {
            start: '#bcf5f9',
            end: '#0229bf',
        },
    },
};

// I know data is plural already!
const dataSets = {
    1: {
        value: [
            { x: 'France', y: 60 },
            { x: 'Île de France', y: 35 },
            { x: 'Corsica', y: 95 },
        ],
    },
    2: {
        value: [
            { x: 'France', y: 20 },
            { x: 'Île de France', y: 75 },
            { x: 'Corsica', y: 30 },
        ],
    },
};

const meta: Meta = {
    title: 'Map/SvgChoropleth',
    component: SvgChoropleth,
};

export default meta;
const Template = ({ height, width, colorsScale, dataSet, options }) => {
    const optionsWithScale = { colorsScale: scales[colorsScale], ...options };
    console.log(dataSet, dataSets[dataSet]);
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
            <SvgChoropleth
                options={optionsWithScale}
                data={dataSets[dataSet]}
                style={{ height: '100%', width: '100%' }} // necessary to remove the wrapper div
            />
        </div>
    );
};

export const SvgChoroplethStory = Template.bind({});
SvgChoroplethStory.argTypes = {
    colorsScale: {
        options: ['grey', 'blue'],
        control: { type: 'select' },
    },
    dataSet: {
        options: [1, 2],
        control: { type: 'select' },
    },
};
SvgChoroplethStory.args = {
    height: '100px',
    width: '100px',
    colorsScale: null,
    dataSet: 1,
    options: { geoJson: shapes },
};
