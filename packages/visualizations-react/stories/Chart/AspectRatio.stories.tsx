import React from 'react';
import type { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { ChartSeriesType } from '@opendatasoft/visualizations';
import { Meta, StoryObj } from '@storybook/react';
import type { Props } from 'reactify';
import { Chart } from 'src';
import { COLORS, defaultLinks } from '../utils';

/**
 * By default the chart keeps a fixed `aspectRatio` (a numeric width/height ratio) and derives its
 * height from its width. Setting `aspectRatio: 'auto'` drops that constraint and lets ChartJS size
 * the canvas from the parent's box instead, which requires the parent to have an explicit height.
 *
 * Drag the bottom-right corner of either box below: the `'auto'` chart follows both dimensions,
 * while the fixed one keeps its ratio and letterboxes inside the leftover space.
 */
const meta: Meta = {
    title: 'Chart/AspectRatio',
};

export default meta;

/**
 * Resizable host with an explicit height, which `aspectRatio: 'auto'` needs to fill. The shared
 * ChartTemplate can't be reused here: it sets a width but leaves the height to the content.
 *
 * The box starts tall enough for the fixed-ratio chart to fit, so what you see when resizing is the
 * ratio behaviour rather than a scrollbar. `overflow: hidden` (still resizable) also absorbs the
 * couple of pixels a content-box card overflows its container by.
 */
const ResizableChartTemplate = (args: Props<DataFrame, ChartOptions>) => (
    <div
        style={{
            resize: 'both',
            overflow: 'hidden',
            height: '440px',
            width: '520px',
            border: '1px dashed grey',
        }}
    >
        <Chart {...args} />
    </div>
);

const df = [
    { x: 'Jan', y: 12 },
    { x: 'Feb', y: 19 },
    { x: 'Mar', y: 8 },
    { x: 'Apr', y: 24 },
    { x: 'May', y: 17 },
    { x: 'Jun', y: 21 },
];

const AutoAspectRatioArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        links: defaultLinks,
        aspectRatio: 'auto',
        series: [
            {
                type: ChartSeriesType.Bar,
                valueColumn: 'y',
                backgroundColor: COLORS.blue,
            },
        ],
        title: {
            text: "aspectRatio: 'auto' — fills its resizable parent",
        },
    },
};

export const AutoAspectRatio: StoryObj<typeof ResizableChartTemplate> = {
    args: AutoAspectRatioArgs,
    render: args => <ResizableChartTemplate {...args} />,
};

const FixedAspectRatioArgs: Props<DataFrame, ChartOptions> = {
    ...AutoAspectRatioArgs,
    options: {
        ...AutoAspectRatioArgs.options,
        aspectRatio: 4 / 3,
        title: {
            text: 'aspectRatio: 4/3 (default) — keeps its ratio, letterboxes',
        },
    },
};

export const FixedAspectRatio: StoryObj<typeof ResizableChartTemplate> = {
    args: FixedAspectRatioArgs,
    render: args => <ResizableChartTemplate {...args} />,
};
