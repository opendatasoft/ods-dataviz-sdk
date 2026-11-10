import React from 'react';
import type { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { ChartSeriesType } from '@opendatasoft/visualizations';
import { Meta, StoryObj } from '@storybook/react';
import type { Props } from 'reactify';
import { defaultLinks } from '../../utils';
import ChartTemplate from '../ChartTemplate';

const meta: Meta = {
    title: 'Chart/Formatting/TicksPrecision',
};

export default meta;

/**
 * The values are written with `fractionDigits` decimals, and `precision` (when set) keeps the
 * value axis ticks on the same decimals, so the axis never shows `0.5` next to values rounded
 * to whole numbers.
 */
function columnsArgs(
    value: DataFrame,
    fractionDigits: number,
    precision: number | undefined,
    title: string
): Props<DataFrame, ChartOptions> {
    const { format } = new Intl.NumberFormat(undefined, {
        maximumFractionDigits: fractionDigits,
    });
    return {
        data: { loading: false, value },
        options: {
            labelColumn: 'x',
            links: defaultLinks,
            series: [
                {
                    type: ChartSeriesType.Bar,
                    valueColumn: 'y',
                    backgroundColor: 'rgba(22, 161, 145, 0.5)',
                    borderColor: 'rgb(22, 161, 145)',
                },
            ],
            axis: {
                x: { display: true, type: 'category', gridLines: { display: false } },
                y: {
                    display: true,
                    type: 'linear',
                    gridLines: { display: true },
                    ticks: { format, precision },
                },
            },
            tooltip: { numberFormatter: format },
            title: { text: title },
        },
    };
}

const averages: DataFrame = [
    { x: 'Leisure', y: 4 },
    { x: 'Personal', y: 4.5 },
    { x: 'Landmark', y: 4 },
    { x: 'Transport', y: 3.2 },
    { x: 'Work', y: 3.75 },
];

const rates: DataFrame = [
    { x: 'North', y: 0.099 },
    { x: 'South', y: 0.183 },
    { x: 'East', y: 0.32 },
    { x: 'West', y: 0.214 },
];

export const WholeNumbersWithoutPrecision: StoryObj<typeof ChartTemplate> = {
    args: columnsArgs(averages, 0, undefined, 'Values with 0 decimals, axis without precision'),
    render: args => <ChartTemplate {...args} />,
};

export const WholeNumbersWithPrecision: StoryObj<typeof ChartTemplate> = {
    args: columnsArgs(averages, 0, 0, 'Values with 0 decimals, axis with precision 0'),
    render: args => <ChartTemplate {...args} />,
};

export const OneDecimalWithoutPrecision: StoryObj<typeof ChartTemplate> = {
    args: columnsArgs(rates, 1, undefined, 'Values with 1 decimal, axis without precision'),
    render: args => <ChartTemplate {...args} />,
};

export const OneDecimalWithPrecision: StoryObj<typeof ChartTemplate> = {
    args: columnsArgs(rates, 1, 1, 'Values with 1 decimal, axis with precision 1'),
    render: args => <ChartTemplate {...args} />,
};
