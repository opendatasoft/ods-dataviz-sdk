import { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { Meta } from '@storybook/react';
import { Props } from '../../../src';
import { defaultSource } from '../../utils';
import { Sample } from '../Chart.stories';

const meta: Meta = {
    title: 'Chart/Formatting/LongTicks',
};

export default meta;

const LongTicksFixedArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: [
            {
                x: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis at ad animi officiis reprehenderit repudiandae ratione, fugit recusandae provident illum ducimus, enim beatae magnam doloremque ut id voluptatibus tempora asperiores',
                y: 2400000,
                z: 101442,
            },
            {
                x: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis at ad animi officiis reprehenderit repudiandae ratione, fugit recusandae provident illum ducimus, enim beatae magnam doloremque ut id voluptatibus tempora asperiores',
                y: -1400,
                z: 200,
            },
            {
                x: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis at ad animi officiis reprehenderit repudiandae ratione, fugit recusandae provident illum ducimus, enim beatae magnam doloremque ut id voluptatibus tempora asperiores',
                y: 200000,
                z: 347757,
            },
            {
                x: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis at ad animi officiis reprehenderit repudiandae ratione, fugit recusandae provident illum ducimus, enim beatae magnam doloremque ut id voluptatibus tempora asperiores',
                y: 300,
                z: 100000,
            },
            {
                x: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis at ad animi officiis reprehenderit repudiandae ratione, fugit recusandae provident illum ducimus, enim beatae magnam doloremque ut id voluptatibus tempora asperiores',
                y: 180.47,
                z: 1414,
            },
            {
                x: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis at ad animi officiis reprehenderit repudiandae ratione, fugit recusandae provident illum ducimus, enim beatae magnam doloremque ut id voluptatibus tempora asperiores',
                y: 77800,
                z: 12442,
            },
            {
                x: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis at ad animi officiis reprehenderit repudiandae ratione, fugit recusandae provident illum ducimus, enim beatae magnam doloremque ut id voluptatibus tempora asperiores',
                y: 778,
                z: 142244,
            },
            {
                x: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis at ad animi officiis reprehenderit repudiandae ratione, fugit recusandae provident illum ducimus, enim beatae magnam doloremque ut id voluptatibus tempora asperiores',
                y: 77800,
                z: 1242,
            },
            {
                x: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis at ad animi officiis reprehenderit repudiandae ratione, fugit recusandae provident illum ducimus, enim beatae magnam doloremque ut id voluptatibus tempora asperiores',
                y: 2400000,
                z: 1242,
            },
            {
                x: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis at ad animi officiis reprehenderit repudiandae ratione, fugit recusandae provident illum ducimus, enim beatae magnam doloremque ut id voluptatibus tempora asperiores',
                y: 77800,
                z: 1424242,
            },
            {
                x: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis at ad animi officiis reprehenderit repudiandae ratione, fugit recusandae provident illum ducimus, enim beatae magnam doloremque ut id voluptatibus tempora asperiores',
                y: 77800,
                z: 1,
            },
        ],
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        ariaLabel: 'Line chart with Long Ticks Unfixed',
        padding: 6,
        series: [
            {
                type: 'line',
                valueColumn: 'y',
                tension: 0,
                borderColor: 'rgb(22, 161, 145)',
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
            type: 'category',
            title: {
                display: true,
                text: 'Unités de production',
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
                text: 'CA des ventes en €',
                align: 'center',
            },
            gridLines: {
                display: true,
            },
        },
        title: {
            text: 'Line chart with Long Ticks Fixed',
        },
    },
};
export const LongTicksFixed = Sample.bind({});
LongTicksFixed.args = LongTicksFixedArgs;

const BarLongTicksArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: [
            {
                x: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, aut voluptates odit fugit voluptatem impedit assumenda ad itaque repellat reprehenderit consectetur odio cupiditate recusandae, dolorum minus illum aliquam delectus quibusdam?',
                y: 1000000000,
            },
            {
                x: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, aut voluptates odit fugit voluptatem impedit assumenda ad itaque repellat reprehenderit consectetur odio cupiditate recusandae, dolorum minus illum aliquam delectus quibusdam?',
                y: -5000,
            },
            {
                x: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, aut voluptates odit fugit voluptatem impedit assumenda ad itaque repellat reprehenderit consectetur odio cupiditate recusandae, dolorum minus illum aliquam delectus quibusdam?',
                y: 200000000,
            },
            {
                x: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, aut voluptates odit fugit voluptatem impedit assumenda ad itaque repellat reprehenderit consectetur odio cupiditate recusandae, dolorum minus illum aliquam delectus quibusdam?',
                y: 30000,
            },
        ],
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        ariaLabel: 'Bar chart with title, axis and grid',
        series: [
            {
                type: 'bar',
                valueColumn: 'y',
                indexAxis: 'y',
                backgroundColor: [
                    'rgba(250,50,50,0.5)',
                    'rgba(50,250,50,0.5)',
                    'rgba(50,50,250,0.5)',
                    'rgba(250,50,250,0.5)',
                ],
                borderColor: [
                    'rgba(250,50,50)',
                    'rgba(50,250,50)',
                    'rgba(50,50,250)',
                    'rgba(250,50,250)',
                ],
                borderWidth: 2,
            },
        ],
        xAxis: {
            display: true,
            type: 'linear',
            offset: false,
            title: {
                display: true,
                text: 'x',
                align: 'center',
            },
            gridLines: {
                display: true,
            },
        },
        yAxis: {
            display: true,
            type: 'category',
            title: {
                display: true,
                text: 'y',
                align: 'center',
            },
            gridLines: {
                display: false,
            },
        },
        title: {
            text: 'Bar chart with long ticks',
        },
    },
};
export const BarLongTicks = Sample.bind({});
BarLongTicks.args = BarLongTicksArgs;

const ColumnLongTicksArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: [
            {
                x: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, error sequi placeat quis dolores id mollitia vel sed velit, voluptas, nisi sit? Doloremque nulla ullam id recusandae ex voluptatibus sit?',
                y: 100000000,
            },
            {
                x: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, error sequi placeat quis dolores id mollitia vel sed velit, voluptas, nisi sit? Doloremque nulla ullam id recusandae ex voluptatibus sit?',
                y: 500000000,
            },
            {
                x: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, error sequi placeat quis dolores id mollitia vel sed velit, voluptas, nisi sit? Doloremque nulla ullam id recusandae ex voluptatibus sit?',
                y: 200000000,
            },
            {
                x: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, error sequi placeat quis dolores id mollitia vel sed velit, voluptas, nisi sit? Doloremque nulla ullam id recusandae ex voluptatibus sit?',
                y: -300000000,
            },
            {
                x: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, error sequi placeat quis dolores id mollitia vel sed velit, voluptas, nisi sit? Doloremque nulla ullam id recusandae ex voluptatibus sit?',
                y: 40000000,
            },
            {
                x: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, error sequi placeat quis dolores id mollitia vel sed velit, voluptas, nisi sit? Doloremque nulla ullam id recusandae ex voluptatibus sit?',
                y: -5000000,
            },
        ],
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        ariaLabel: 'Column chart with title, axis and grid',
        series: [
            {
                type: 'bar',
                valueColumn: 'y',
                backgroundColor: [
                    'rgba(250,50,50,0.5)',
                    'rgba(50,250,50,0.5)',
                    'rgba(50,50,250,0.5)',
                    'rgba(250,50,250,0.5)',
                ],
                borderColor: [
                    'rgba(250,50,50)',
                    'rgba(50,250,50)',
                    'rgba(50,50,250)',
                    'rgba(250,50,250)',
                ],
                borderWidth: 2,
            },
        ],
        xAxis: {
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
        yAxis: {
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
        title: {
            text: 'Column chart with long ticks',
        },
    },
};
export const ColumnLongTicks = Sample.bind({});
ColumnLongTicks.args = ColumnLongTicksArgs;

const RadarLongTicksArgs: Props<DataFrame, ChartOptions> = {
    data: {
        loading: false,
        value: [
            { x: 1000000000, y: 1000000000, z: 10 },
            { x: 'strengthrgddrgdgdgdgdgdgdgdrgdgdrgdgdgdgdgddgdgdgdgdgdgd', y: 500000000, z: 45 },
            { x: 'magic', y: 800000000, z: 100 },
            { x: 'luck', y: 30000000, z: 100 },
            { x: 'persuasion', y: 70000000, z: 2 },
        ],
    },
    options: {
        labelColumn: 'x',
        source: defaultSource,
        ariaLabel: 'Radar chart',
        series: [
            {
                type: 'radar',
                valueColumn: 'y',
                label: 'User 1',
                backgroundColor: 'rgba(27,210,210,0.5)',
                borderColor: 'rgb(27,210,210)',
            },
            {
                type: 'radar',
                valueColumn: 'z',
                label: 'User 2',
                backgroundColor: 'rgba(127,10,210,0.5)',
                borderColor: 'rgb(127,10,210)',
            },
        ],
        legend: {
            display: true,
        },
        title: {
            text: 'Radar chart with long ticks',
        },
        rAxis: {
            ticks: {
                display: true,
            },
        },
    },
};
export const RadarLongTicks = Sample.bind({});
RadarLongTicks.args = RadarLongTicksArgs;
