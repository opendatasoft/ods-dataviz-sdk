import { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { Meta } from '@storybook/react';
import { Props } from '../../../src';
import { defaultSource } from '../../utils';
import ChartTemplate from '../ChartTemplate';

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

export const LineTitleAxisGridDots = ChartTemplate.bind({});
const LineTitleAxisGridDotsArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
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
        axis: {
            x: {
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
            y: {
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
        title: {
            text: 'Line chart with title, axis, grid and dots',
        },
    },
};
LineTitleAxisGridDots.args = LineTitleAxisGridDotsArgs;

export const LineAxisGridDots = ChartTemplate.bind({});
const LineAxisGridDotsArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
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
        axis: {
            x: {
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
            y: {
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
    },
};
LineAxisGridDots.args = LineAxisGridDotsArgs;

export const LineTitleAxisGrid = ChartTemplate.bind({});
const LineTitleAxisGridArgs: Props<DataFrame, ChartOptions> = {
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
        series: [
            {
                type: 'line',
                valueColumn: 'y',
                tension: 0,
                borderColor: 'rgb(22, 161, 145)',
                pointRadius: 0,
            },
        ],
        axis: {
            x: {
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
            y: {
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
        title: {
            text: 'Line chart with title, axis and grid',
        },
    },
};
LineTitleAxisGrid.args = LineTitleAxisGridArgs;

export const LineTitleSubtitleGrid = ChartTemplate.bind({});
const LineTitleSubtitleGridArgs: Props<DataFrame, ChartOptions> = {
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
        series: [
            {
                type: 'line',
                valueColumn: 'y',
                tension: 0,
                borderColor: 'rgb(22, 161, 145)',
                pointRadius: 0,
            },
        ],
        axis: {
            x: {
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
            y: {
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
        },
        title: {
            text: 'Line chart with title, subtitle and grid',
        },
        subtitle: {
            text: 'Custom Chart Subtitle',
        },
    },
};
LineTitleSubtitleGrid.args = LineTitleSubtitleGridArgs;

export const LineTitleDataValues = ChartTemplate.bind({});
const LineTitleDataValuesArgs: Props<DataFrame, ChartOptions> = {
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
                    align(index: number) {
                        if (df[index].y >= 0) {
                            return 'end';
                        }
                        return 'start';
                    },
                    anchor(index: number) {
                        if (df[index].y >= 0) {
                            return 'end';
                        }
                        if (df[index].y === 0) {
                            return 'center';
                        }
                        return 'start';
                    },
                },
            },
        ],
        axis: {
            x: {
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
            text: 'Line chart with title and data values on axis',
        },
    },
};
LineTitleDataValues.args = LineTitleDataValuesArgs;

export const LineDataValuesOnly = ChartTemplate.bind({});
const LineDataValuesOnlyArgs: Props<DataFrame, ChartOptions> = {
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
        series: [
            {
                type: 'line',
                valueColumn: 'y',
                tension: 0,
                borderColor: 'rgb(22, 161, 145)',
                pointRadius: 0,
                dataLabels: {
                    display: true,
                    align(index) {
                        if (df[index].y >= 0) {
                            return 'end';
                        }
                        return 'start';
                    },
                    anchor(index) {
                        if (df[index].y >= 0) {
                            return 'end';
                        }
                        return 'start';
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
                    text: 'Date de plantation',
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
};
LineDataValuesOnly.args = LineDataValuesOnlyArgs;

export const LineTitleAxisGridDotsNegative = ChartTemplate.bind({});
const LineTitleAxisGridDotsNegativeArgs: Props<DataFrame, ChartOptions> = {
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
        series: [
            {
                type: 'line',
                valueColumn: 'y',
                tension: 0,
                borderColor: 'rgb(22, 161, 145)',
            },
        ],
        axis: {
            x: {
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
            y: {
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
        },
        title: {
            text: 'Line chart with title, axis, grid and dots',
        },
    },
};
LineTitleAxisGridDotsNegative.args = LineTitleAxisGridDotsNegativeArgs;
