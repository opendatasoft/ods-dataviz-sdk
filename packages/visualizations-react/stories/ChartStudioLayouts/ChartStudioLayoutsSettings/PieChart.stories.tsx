import { styleForLayouts } from '../../utils';

export const PieTitleSectorsName = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 'Alpha', y: 100 },
            { x: 'Beta', y: 50 },
            { x: 'Gamma', y: 20 },
            { x: 'Delta', y: 30 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Pie chart with title and sectors name',
        maintainAspectRatio: true,
        aspectRatio: 2,
        series: [
            {
                type: 'pie',
                valueColumn: 'y',
                backgroundColor: [
                    'rgba(250,50,50,0.5)',
                    'rgba(50,250,50,0.5)',
                    'rgba(50,50,250,0.5)',
                    'rgba(250,50,250,0.5)',
                ],
                dataLabels: {
                    display: true,
                    anchor: 'end',
                    align: 'end',
                    formatter : function(value, context) {
                        return context.chart.data.labels[context.dataIndex];
                      }
                },
            },
        ],
        tooltips: {
            display: true,
        },
        title: {
            text: 'Pie chart with title and sectors name',
            align: 'center',
        },
    },
};

export const PieTitleSectorsNameValue = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 'Alpha', y: 100 },
            { x: 'Beta', y: 50 },
            { x: 'Gamma', y: 20 },
            { x: 'Delta', y: 30 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Pie chart with title and sectors name with values',
        maintainAspectRatio: true,
        aspectRatio: 2,
        series: [
            {
                type: 'pie',
                valueColumn: 'y',
                backgroundColor: [
                    'rgba(250,50,50,0.5)',
                    'rgba(50,250,50,0.5)',
                    'rgba(50,50,250,0.5)',
                    'rgba(250,50,250,0.5)',
                ],
                dataLabels: {
                    display: true,
                    anchor: 'end',
                    align: 'end',
                    formatter : function(value, context) {
                        return [`${context.chart.data.labels[context.dataIndex]}`, `${value}`];
                      }
                    // labels : {
                    //     index: {
                    //         align: 'end',
                    //         anchor: 'top',
                    //         formatter : function(value, context) {
                    //                 return context.chart.data.labels[context.dataIndex];
                    //               },
                    //         padding: 4,
                    //     },
                    //     name: {
                    //         align: 'end',
                    //         anchor: 'bottom',
                    //         formatter : function(value, context) {
                    //                 return value;
                    //               },
                    //         padding: 14,
                    //     },
                    // }
                },
            },
        ],
        tooltips: {
            display: true,
        },
        title: {
            text: 'Pie chart with title and sectors name with values',
            align: 'center',
        },
    },
};

export const PieTitleLegend = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 'Alpha', y: 100 },
            { x: 'Beta', y: 50 },
            { x: 'Gamma', y: 20 },
            { x: 'Delta', y: 30 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Pie chart with title and legend',
        maintainAspectRatio: true,
        aspectRatio: 2,
        series: [
            {
                type: 'pie',
                valueColumn: 'y',
                backgroundColor: [
                    'rgba(250,50,50,0.5)',
                    'rgba(50,250,50,0.5)',
                    'rgba(50,50,250,0.5)',
                    'rgba(250,50,250,0.5)',
                ],
            },
        ],
        legend: {
            display: true,
            position: 'right',
        },
        tooltips: {
            display: true,
        },
        title: {
            text: 'Pie chart with title and legend',
            align: 'center',
        },
    },
};

export const PieTitleLegendValues = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 'Alpha', y: 100 },
            { x: 'Beta', y: 50 },
            { x: 'Gamma', y: 20 },
            { x: 'Delta', y: 30 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Pie chart with title and legend with values',
        maintainAspectRatio: true,
        aspectRatio: 2,
        series: [
            {
                type: 'pie',
                valueColumn: 'y',
                backgroundColor: [
                    'rgba(250,50,50,0.5)',
                    'rgba(50,250,50,0.5)',
                    'rgba(50,50,250,0.5)',
                    'rgba(250,50,250,0.5)',
                ],
            },
        ],
        legend: {
            display: true,
            position: 'right',
            labels : {
                filter: function(legendItem, data) {
                    legendItem.text = `${legendItem.text} - ${data.datasets[0].data[legendItem.index]}`
                    return true
               }
            }
        },
        tooltips: {
            display: true,
        },
        title: {
            text: 'Pie chart with title and legend with values',
            align: 'center',
        },
    },
};