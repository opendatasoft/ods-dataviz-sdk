import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ChoroplethOptions, ColorScale, ColorScaleTypes } from '@opendatasoft/visualizations';
import { ChoroplethSvg } from '../../src';
import { shapes } from './shapes';

const scales: { [key: string]: ColorScale | undefined } = {
    none: undefined,
    blue: {
        type: ColorScaleTypes.Gradient,
        colors: {
            start: '#bcf5f9',
            end: '#0229bf',
        },
    },
    grey: {
        type: ColorScaleTypes.Gradient,
        colors: {
            start: '#333333',
            end: '#CCCCCC',
        },
    },
};

// I know data is plural already!
const datasets: { [key: number]: { value: Array<{ x: string; y: number }> } } = {
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

const ChoroPlethWithSelect = ({
    scale,
    dataset,
    height,
    width,
    options,
}: {
    scale: string;
    dataset: number;
    height: string;
    width: string;
    options: ChoroplethOptions;
}) => {
    const optionsWithScale = { colorScale: scales[scale], ...options };
    const selectedDataset = datasets[dataset];
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
            <ChoroplethSvg
                options={optionsWithScale}
                data={selectedDataset}
                style={{ height: '100%', width: '100%' }} // Necessary to remove storybook wrapper
            />
        </div>
    );
};

const meta: ComponentMeta<typeof ChoroplethSvg> = {
    title: 'Map/ChoroplethSvg',
    component: ChoroplethSvg,
};

export default meta;
const Template: ComponentStory<typeof ChoroPlethWithSelect> = args => (
        <ChoroPlethWithSelect {...args} />
);
export const ChoroplethSvgStory = Template.bind({});
ChoroplethSvgStory.argTypes = {
    scale: {
        options: ['grey', 'blue'],
        control: { type: 'select' },
    },
    dataset: {
        options: [1, 2],
        control: { type: 'select' },
    },
};
ChoroplethSvgStory.args = {
    height: '100px',
    width: '100px',
    dataset: 1,
    scale: 'blue',
    options: { shapes },
};


