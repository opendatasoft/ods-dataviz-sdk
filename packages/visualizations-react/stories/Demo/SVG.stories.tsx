import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DataFrame, ChoroplethGeoJsonOptions } from '@opendatasoft/visualizations';
import { ChoroplethSvg, Props } from '../../src';
import { shapes } from './data';

// I know data is plural already!
const data = {
    value: [
        { x: 'France', y: 20 },
        { x: 'Île de France', y: 75 },
        { x: 'Corsica', y: 30 },
    ],
};

const meta: ComponentMeta<typeof ChoroplethSvg> = {
    title: 'Demo/SVG',
    component: ChoroplethSvg,
};
export default meta;

type Args = Props<DataFrame, ChoroplethGeoJsonOptions> & {
    numMaps: number;
};
const VectorBase = ({ numMaps, ...args }: Args) => (
    <div
        style={{
            display: 'flex',
            flexWrap: 'wrap',
        }}
    >
        {[...Array(numMaps)].map(() => (
            <div
                style={{
                    height: '200px',
                    width: '200px',
                    display: 'block',
                }}
            >
                <ChoroplethSvg {...args} style={{ height: '100%', width: '100%' }} />
            </div>
        ))}
    </div>
);
const VectorTemplate: ComponentStory<typeof VectorBase> = args => <VectorBase {...args} />;

export const SvgStory = VectorTemplate.bind({});
const SvgStoryArgs = {
    numMaps: 5,
    data,
    options: {
        height: '200px',
        width: '200px',
        shapes,
    },
};

SvgStory.argTypes = {
    numMaps: {
        control: {
            type: 'range',
            min: 1,
            max: 50,
            step: 1,
        },
    },
};
SvgStory.args = SvgStoryArgs;

