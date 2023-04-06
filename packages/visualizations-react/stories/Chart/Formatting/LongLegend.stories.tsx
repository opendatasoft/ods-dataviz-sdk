import { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { Meta } from '@storybook/react';
import { Props } from '../../../src';
import { compactNumberFormatter, defaultSource } from '../../utils';
import ChartTemplate from '../ChartTemplate';

const meta: Meta = {
    title: 'Chart/Formatting/LongLegend',
};

export default meta;

const LineLongLegendArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: [
            { x: 0, y: 2400, z: 1021 },
            { x: 1, y: -140, z: 2424 },
            { x: 2, y: 2000, z: 3222 },
            { x: 3, y: 3, z: 1255 },
            { x: 4, y: 180.47, z: 1424 },
            { x: 5, y: 778, z: 12 },
        ],
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        series: [
            {
                type: 'line',
                label: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae optio placeat, explicabo neque fugit asperiores, illo qui necessitatibus doloribus nulla cum aperiam soluta obcaecati! Fuga nihil quisquam impedit voluptates. Ad.',
                valueColumn: 'y',
                tension: 0,
                borderColor: 'rgb(22, 161, 145)',
            },
            {
                type: 'line',
                label: '100000',
                valueColumn: 'z',
                tension: 0,
                borderColor: 'rgb(119, 73, 54)',
            },
        ],
        legend: {
            display: true,
        },
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
            text: 'Line chart with long legend',
        },
    },
};
export const LineLongLegend = ChartTemplate.bind({});
LineLongLegend.args = LineLongLegendArgs;

const pieDf = [
    {
        x: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae optio placeat, explicabo neque fugit asperiores, illo qui necessitatibus doloribus nulla cum aperiam soluta obcaecati! Fuga nihil quisquam impedit voluptates. Ad.',
        y: 100,
    },
    {
        x: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae optio placeat, explicabo neque fugit asperiores, illo qui necessitatibus doloribus nulla cum aperiam soluta obcaecati! Fuga nihil quisquam impedit voluptates. Ad.',
        y: 50,
    },
    {
        x: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae optio placeat, explicabo neque fugit asperiores, illo qui necessitatibus doloribus nulla cum aperiam soluta obcaecati! Fuga nihil quisquam impedit voluptates. Ad.',
        y: 20,
    },
    {
        x: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae optio placeat, explicabo neque fugit asperiores, illo qui necessitatibus doloribus nulla cum aperiam soluta obcaecati! Fuga nihil quisquam impedit voluptates. Ad.',
        y: 30,
    },
];
const PieLongLegendArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: pieDf,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        series: [
            {
                type: 'pie',
                valueColumn: 'y',
                backgroundColor: ['#CB4335', '#1F618D', '#F1C40F', 'rgb(39,174,96)'],
            },
        ],
        legend: {
            display: true,
            position: 'right',
            labels: {
                text(index) {
                    const xData = pieDf[index].x;
                    const yData = compactNumberFormatter.format(pieDf[index].y);
                    return `${xData} - ${yData}`;
                },
            },
        },
        title: {
            text: 'Pie chart with long legend and values',
        },
    },
};
export const PieLongLegend = ChartTemplate.bind({});
PieLongLegend.args = PieLongLegendArgs;

const RadarLongLegendArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: [
            { x: 'power', y: 100, z: 10 },
            { x: 'strength', y: 50, z: 45 },
            { x: 'magic', y: 80, z: 100 },
            { x: 'luck', y: 30, z: 100 },
            { x: 'persuasion', y: 70, z: 2 },
        ],
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        series: [
            {
                type: 'radar',
                valueColumn: 'y',
                label: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae optio placeat, explicabo neque fugit asperiores, illo qui necessitatibus doloribus nulla cum aperiam soluta obcaecati! Fuga nihil quisquam impedit voluptates. Ad.',
                backgroundColor: 'rgba(27,210,210,0.5)',
                borderColor: 'rgb(27,210,210)',
            },
            {
                type: 'radar',
                valueColumn: 'z',
                label: '1000000000000',
                backgroundColor: 'rgba(127,10,210,0.5)',
                borderColor: 'rgb(127,10,210)',
            },
        ],
        legend: {
            display: true,
        },
        title: {
            text: 'Radar chart with long legend',
        },
        axis: {
            r: {
                ticks: {
                    display: true,
                },
            },
        },
    },
};
export const RadarLongLegend = ChartTemplate.bind({});
RadarLongLegend.args = RadarLongLegendArgs;
