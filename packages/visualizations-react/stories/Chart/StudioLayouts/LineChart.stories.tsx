import { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { Meta } from '@storybook/react';
import { Props } from '../../../src';
import { defaultSource } from '../../utils';
import { Sample } from '../Chart.stories';
import { storyWithArgs } from '../../utils';

const meta: Meta = {
    title: 'Chart/StudioLayouts/LineChart',
};

export default meta;

const df = [
    { x: 0, y: 2400, z: 1021 },
    { x: 1, y: -140, z: 2424 },
    { x: 2, y: 2000, z: 3222 },
    { x: 3, y: 3, z: 1255 },
    { x: 4, y: 180.47, z: 1424 },
    { x: 5, y: 778, z: 12 },
];

export const LineTitleAxisGridDots = storyWithArgs<Props<DataFrame, ChartOptions>>(Sample, {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        ariaLabel: 'Line chart with title, axis, grid and dots',
        series: [
            {
                type: 'line',
                valueColumn: 'y',
                tension: 0,
                borderColor: 'rgb(22, 161, 145)',
                borderDash: [5, 5],
            },
            {
                type: 'line',
                valueColumn: 'z',
                tension: 0,
                borderColor: 'rgb(119, 73, 54)',
            },
        ],
        xAxis: {
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
        yAxis: {
            display: true,
            title: {
                display: true,
                text: 'Moyenne de la hauteur en CM',
                align: 'center',
            },
            gridLines: {
                display: true,
            },
        },
        title: {
            text: 'Line chart with title, axis, grid and dots',
        },
    },
});

export const LineAxisGridDots = storyWithArgs<Props<DataFrame, ChartOptions>>(Sample, {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        ariaLabel: 'Line chart with axis, grid and dots',
        series: [
            {
                type: 'line',
                valueColumn: 'y',
                tension: 0.3,
                borderColor: 'rgb(22, 161, 145)',
                borderDash: [5, 5],
            },
            {
                type: 'line',
                valueColumn: 'z',
                tension: 0.3,
                borderColor: 'rgb(119, 73, 54)',
            },
        ],
        xAxis: {
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
        yAxis: {
            display: true,
            title: {
                display: true,
                text: 'Moyenne de la hauteur en CM',
                align: 'center',
            },
            gridLines: {
                display: true,
            },
        },
    },
});

export const LineTitleAxisGrid = storyWithArgs<Props<DataFrame, ChartOptions>>(Sample, {
    data: {
        loading: false,
        value: [
            { x: 0, y: 2400, z: 1 },
            { x: 1, y: -140, z: 2 },
            { x: 2, y: 2000, z: 3 },
            { x: 3, y: 3, z: 1 },
            { x: 4, y: 180.47, z: 1 },
            { x: 5, y: 778, z: 1 },
        ],
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        ariaLabel: 'Line chart with title, axis and grid',
        series: [
            {
                type: 'line',
                valueColumn: 'y',
                tension: 0,
                borderColor: 'rgb(22, 161, 145)',
                pointRadius: 0,
            },
        ],
        xAxis: {
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
        yAxis: {
            display: true,
            title: {
                display: true,
                text: 'Moyenne de la hauteur en CM',
                align: 'center',
            },
            gridLines: {
                display: true,
            },
        },
        title: {
            text: 'Line chart with title, axis and grid',
        },
    },
});

export const LineTitleSubtitleGrid = storyWithArgs<Props<DataFrame, ChartOptions>>(Sample, {
    data: {
        loading: false,
        value: [
            { x: 0, y: 2400, z: 1 },
            { x: 1, y: -140, z: 2 },
            { x: 2, y: 2000, z: 3 },
            { x: 3, y: 3, z: 1 },
            { x: 4, y: 180.47, z: 1 },
            { x: 5, y: 778, z: 1 },
        ],
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        ariaLabel: 'Line chart with title, subtitle and grid',
        series: [
            {
                type: 'line',
                valueColumn: 'y',
                tension: 0,
                borderColor: 'rgb(22, 161, 145)',
                pointRadius: 0,
            },
        ],
        xAxis: {
            display: true,
            type: 'linear',
            title: {
                display: false,
                text: 'Date de plantation',
                align: 'center',
            },
            gridLines: {
                display: false,
            },
        },
        yAxis: {
            display: true,
            title: {
                display: false,
                text: 'Moyenne de la hauteur en CM',
                align: 'center',
            },
            gridLines: {
                display: true,
            },
        },
        title: {
            text: 'Line chart with title, subtitle and grid',
        },
        subtitle: {
            text: 'Custom Chart Subtitle',
        },
    },
});

export const LineTitleDataValues = storyWithArgs<Props<DataFrame, ChartOptions>>(Sample, {
    data: {
        loading: false,
        value: [
            { x: 0, y: 2400, z: 1 },
            { x: 1, y: -140, z: 2 },
            { x: 2, y: 2000, z: 3 },
            { x: 3, y: 3, z: 1 },
            { x: 4, y: 180.47, z: 1 },
            { x: 5, y: 778, z: 1 },
        ],
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        ariaLabel: 'Line chart with title and data values on axis',
        series: [
            {
                type: 'line',
                valueColumn: 'y',
                tension: 0,
                borderColor: 'rgb(22, 161, 145)',
                pointRadius: 0,
                dataLabels: {
                    display: true,
                    color: 'rgb(22, 161, 145)',
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
                        } else if (df[index].y === 0) {
                            return 'center';
                        } else {
                            return 'start';
                        }
                    },
                },
            },
        ],
        xAxis: {
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
        yAxis: {
            display: true,
            gridLines: {
                display: 'single',
            },
            ticks: {
                display: 'single',
            },
        },
        title: {
            text: 'Line chart with title and data values on axis',
        },
    },
});

export const LineDataValuesOnly = storyWithArgs<Props<DataFrame, ChartOptions>>(Sample, {
    data: {
        loading: false,
        value: [
            { x: 0, y: 2400, z: 1 },
            { x: 1, y: -140, z: 2 },
            { x: 2, y: 2000, z: 3 },
            { x: 3, y: 3, z: 1 },
            { x: 4, y: 180.47, z: 1 },
            { x: 5, y: 778, z: 1 },
        ],
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        ariaLabel: 'Line chart with data values on axis',
        series: [
            {
                type: 'line',
                valueColumn: 'y',
                tension: 0,
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
            },
        ],
        xAxis: {
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
        yAxis: {
            display: true,
            gridLines: {
                display: 'single',
            },
            ticks: {
                display: 'single',
            },
        },
    },
});

export const LineTitleAxisGridDotsNegative = storyWithArgs<Props<DataFrame, ChartOptions>>(Sample, {
    data: {
        loading: false,
        value: [
            { x: 0, y: -2400, z: 1 },
            { x: 1, y: -1400, z: 2 },
            { x: 2, y: -2000, z: 3 },
            { x: 3, y: -3000, z: 1 },
            { x: 4, y: -1800.47, z: 1 },
            { x: 5, y: -7780, z: 1 },
        ],
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        ariaLabel: 'Line chart with title, axis, grid and dots',
        series: [
            {
                type: 'line',
                valueColumn: 'y',
                tension: 0,
                borderColor: 'rgb(22, 161, 145)',
            },
        ],
        xAxis: {
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
        yAxis: {
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
        title: {
            text: 'Line chart with title, axis, grid and dots',
        },
    },
});
