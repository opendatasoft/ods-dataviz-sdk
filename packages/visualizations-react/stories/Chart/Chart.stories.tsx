import { ComponentMeta } from '@storybook/react';
import type { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { ChartSeriesType } from '@opendatasoft/visualizations';
import { Chart } from 'src';
import { Props } from 'reactify';
import { COLORS, defaultSource } from '../utils';
import ChartTemplate from './ChartTemplate';

const meta: ComponentMeta<typeof Chart> = {
    title: 'Chart',
    component: Chart,
};

export default meta;

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
        series: [
            {
                label: 'Green',
                type: ChartSeriesType.Line,
                valueColumn: 'y',
                tension: 0,
                borderColor: COLORS.green,
            },
            {
                label: 'Blue',
                type: ChartSeriesType.Line,
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
