import { ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { Props } from '../../../src';
import { COLORS, styleForLayouts } from '../../utils';

export const ColumnTitleAxisGrid: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 0, y: 100 },
            { x: 1, y: 50 },
            { x: 2, y: 20 },
            { x: 3, y: -30 },
            { x: 4, y: 40 },
            { x: 5, y: -50 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Column chart with title, axis and grid',
        padding: 6,
        series: [
            {
                type: 'bar',
                valueColumn: 'y',
            },
        ],
        xAxis: {
            display: true,
            type: 'category',
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
                color: function (ticksValue) {
                    if (ticksValue === 0) {
                        return 'rgba(0, 0, 0, 0.4)';
                    } else {
                        return 'rgba(0, 0, 0, 0.1)';
                    }
                },
            },
        },
        title: {
            text: 'Column chart with title, axis and grid',
            align: 'start',
        },
    },
};

export const ColumnAxisGrid: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 0, y: 100 },
            { x: 1, y: 50 },
            { x: 2, y: 20 },
            { x: 3, y: -30 },
            { x: 4, y: 40 },
            { x: 5, y: -50 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Column chart with axis and grid',
        padding: 6,
        series: [
            {
                type: 'bar',
                valueColumn: 'y',
            },
        ],
        xAxis: {
            display: true,
            type: 'category',
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
                color: function (ticksValue) {
                    if (ticksValue === 0) {
                        return 'rgba(0, 0, 0, 0.4)';
                    } else {
                        return 'rgba(0, 0, 0, 0.1)';
                    }
                },
            },
        },
    },
};

export const ColumnTitleSubtitleDataValues: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 0, y: 100 },
            { x: 1, y: 50 },
            { x: 2, y: 20 },
            { x: 3, y: -30 },
            { x: 4, y: 40 },
            { x: 5, y: -50 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Column chart with title, axis and grid',
        padding: 6,
        series: [
            {
                type: 'bar',
                valueColumn: 'y',
                dataLabels: {
                    display: true,
                    align: function (index, { dataFrame }) {
                        if (dataFrame[index].y > 0) {
                            return 'end';
                        } else if (dataFrame[index].y === 0) {
                            return 'center';
                        } else {
                            return 'start';
                        }
                    },
                    anchor: function (index, { dataFrame }) {
                        if (dataFrame[index].y > 0) {
                            return 'end';
                        } else if (dataFrame[index].y === 0) {
                            return 'center';
                        } else {
                            return 'start';
                        }
                    },
                },
            },
        ],
        xAxis: {
            display: false,
            type: 'category',
            title: {
                display: false,
                text: 'x',
                align: 'center',
            },
            gridLines: {
                display: false,
            },
            ticks: {
                display: false,
            },
        },
        yAxis: {
            display: true,
            title: {
                display: false,
                text: 'y',
                align: 'center',
            },
            gridLines: {
                display: true,
                drawBorder: false,
                color: function (ticksValue) {
                    if (ticksValue === 0) {
                        return 'rgba(0, 0, 0, 0.4)';
                    } else {
                        return 'transparent';
                    }
                },
            },
            ticks: {
                display: false,
            },
        },
        title: {
            text: 'Column chart with title, axis and grid',
            align: 'start',
        },
        subtitle: {
            display: true,
            text: 'Custom Chart Subtitle',
            align: 'start',
        },
    },
};

export const ColumnDataValues: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 0, y: 100 },
            { x: 1, y: 50 },
            { x: 2, y: 20 },
            { x: 3, y: -30 },
            { x: 4, y: 40 },
            { x: 5, y: -50 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Column chart with title, axis and grid',
        padding: 6,
        series: [
            {
                type: 'bar',
                valueColumn: 'y',
                dataLabels: {
                    display: true,
                    align: function (index, { dataFrame }) {
                        if (dataFrame[index].y > 0) {
                            return 'end';
                        } else if (dataFrame[index].y === 0) {
                            return 'center';
                        } else {
                            return 'start';
                        }
                    },
                    anchor: function (index, { dataFrame }) {
                        if (dataFrame[index].y > 0) {
                            return 'end';
                        } else if (dataFrame[index].y === 0) {
                            return 'center';
                        } else {
                            return 'start';
                        }
                    },
                },
            },
        ],
        xAxis: {
            display: false,
            type: 'category',
            title: {
                display: false,
                text: 'x',
                align: 'center',
            },
            gridLines: {
                display: false,
            },
            ticks: {
                display: false,
            },
        },
        yAxis: {
            display: true,
            title: {
                display: false,
                text: 'y',
                align: 'center',
            },
            gridLines: {
                display: true,
                drawBorder: false,
                color: function (ticksValue) {
                    if (ticksValue === 0) {
                        return 'rgba(0, 0, 0, 0.4)';
                    } else {
                        return 'transparent';
                    }
                },
            },
            ticks: {
                display: false,
            },
        },
    },
};

export const ColumnAxisDataValues: Props<DataFrame, ChartOptions> = {
    style: styleForLayouts,
    data: {
        loading: false,
        value: [
            { x: 0, y: 100 },
            { x: 1, y: 50 },
            { x: 2, y: 20 },
            { x: 3, y: -30 },
            { x: 4, y: 40 },
            { x: 5, y: -50 },
        ],
    },
    options: {
        labelColumn: 'x',
        ariaLabel: 'Column chart with title, axis and grid',
        padding: 6,
        series: [
            {
                type: 'bar',
                valueColumn: 'y',
                dataLabels: {
                    display: true,
                    align: function (index, { dataFrame }) {
                        if (dataFrame[index].y > 0) {
                            return 'end';
                        } else if (dataFrame[index].y === 0) {
                            return 'center';
                        } else {
                            return 'start';
                        }
                    },
                    anchor: function (index, { dataFrame }) {
                        if (dataFrame[index].y > 0) {
                            return 'end';
                        } else if (dataFrame[index].y === 0) {
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
            type: 'category',
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
                drawBorder: false,
                color: function (ticksValue) {
                    if (ticksValue === 0) {
                        return 'rgba(0, 0, 0, 0.4)';
                    } else {
                        return 'transparent';
                    }
                }
            },
            ticks: {
                display: false,
            }
        },
    },
};
