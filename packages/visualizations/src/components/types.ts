export interface ChartOptions {
    /** Specify label column in DataFrame */
    labelColumn: string;
    /** Series to display */
    series: ChartSeries[];
    /** Chart aspect ratio */
    aspectRatio?: number;
    /** Maintain aspect ratio when the canvas is resized */
    maintainAspectRatio?: boolean;
    /** Configure xAxis */
    xAxis?: CartesianAxisConfiguration;
    /** Configure default yAxis */
    yAxis?: CartesianAxisConfiguration;
    /** Configure default radial axis */
    rAxis?: RadialAxisConfiguration;
    /** Configure legend */
    legend?: LegendConfiguration;
    /** Configure title */
    title?: TitleConfiguration;
    /* Configure tooltips */
    tooltips?: TooltipsConfiguration;
    /** Accessibility */
    ariaLabel: string;
}

interface CartesianAxisConfiguration {
    type?: 'linear' | 'logarithmic' | 'category';
    display?: boolean;
    label?: AxisLabelConfiguration;
    gridLines?: GridLinesConfiguration;
}

interface AxisLabelConfiguration {
    display?: boolean;
    align?: 'start' | 'center' | 'end';
    value?: string;
}

interface RadialAxisConfiguration {
    beginAtZero?: boolean;
}

interface GridLinesConfiguration {
    display?: boolean;
}

interface LegendConfiguration {
    display?: boolean;
    position?: 'top' | 'left' | 'bottom' | 'right';
    align?: 'start' | 'center' | 'end';
}

interface TitleConfiguration {
    display?: boolean;
    position?: 'top' | 'left' | 'bottom' | 'right';
    align?: 'start' | 'center' | 'end';
    text?: string | string[];
}

interface TooltipsConfiguration {
    display?: boolean;
}

export type ChartSeries = Line | Bar | Pie | Radar;

export interface Line {
    type: 'line';
    valueColumn: string;
    label?: string;
    backgroundColor?: Color;
    borderColor?: Color;
    fill?: FillConfiguration;
}

export interface Bar {
    type: 'bar';
    valueColumn: string;
    label?: string;
    backgroundColor?: Color;
    indexAxis?: 'x' | 'y';
    categoryPercentage?: number;
    barPercentage?: number;
}

export interface Pie {
    type: 'pie';
    valueColumn: string;
    backgroundColor?: Color;
}

export interface Radar {
    type: 'radar';
    valueColumn: string;
    label?: string;
    backgroundColor?: Color;
    borderColor?: Color;
}

export type FillMode = false | number | string | { value: number };

export interface FillConfiguration {
    mode?: FillMode;
    above?: Color;
    below?: Color;
}

export type Color = string | string[];

export type DataFrame = Record<string, any>[];
