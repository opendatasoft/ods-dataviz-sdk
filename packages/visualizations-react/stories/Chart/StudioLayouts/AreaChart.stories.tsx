import { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { Meta } from '@storybook/react';
import { Props } from '../../../src';
import { defaultSource } from '../../utils';
import { Sample } from '../Chart.stories';
import { storyWithArgs } from '../../utils';

const meta: Meta = {
    title: 'Chart/StudioLayouts/AreaChart',
};

export default meta;

const df = [
    { x: 0, y: 2400, z: 1021, a: 523 },
    { x: 1, y: -140, z: 2424, a: 298 },
    { x: 2, y: 2000, z: 3222, a: 248 },
    { x: 3, y: 3, z: 1255, a: 1200 },
    { x: 4, y: 180.47, z: 1424, a: 1200 },
    { x: 5, y: 778, z: 12, a: 2000 },
];

export const AreaTitleAxisGridDots = storyWithArgs<Props<DataFrame, ChartOptions>>(Sample, {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        ariaLabel: 'Area chart with title, axis, grid and dots',
        series: [
            {
                type: 'line',
                label: 'Serie 1',
                valueColumn: 'y',
                tension: 0.3,
                borderColor: 'rgb(22, 161, 145)',
                fill: {
                    mode: 'origin',
                    above: 'rgb(22, 161, 145, 0.26)',
                    below: 'rgb(22, 161, 145, 0.26)',
                },
            },
            {
                type: 'line',
                valueColumn: 'z',
                label: 'Consommation de gaz en GWh',
                tension: 0.3,
                borderColor: 'rgb(119, 73, 54)',
                fill: {
                    mode: 'origin',
                    above: 'rgb(119, 73, 54, 0.26)',
                    below: 'rgb(119, 73, 54, 0.26)',
                },
            },
            {
                type: 'line',
                valueColumn: 'a',
                label: 'Serie 2',
                tension: 0.3,
                borderColor: 'rgb(239, 155, 30)',
                fill: {
                    mode: 'origin',
                    above: 'rgb(239, 155, 30, 0.26)',
                    below: 'rgb(239, 155, 30, 0.26)',
                },
            },
            {
                type: 'line',
                valueColumn: 'z',
                label: 'Consommation électrique en GWh',
                tension: 0.3,
                borderColor: 'rgb(111, 168, 220)',
                fill: {
                    mode: 'origin',
                    above: 'rgb(111, 168, 220, 0.26)',
                    below: 'rgb(111, 168, 220, 0.26)',
                },
            },
            {
                type: 'line',
                valueColumn: 'z',
                label: 'Serie 2',
                tension: 0.3,
                borderColor: 'rgb(199, 182, 182)',
                fill: {
                    mode: 'origin',
                    above: 'rgb(199, 182, 182, 0.26)',
                    below: 'rgb(199, 182, 182, 0.26)',
                },
            },
            {
                type: 'line',
                valueColumn: 'z',
                label: 'Consommation pétrole en GWh',
                tension: 0.3,
                borderColor: 'rgb(209, 152, 152)',
                fill: {
                    mode: 'origin',
                    above: 'rgb(209, 152, 152, 0.26)',
                    below: 'rgb(209, 152, 152, 0.26)',
                },
            },
            {
                type: 'line',
                valueColumn: 'z',
                label: 'Serie 3',
                tension: 0.3,
                borderColor: 'rgb(244, 204, 204)',
                fill: {
                    mode: 'origin',
                    above: 'rgb(244, 204, 204, 0.26)',
                    below: 'rgb(244, 204, 204, 0.26)',
                },
            },
        ],
        axis: {
            x: {
                display: true,
                type: 'linear',
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
                    text: 'hello',
                },
                gridLines: {
                    display: true,
                },
            },
        },
        title: {
            text: 'Area chart with title, axis, grid and dots',
        },
        legend: {
            display: true,
        },
    },
});

export const AreaAxisGridDots = storyWithArgs<Props<DataFrame, ChartOptions>>(Sample, {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        ariaLabel: 'Area chart with axis, grid and dots',
        series: [
            {
                type: 'line',
                valueColumn: 'y',
                tension: 0.3,
                borderColor: 'rgb(22, 161, 145)',
                fill: {
                    mode: 'origin',
                    above: 'rgb(22, 161, 145, 0.26)',
                    below: 'rgb(22, 161, 145, 0.26)',
                },
            },
        ],
        axis: {
            x: {
                display: true,
                type: 'linear',
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

export const AreaTitleAxisGrid = storyWithArgs<Props<DataFrame, ChartOptions>>(Sample, {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        ariaLabel: 'Area chart with title, axis and grid',
        series: [
            {
                type: 'line',
                valueColumn: 'y',
                tension: 0.3,
                pointRadius: 0,
                borderColor: 'rgb(22, 161, 145)',
                fill: {
                    mode: 'origin',
                    above: 'rgb(22, 161, 145, 0.26)',
                    below: 'rgb(22, 161, 145, 0.26)',
                },
            },
        ],
        axis: {
            x: {
                display: true,
                type: 'linear',
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
            text: 'Area chart with title, axis and grid',
        },
    },
});

export const AreaTitleSubtitleGrid = storyWithArgs<Props<DataFrame, ChartOptions>>(Sample, {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        ariaLabel: 'Area chart with title, subtitle and grid',
        series: [
            {
                type: 'line',
                valueColumn: 'y',
                tension: 0.3,
                pointRadius: 0,
                borderColor: 'rgb(22, 161, 145)',
                fill: {
                    mode: 'origin',
                    above: 'rgb(22, 161, 145, 0.26)',
                    below: 'rgb(22, 161, 145, 0.26)',
                },
            },
        ],
        axis: {
            x: {
                display: true,
                type: 'linear',
                title: {
                    display: false,
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
                    display: false,
                    text: 'y',
                    align: 'center',
                },
                gridLines: {
                    display: true,
                },
            },
        },
        title: {
            text: 'Area chart with title, subtitle and grid',
        },
        subtitle: {
            text: 'Custom Chart Subtitle',
        },
    },
});

export const AreaTitleDataValues = storyWithArgs<Props<DataFrame, ChartOptions>>(Sample, {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        ariaLabel: 'Area chart with title and data values on axis',
        series: [
            {
                type: 'line',
                valueColumn: 'y',
                tension: 0.3,
                borderColor: 'rgb(22, 161, 145)',
                pointRadius: 0,
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
                    color: 'rgb(22, 161, 145)',
                },
                fill: {
                    mode: 'origin',
                    above: 'rgb(22, 161, 145, 0.26)',
                    below: 'rgb(22, 161, 145, 0.26)',
                },
            },
        ],
        axis: {
            x: {
                display: true,
                type: 'linear',
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
                gridLines: {
                    display: 'single',
                },
                ticks: {
                    display: 'single',
                },
            },
        },
        title: {
            text: 'Area chart with title and data values on axis',
        },
    },
});

export const AreaDataValuesOnly = storyWithArgs<Props<DataFrame, ChartOptions>>(Sample, {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        ariaLabel: 'Area chart with data values on axis',
        series: [
            {
                type: 'line',
                valueColumn: 'y',
                tension: 0.3,
                borderColor: 'rgb(22, 161, 145)',
                fill: {
                    mode: 'origin',
                    above: 'rgb(22, 161, 145, 0.26)',
                    below: 'rgb(22, 161, 145, 0.26)',
                },
                pointRadius: 0,
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
                    color: 'rgb(22, 161, 145)',
                },
            },
        ],
        axis: {
            x: {
                display: true,
                type: 'linear',
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
