import React from 'react';
import type { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { ChartSeriesType } from '@opendatasoft/visualizations';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, StoryObj } from '@storybook/react';
import type { Props } from 'reactify';

import ChartTemplate from '../ChartTemplate';

const meta: Meta = {
    title: 'Chart/Formatting/SegmentedLegend',
};

export default meta;

// A chart split by a field (one series per value, plus "Others"): the HTML legend shows the
// field name first, then the values on the same lines, in a frame scrolling past `maxHeight`.
const CITIES = Array.from({ length: 20 }, (_, i) => `City ${i + 1}`);
const PALETTE = [
    'rgb(180, 150, 140)',
    'rgb(120, 180, 230)',
    'rgb(250, 220, 150)',
    'rgb(150, 210, 180)',
];
const columns = [...CITIES.map((_, i) => `v${i}`), 'others'];

const df = ['Arts', 'Food', 'Parks', 'Sports'].map((x, row) => ({
    x,
    ...Object.fromEntries(columns.map((column, i) => [column, (row * 3 + i) % 5])),
}));

const buildArgs = (count: number): Props<DataFrame, ChartOptions> => ({
    data: { loading: false, value: df },
    options: {
        labelColumn: 'x',
        series: [...columns.slice(0, count), 'others'].map((valueColumn, i) => ({
            type: ChartSeriesType.Bar,
            valueColumn,
            label: valueColumn === 'others' ? 'Others' : CITIES[i],
            backgroundColor:
                valueColumn === 'others' ? 'rgb(128, 128, 128)' : PALETTE[i % PALETTE.length],
        })),
        axis: {
            x: { display: true, type: 'category', offset: true },
            y: { display: true },
            assemblage: { stacked: true },
        },
        legend: {
            display: true,
            custom: true,
            variant: 'inline',
            title: 'City',
            maxHeight: '80px',
        },
    },
});

export const FewValues: StoryObj<typeof ChartTemplate> = {
    args: buildArgs(3),
    render: args => <ChartTemplate {...args} />,
};

export const TwentyValuesAndOthers: StoryObj<typeof ChartTemplate> = {
    args: buildArgs(20),
    render: args => <ChartTemplate {...args} />,
};
