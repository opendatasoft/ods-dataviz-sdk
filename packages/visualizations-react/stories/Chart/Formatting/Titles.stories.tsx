import { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { Meta } from '@storybook/react';
import { Props } from '../../../src';
import { defaultSource } from '../../utils';
import ChartTemplate from '../ChartTemplate';

const meta: Meta = {
    title: 'Chart/Formatting/Titles',
};

export default meta;

const df = [
    { x: 0, y: 240000000, z: 1 },
    { x: 1, y: -14000000, z: 2 },
    { x: 2, y: 200000000, z: 3 },
    { x: 3, y: 300000, z: 1 },
    { x: 4, y: 1800000.47, z: 1 },
    { x: 5, y: 778000, z: 1 },
];

export const LineLongTitle = ChartTemplate.bind({});
const LineLongTitleArgs: Props < DataFrame, ChartOptions > = {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        ariaLabel: 'Line chart with long title',
        series: [
            {
                type: 'line',
                valueColumn: 'y',
                tension: 0,
                borderColor: 'rgb(22, 161, 145)',
                pointRadius: 0,
                dataLabels: {
                    display: true,
                    align (index: number) {
                        if (df[index].y >= 0) {
                            return 'end';
                        }
                            return 'start';
                    },
                    anchor (index: number) {
                        if (df[index].y >= 0) {
                            return 'end';
                        }
                            return 'start';
                    },
                    color: 'rgb(22, 161, 145)',
                },
            },
        ],
        title: {
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla optio unde porro incidunt provident quis amet saepe voluptas explicabo maiores. Voluptatum itaque dolores consectetur assumenda repellendus accusamus laudantium vero deleniti.',
        },
        subtitle: {
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla optio unde porro incidunt provident quis amet saepe voluptas explicabo maiores. Voluptatum itaque dolores consectetur assumenda repellendus accusamus laudantium vero deleniti.',
        },
    },
};
LineLongTitle.args = LineLongTitleArgs;

export const LineNoTitle = ChartTemplate.bind({});
const LineNoTitleArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: df,
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        ariaLabel: 'Line chart without title',
        series: [
            {
                type: 'line',
                valueColumn: 'y',
                tension: 0,
                borderColor: 'rgb(22, 161, 145)',
                pointRadius: 0,
                dataLabels: {
                    display: true,
                    align (index: number) {
                        if (df[index].y >= 0) {
                            return 'end';
                        }
                            return 'start';
                    },
                    anchor (index: number) {
                        if (df[index].y >= 0) {
                            return 'end';
                        }
                            return 'start';
                    },
                    color: 'rgb(22, 161, 145)',
                },
            },
        ],
    },
};
LineNoTitle.args = LineNoTitleArgs;
