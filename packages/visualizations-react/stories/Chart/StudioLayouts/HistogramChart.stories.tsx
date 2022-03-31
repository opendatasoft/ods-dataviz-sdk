import { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { Meta } from '@storybook/react';
import { Props } from '../../../src';
import { defaultSource } from '../../utils';
import { Sample } from '../Chart.stories';
import { storyWithArgs } from '../../utils';

const meta: Meta = {
    title: 'Chart/StudioLayouts/HistogramChart',
};

export default meta;

const df = [
    { x: 0, y: 100 },
    { x: 1, y: 50 },
    { x: 2, y: 20 },
    { x: 3, y: -30 },
    { x: 4, y: 40 },
    { x: 5, y: 50 },
];

export const HistogramTitleAxisGrid = storyWithArgs<Props<DataFrame, ChartOptions>>(Sample, {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        ariaLabel: 'Histogram series chart',
        series: [
            {
                type: 'bar',
                valueColumn: 'y',
                barPercentage: 1,
                categoryPercentage: 1,
                backgroundColor: 'rgba(50,50,225,0.5)',
                borderColor: 'rgba(50,50,225)',
            },
        ],
        axis: {
            x: {
                display: true,
                type: 'category',
                offset: true,
                title: {
                    display: true,
                    text: 'x',
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
                    text: 'y',
                    align: 'center',
                },
                gridLines: {
                    display: true,
                },
            },

        },
        title: {
            text: 'Histogram chart with title, axis and grid',
        },
    },
});

export const HistogramAxisGrid = storyWithArgs<Props<DataFrame, ChartOptions>>(Sample, {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        ariaLabel: 'Histogram chart with axis and grid',
        series: [
            {
                type: 'bar',
                valueColumn: 'y',
                barPercentage: 1,
                categoryPercentage: 1,
                backgroundColor: 'rgba(50,50,225,0.5)',
                borderColor: 'rgba(50,50,225)',
            },
        ],
        axis: {
            x: {
                display: true,
                type: 'category',
                offset: true,
                title: {
                    display: true,
                    text: 'x',
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
                    text: 'y',
                    align: 'center',
                },
                gridLines: {
                    display: true,
                },
            },

        },
    },
});

export const HistogramTitleDataValues = storyWithArgs<Props<DataFrame, ChartOptions>>(Sample, {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        ariaLabel: 'Histogram chart with title, subtitle and data values',
        series: [
            {
                type: 'bar',
                valueColumn: 'y',
                barPercentage: 1,
                categoryPercentage: 1,
                backgroundColor: 'rgba(50,50,225,0.5)',
                borderColor: 'rgba(50,50,225)',
                dataLabels: {
                    display: true,
                    align: function (index) {
                        if (df[index].y >= 0) {
                            return 'end';
                        } else {
                            return 'start';
                        }
                    },
                    anchor: function (index) {
                        if (df[index].y >= 0) {
                            return 'end';
                        } else {
                            return 'start';
                        }
                    },
                    color: 'rgba(50,50,225)',
                },
            },
        ],
        axis: {
            x: {
                display: false,
                type: 'category',
                offset: true,
                title: {
                    display: false,
                    text: 'x',
                    align: 'center',
                },
                ticks: {
                    display: false,
                },
            },
            y: {
                display: true,
                type: 'category',
                title: {
                    display: false,
                    text: 'y',
                    align: 'center',
                },
                gridLines: {
                    display: 'single',
                },
                ticks: {
                    display: 'single',
                },
            },

        },
        title: {
            text: 'Histogram chart with title, subtitle and data values',
        },
        subtitle: {
            text: 'Custom Chart Subtitle',
        },
    },
});

export const HistogramDataValues = storyWithArgs<Props<DataFrame, ChartOptions>>(Sample, {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        ariaLabel: 'Histogram chart with data values',
        series: [
            {
                type: 'bar',
                valueColumn: 'y',
                barPercentage: 1,
                categoryPercentage: 1,
                backgroundColor: 'rgba(50,50,225,0.5)',
                borderColor: 'rgba(50,50,225)',
                dataLabels: {
                    display: true,
                    align: function (index) {
                        if (df[index].y >= 0) {
                            return 'end';
                        } else {
                            return 'start';
                        }
                    },
                    anchor: function (index) {
                        if (df[index].y >= 0) {
                            return 'end';
                        } else {
                            return 'start';
                        }
                    },
                    color: 'rgba(50,50,225)',
                },
            },
        ],
        axis: {
            x: {
                display: false,
                type: 'category',
                offset: true,
                title: {
                    display: false,
                    text: 'x',
                    align: 'center',
                },
                ticks: {
                    display: false,
                },
            },
            y: {
                display: true,
                title: {
                    display: false,
                    text: 'y',
                    align: 'center',
                },
                gridLines: {
                    display: 'single',
                },
                ticks: {
                    display: 'single',
                },
            },

        },
    },
});

export const HistogramAxisDataValues = storyWithArgs<Props<DataFrame, ChartOptions>>(Sample, {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        ariaLabel: 'Histogram chart with axis and data values',
        series: [
            {
                type: 'bar',
                valueColumn: 'y',
                barPercentage: 1,
                categoryPercentage: 1,
                backgroundColor: 'rgba(50,50,225,0.5)',
                borderColor: 'rgba(50,50,225)',
                dataLabels: {
                    display: true,
                    align: function (index) {
                        if (df[index].y >= 0) {
                            return 'end';
                        } else {
                            return 'start';
                        }
                    },
                    anchor: function (index) {
                        if (df[index].y >= 0) {
                            return 'end';
                        } else {
                            return 'start';
                        }
                    },
                    color: 'rgba(50,50,225)',
                },
            },
        ],
        axis: {
            x: {
                display: true,
                type: 'category',
                offset: true,
                title: {
                    display: true,
                    text: 'x',
                    align: 'center',
                },
                gridLines: {
                    display: false,
                },
                ticks: {
                    display: true,
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'y',
                    align: 'center',
                },
                gridLines: {
                    display: 'single',
                },
                ticks: {
                    display: 'single',
                },
            },

        },
    },
});

export const HistogramTitleAxisGridNegative = storyWithArgs<Props<DataFrame, ChartOptions>>(
    Sample,
    {
        data: {
            loading: false,
            value: [
                { x: 0, y: -10000 },
                { x: 1, y: -5000 },
                { x: 2, y: -2000 },
                { x: 3, y: -3000 },
                { x: 4, y: -4000 },
                { x: 5, y: -5000 },
            ],
        },
        options: {
            labelColumn: 'x',
            source: defaultSource,
            ariaLabel: 'Histogram series chart',
            series: [
                {
                    type: 'bar',
                    valueColumn: 'y',
                    barPercentage: 1,
                    categoryPercentage: 1,
                    backgroundColor: 'rgba(50,50,225,0.5)',
                    borderColor: 'rgba(50,50,225)',
                },
            ],
            axis: {
                x: {
                    display: true,
                    type: 'category',
                    offset: true,
                    title: {
                        display: true,
                        text: 'x',
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
                        text: 'y',
                        align: 'center',
                    },
                    gridLines: {
                        display: true,
                    },
                },

            },
            title: {
                text: 'Histogram chart with title, axis and grid',
            },
        },
    }
);
