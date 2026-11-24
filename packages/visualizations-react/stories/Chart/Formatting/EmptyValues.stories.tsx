import React from 'react';
import type { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { ChartSeriesType } from '@opendatasoft/visualizations';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, StoryObj } from '@storybook/react';
import type { Props } from 'reactify';

import ChartTemplate from '../ChartTemplate';

const meta: Meta = {
    title: 'Chart/Formatting/EmptyValues',
};

export default meta;

// Some series have no value (null) at some labels, e.g. an average over no records.
const df = [
    { x: 'North', a: 12, b: -4, c: 7 },
    { x: 'South', a: null, b: 3, c: null },
    { x: 'East', a: null, b: null, c: null },
    { x: 'West', a: 5, b: 0, c: -2 },
];

const series = [
    { valueColumn: 'a', label: 'Series A', color: 'rgb(80, 180, 150)' },
    { valueColumn: 'b', label: 'Series B', color: 'rgb(240, 130, 110)' },
    { valueColumn: 'c', label: 'Series C', color: 'rgb(150, 150, 150)' },
];

const args: Props<DataFrame, ChartOptions> = {
    data: { loading: false, value: df },
    options: {
        labelColumn: 'x',
        series: series.map(({ valueColumn, label, color }) => ({
            type: ChartSeriesType.Bar,
            valueColumn,
            label,
            backgroundColor: color,
            borderColor: color,
        })),
        axis: {
            x: { display: true, type: 'category', offset: true },
            y: { display: true },
        },
        legend: { display: true, position: 'bottom' },
        // Hover "South" or "East": series without a value read `–` instead of `0`
        // (`0` of "Series B" at "West" is a real value and stays `0`).
        tooltip: { emptyValueLabel: '–' },
    },
};

export const TooltipEmptyValueLabel: StoryObj<typeof ChartTemplate> = {
    args,
    render: storyArgs => <ChartTemplate {...storyArgs} />,
};
