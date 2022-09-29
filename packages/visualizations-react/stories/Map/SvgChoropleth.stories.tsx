import React from 'react';
import { Meta } from '@storybook/react';
import { SvgChoropleth, Choropleth } from '../../src';
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

const GLoptions = {
    style: {},
    parameters: {},
    shapes,
    colorsScale: {
        type: 'palette',
        colors: ['#bcf5f9', '#89c5fd', '#3a80ec', '#0229bf'],
    },
    aspectRatio: 1,
    legend: {
        title: 'I Am Legend',
    },
}


const meta: Meta = {
    title: 'Map/SvgChoropleth',
    component: SvgChoropleth,
};

export default meta;
const Template = ({ height, width, colorsScale, dataSet, options }) => {
    const optionsWithScale = { colorsScale: scales[colorsScale], ...options };
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

const PerfTemplate = ({ height, width, colorsScale, dataSet, options, numberOfMaps }) => {
    const optionsWithScale = { colorsScale: scales[colorsScale], ...options };
    return (
        <>
            <h1>SVG</h1>
            {Array.from({ length: numberOfMaps }, (_, i) => i).map(() => (
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
            ))}

            <h1>MapLibre</h1>
            {Array.from({ length: numberOfMaps }, (_, i) => i).map(() => (
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
                    <Choropleth
                        options={GLoptions}
                        data={dataSets[dataSet]}
                        style={{ height: '100%', width: '100%' }} // necessary to remove the wrapper div
                    />
                </div>
            ))}
        </>
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

export const PerfSvgChoroplethStory = PerfTemplate.bind({});
PerfSvgChoroplethStory.argTypes = {
    colorsScale: {
        options: ['grey', 'blue'],
        control: { type: 'select' },
    },
    dataSet: {
        options: [1, 2],
        control: { type: 'select' },
    },
    numberOfMaps: {
        control: { type: 'range', min: 5, max: 30, step: 1 }
    }
};
PerfSvgChoroplethStory.args = {
    height: '100px',
    width: '100px',
    colorsScale: null,
    dataSet: 1,
    numberOfMaps: 10,
    options: { geoJson: shapes },
};
