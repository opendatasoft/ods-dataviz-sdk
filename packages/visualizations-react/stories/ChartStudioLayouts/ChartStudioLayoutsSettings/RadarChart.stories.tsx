import { styleForLayouts } from '../../utils';

export const RadarTitleScale = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 'speed', y: 100, z: 10 },
            { x: 'strength', y: 50, z: 45 },
            { x: 'magic', y: 80, z: 100 },
            { x: 'luck', y: 30, z: 100 },
            { x: 'persuasion', y: 70, z: 2 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Radar chart',
        maintainAspectRatio: true,
        aspectRatio: 2,
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
        tooltips: {
            display: true,
        },
        title: {
            text: 'Radar chart with title and scale',
            align: 'center',
        },
    },
};

export const RadarTitle = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 'speed', y: 100, z: 10 },
            { x: 'strength', y: 50, z: 45 },
            { x: 'magic', y: 80, z: 100 },
            { x: 'luck', y: 30, z: 100 },
            { x: 'persuasion', y: 70, z: 2 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Radar chart',
        maintainAspectRatio: true,
        aspectRatio: 2,
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
        tooltips: {
            display: true,
        },
        title: {
            text: 'Radar chart with title',
            align: 'center',
        },
        rAxis: {
            ticks: { display: false },
        },
    },
};

export const RadarTitleDataValues = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 'speed', y: 100, z: 10 },
            { x: 'strength', y: 50, z: 45 },
            { x: 'magic', y: 80, z: 100 },
            { x: 'luck', y: 30, z: 100 },
            { x: 'persuasion', y: 70, z: 2 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Radar chart',
        maintainAspectRatio: true,
        aspectRatio: 2,
        series: [
            {
                type: 'radar',
                valueColumn: 'y',
                label: 'User 1',
                backgroundColor: 'rgba(27,210,210,0.5)',
                borderColor: 'rgb(27,210,210)',
                dataLabels: {
                    display: true,
                    backgroundColor: function (context) {
                        return context.dataset.borderColor;
                    },
                    color: 'white',
                    formatter: Math.round,
                    padding: 8,
                    borderRadius: 4,
                },
            },
            {
                type: 'radar',
                valueColumn: 'z',
                label: 'User 2',
                backgroundColor: 'rgba(127,10,210,0.5)',
                borderColor: 'rgb(127,10,210)',
                dataLabels: {
                    display: true,
                    color: function (context) {
                        return context.dataset.borderColor;
                    },
                    formatter: Math.round,
                    padding: 8,
                    align: 'end',
                    anchor: 'end',
                },
            },
        ],
        legend: {
            display: true,
        },
        tooltips: {
            display: true,
        },
        title: {
            text: 'Radar chart with title and data values',
            align: 'center',
        },
        rAxis: {
            ticks: { display: false },
        },
    },
};
