import { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import type { Props } from '../../src';
import { Chart } from '../../src';
import { gridStyle } from '../utils';
import {
    LineTitleAxisGridDots,
    LineAxisGridDots,
    LineTitleAxisGrid,
    LineTitleSubtitleGrid,
    LineTitleDataValues,
    LineDataValuesOnly,
    LineTitleAxisGridDotsNegative,
} from './ChartStudioLayoutsSettings/LineChart.stories';

import {
    AreaTitleAxisGridDots,
    AreaAxisGridDots,
    AreaTitleAxisGrid,
    AreaTitleSubtitleGrid,
    AreaTitleDataValues,
    AreaDataValuesOnly,
} from './ChartStudioLayoutsSettings/AreaChart.stories';

import {
    RadarTitleScale,
    RadarTitle,
    RadarTitleDataValues,
    RadarTitleScaleNegativePositive,
} from './ChartStudioLayoutsSettings/RadarChart.stories';

import {
    PieTitleSectorsName,
    PieTitleSectorsNameValue,
    PieTitleLegend,
    PieTitleLegendValues,
} from './ChartStudioLayoutsSettings/PieChart.stories';

import {
    BarTitleAxisGrid,
    BarAxisGrid,
    BarTitleAxisDataValues,
    BarAxisDataValues,
    BarTitleSubTitleGrid,
} from './ChartStudioLayoutsSettings/BarChart.stories';

import {
    ColumnTitleAxisGrid,
    ColumnAxisGrid,
    ColumnTitleSubtitleDataValues,
    ColumnDataValues,
    ColumnAxisDataValues,
    ColumnTitleAxisGridNegative,
} from './ChartStudioLayoutsSettings/ColumnChart.stories';

import {
    HistogramTitleAxisGrid,
    HistogramAxisGrid,
    HistogramTitleDataValues,
    HistogramDataValues,
    HistogramAxisDataValues,
    HistogramTitleAxisGridNegative,
} from './ChartStudioLayoutsSettings/HistogramChart.stories';

const meta: Meta = {
    title: 'Chart/StudioLayouts',
    parameters: {
        controls: {
            expanded: true,
        },
    },
};

export default meta;
type Args = { [key: string]: Props<DataFrame, ChartOptions> };
const Template = (args: Args) => (
    <div style={gridStyle}>
        {Object.keys(args).map((key, index) => (
            <Chart key={key} {...args[key]} />
        ))}
    </div>
);

export const LineChart: Story<Args> = Template.bind({});

LineChart.args = {
    LineTitleAxisGridDots: LineTitleAxisGridDots,
    LineAxisGridDots: LineAxisGridDots,
    LineTitleAxisGrid: LineTitleAxisGrid,
    LineTitleSubtitleGrid: LineTitleSubtitleGrid,
    LineTitleDataValues: LineTitleDataValues,
    LineDataValuesOnly: LineDataValuesOnly,
    LineTitleAxisGridDotsNegative: LineTitleAxisGridDotsNegative,
};

export const AreaChart: Story<Args> = Template.bind({});

AreaChart.args = {
    AreaTitleAxisGridDots: AreaTitleAxisGridDots,
    AreaAxisGridDots: AreaAxisGridDots,
    AreaTitleAxisGrid: AreaTitleAxisGrid,
    AreaTitleSubtitleGrid: AreaTitleSubtitleGrid,
    AreaTitleDataValues: AreaTitleDataValues,
    AreaDataValuesOnly: AreaDataValuesOnly,
};

export const RadarChart: Story<Args> = Template.bind({});

RadarChart.args = {
    RadarTitleScale: RadarTitleScale,
    RadarTitleScaleNegativePositive: RadarTitleScaleNegativePositive,
    RadarTitle: RadarTitle,
    RadarTitleDataValues: RadarTitleDataValues,
};

export const PieChart: Story<Args> = Template.bind({});

PieChart.args = {
    PieTitleSectorsName: PieTitleSectorsName,
    PieTitleSectorsNameValue: PieTitleSectorsNameValue,
    PieTitleLegend: PieTitleLegend,
    PieTitleLegendValues: PieTitleLegendValues,
};

export const BarChart: Story<Args> = Template.bind({});

BarChart.args = {
    BarTitleAxisGrid: BarTitleAxisGrid,
    BarAxisGrid: BarAxisGrid,
    BarTitleAxisDataValues: BarTitleAxisDataValues,
    BarAxisDataValues: BarAxisDataValues,
    BarTitleSubTitleGrid: BarTitleSubTitleGrid,
};

export const ColumnChart: Story<Args> = Template.bind({});

ColumnChart.args = {
    ColumnTitleAxisGrid: ColumnTitleAxisGrid,
    ColumnAxisGrid: ColumnAxisGrid,
    ColumnTitleSubtitleDataValues: ColumnTitleSubtitleDataValues,
    ColumnDataValues: ColumnDataValues,
    ColumnAxisDataValues: ColumnAxisDataValues,
    ColumnTitleAxisGridNegative: ColumnTitleAxisGridNegative,
};

export const HistogramChart: Story<Args> = Template.bind({});

HistogramChart.args = {
    HistogramTitleAxisGrid: HistogramTitleAxisGrid,
    HistogramAxisGrid: HistogramAxisGrid,
    HistogramTitleDataValues: HistogramTitleDataValues,
    HistogramDataValues: HistogramDataValues,
    HistogramAxisDataValues: HistogramAxisDataValues,
    HistogramTitleAxisGridNegative: HistogramTitleAxisGridNegative,
};
