import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { Chart, Props } from '../../src';
import { COLORS, defaultSource } from '../utils';

const meta: ComponentMeta<typeof Chart> = {
    title: 'Chart',
    component: Chart,
};

export default meta;

export const ChartTemplate: ComponentStory<typeof Chart> = (args: Props<DataFrame, ChartOptions>) => (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Chart {...args} style={{ width: '60vw' }} />
        </div>
    );

export const Sample = ChartTemplate.bind({});
const SampleArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: [
            { x: 0, y: -2400, z: 1410 },
            { x: 1, y: -1400, z: 2750 },
            { x: 2, y: null, z: 3570 },
            { x: 3, y: -3000, z: null },
            { x: 4, y: -1800.47, z: null },
            { x: 5, y: -7780, z: -181 },
        ],
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        ariaLabel: 'Line chart with title, axis, grid and dots',
        series: [
            {
                label: 'Green',
                type: 'line',
                valueColumn: 'y',
                tension: 0,
                borderColor: COLORS.green,
            },
            {
                label: 'Blue',
                type: 'line',
                valueColumn: 'z',
                tension: 0,
                borderColor: COLORS.blue,
            },
        ],
        axis: {
            x: {
                display: true,
                type: 'linear',
                title: {
                    display: true,
                    text: 'Date de plantation',
                    align: 'center',
                },
                gridLines: {
                    display: false,
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Hello / km',
                    align: 'center',
                },
                gridLines: {
                    display: true,
                },
            },
        },
        title: {
            text: 'Line chart with title, axis, grid and dots',
        },
        legend: {
            display: true,
        },
    },
};
Sample.args = SampleArgs;
