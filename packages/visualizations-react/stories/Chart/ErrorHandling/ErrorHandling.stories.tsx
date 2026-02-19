import React from 'react';
import type { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { ChartSeriesType } from '@opendatasoft/visualizations';
import { Meta, StoryObj } from '@storybook/react';
import type { Props } from 'reactify';
import { COLORS } from '../../utils';
import ChartTemplate from '../ChartTemplate';

/**
 * These stories demonstrate how the Chart component handles error scenarios gracefully
 * instead of crashing the application.
 */
const meta: Meta = {
    title: 'Chart/ErrorHandling',
};

export default meta;

// ============================================================================
// Automatic TimeUnit Fallback
// ============================================================================

/**
 * When a time scale is incompatible with the data range (would generate too many ticks),
 * the chart automatically falls back to a safer time unit.
 */
function generateHistoricalData(): DataFrame {
    const data: DataFrame = [];
    for (let year = 1600; year <= 2024; year += 10) {
        data.push({ x: `${year}-01-01`, y: Math.random() * 1000 + year - 1600 });
    }
    return data;
}

const TimeUnitFallbackArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: generateHistoricalData(),
    },
    options: {
        labelColumn: 'x',
        series: [
            {
                type: ChartSeriesType.Line,
                valueColumn: 'y',
                borderColor: COLORS.blue,
                backgroundColor: COLORS.blue,
                fill: { mode: 'origin' },
            },
        ],
        axis: {
            x: {
                display: true,
                type: 'time',
                timeUnit: 'day', // Incompatible with 424 years of data - will fallback to 'week'
                title: {
                    display: true,
                    text: 'Configured as "day" but automatically switched to "week" (most precise safe unit)',
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Value',
                },
            },
        },
        title: {
            text: 'Automatic TimeUnit Fallback (1600-2024)',
        },
        subtitle: {
            text: 'Data spans 424 years - configured as "day" but rendered as "week" to prevent crash',
        },
    },
};

export const TimeUnitFallback: StoryObj<typeof ChartTemplate> = {
    args: TimeUnitFallbackArgs,
    render: args => <ChartTemplate {...args} />,
    parameters: {
        docs: {
            description: {
                story: `This chart has data spanning 424 years (1600-2024) with \`timeUnit: 'day'\`.

Rendering daily ticks over 424 years would generate ~154,000 ticks, which would crash ChartJS.

The chart **automatically detects** this incompatibility and falls back to \`'week'\`,
allowing the chart to render successfully without any error visible to the user.`,
            },
        },
    },
};

// ============================================================================
// Data Error State
// ============================================================================

/**
 * When the data prop contains an error (e.g., API failure), the chart displays it gracefully.
 */
const DataErrorArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        error: 'Failed to fetch data: Network request failed (503 Service Unavailable)',
    },
    options: {
        labelColumn: 'x',
        series: [
            {
                type: ChartSeriesType.Line,
                valueColumn: 'y',
                borderColor: COLORS.red,
            },
        ],
        axis: {
            x: { display: true, type: 'linear' },
            y: { display: true },
        },
        title: {
            text: 'Data Error State',
        },
    },
};

export const DataError: StoryObj<typeof ChartTemplate> = {
    args: DataErrorArgs,
    render: args => <ChartTemplate {...args} />,
    parameters: {
        docs: {
            description: {
                story: `When the data contains an \`error\` property, the chart displays the error message
instead of crashing or showing a broken chart.

This is useful for handling API errors, network failures, or invalid data gracefully.`,
            },
        },
    },
};
