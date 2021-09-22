import { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import type { Props } from '../../src';
import { Chart } from '../../src';
import { gridStyle } from '../utils';
import {
    LongTicksFixed,
    BarLongTicks,
    ColumnLongTicks,
    RadarLongTicks,
} from './ChartDefaultFormattersSettings/LongTicks.stories';

import {
    LineLongLegend,
    PieLongLegend,
    PieLongLegendBis,
    RadarLongLegend,
} from './ChartDefaultFormattersSettings/LongLegend.stories';

import {
    LineLongDataLabels,
    PieLongDataLabels,
    RadarLongDataLabels,
} from './ChartDefaultFormattersSettings/LongDataLabels.stories';

const meta: Meta = {
    title: 'Chart/DefaultFormatters',
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

export const LongTicks: Story<Args> = Template.bind({});

LongTicks.args = {
    LongTicksFixed: LongTicksFixed,
    BarLongTicks: BarLongTicks,
    ColumnLongTicks: ColumnLongTicks,
    RadarLongTicks: RadarLongTicks,
};

export const LongLegend: Story<Args> = Template.bind({});

LongLegend.args = {
    LineLongLegend: LineLongLegend,
    PieLongLegend: PieLongLegend,
    PieLongLegendBis: PieLongLegendBis,
    RadarLongLegend: RadarLongLegend,
};

export const LongDataLabels: Story<Args> = Template.bind({});

LongDataLabels.args = {
    LineLongDataLabels: LineLongDataLabels,
    PieLongDataLabels: PieLongDataLabels,
    RadarLongDataLabels: RadarLongDataLabels,
};
