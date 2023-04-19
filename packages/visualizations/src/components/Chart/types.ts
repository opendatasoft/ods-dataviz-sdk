import type { Color, Source } from '../types';

export interface ChartOptions {
    /** Specify label column in DataFrame */
    labelColumn: string;
    /** Series to display */
    series: ChartSeries[];
    /** Chart aspect ratio */
    aspectRatio?: number;
    /** Chart padding */
    padding?:
        | number
        | {
              top?: number;
              bottom?: number;
              left?: number;
              right?: number;
          };
    axis?: {
        /** Configure x axis */
        x?: CartesianAxisConfiguration;
        /** Configure default y axis */
        y?: CartesianAxisConfiguration;
        /** Configure default radial axis */
        r?: RadialAxisConfiguration;
        /** Configure axis assemblage */
        assemblage?: AssemblageAxisConfiguration;
    };
    /** Configure legend */
    legend?: LegendConfiguration;
    /** Configure title */
    title?: TitleConfiguration;
    /** Configure subtitle */
    subtitle?: TitleConfiguration;
    /** Configure tooltip */
    tooltip?: TooltipConfiguration;
    /** Description of the map for users that can't see it, intended for acessibility purposes */
    description?: string;
    /** Link button to source */
    source?: Source;
}

export interface GridLinesConfiguration {
    display?: boolean | 'single';
}

export type CartesianAxisConfiguration =
    | TimeCartesianAxisConfiguration
    | NumericCartesianAxisConfiguration
    | CategoryCartesianAxisConfiguration;

export interface BaseCartesianAxisConfiguration {
    display?: boolean;
    offset?: boolean;
    title?: AxisTitleConfiguration;
    gridLines?: GridLinesConfiguration;
    ticks?: TicksConfiguration;
}

export interface TimeCartesianAxisConfiguration extends BaseCartesianAxisConfiguration {
    type: 'time';
    timeUnit?:
        | 'year'
        | 'quarter'
        | 'month'
        | 'week'
        | 'day'
        | 'hour'
        | 'minute'
        | 'second'
        | 'millisecond';
}

export interface CategoryCartesianAxisConfiguration extends BaseCartesianAxisConfiguration {
    type?: 'category';
}

export interface NumericCartesianAxisConfiguration extends BaseCartesianAxisConfiguration {
    type: 'linear' | 'logarithmic';
}

export interface AxisTitleConfiguration {
    display?: boolean;
    align?: 'start' | 'center' | 'end';
    text?: string;
    color?: Color | Color[];
    font?: FontConfiguration;
}

export interface RadialAxisConfiguration {
    beginAtZero?: boolean;
    ticks?: TicksConfiguration;
    gridLines?: GridLinesConfiguration;
}

export interface AssemblageAxisConfiguration {
    stacked?: boolean;
    percentaged?: boolean;
}

export interface LegendLabelsConfiguration {
    text?: (legendIndex: number) => string;
}

export interface LegendConfiguration {
    display?: boolean;
    position?: 'top' | 'left' | 'bottom' | 'right';
    align?: 'start' | 'center' | 'end';
    labels?: LegendLabelsConfiguration;
    boxStyle?: 'rect' | 'line' | 'dash';
}

export interface TooltipConfiguration {
    /** Display tooltip */
    display?: boolean;
    /** Custom formatting function for tooltips content */
    format?: (value: number) => string;
}
export interface FontConfiguration {
    size?: number;
    weight?: string;
}

export interface TicksConfiguration {
    display?: boolean | 'single';
    color?: Color | Color[];
    format?: (value: number) => string;
}

export interface TitleConfiguration {
    display?: boolean;
    text?: string;
}

export interface DataLabelsConfiguration {
    display?: boolean | 'auto';
    align?: (
        index: number
    ) => 'bottom' | 'center' | 'end' | 'left' | 'right' | 'start' | 'top' | number;
    anchor?: (index: number) => 'center' | 'end' | 'start';
    backgroundColor?: Color | Color[];
    color?: Color | Color[];
    borderRadius?: number;
    offset?: number;
    text?: (index: number) => string | string[];
    padding?: number;
}

export type ChartSeries = Line | Bar | Pie | Radar;

export interface Line {
    type: 'line';
    valueColumn: string;
    label?: string;
    backgroundColor?: Color | Color[];
    borderColor?: Color | Color[];
    fill?: FillConfiguration;
    dataLabels?: DataLabelsConfiguration;
    tension?: number;
    pointRadius?: number;
    pointBackgroundColor?: Color | Color[];
    borderWidth?: number;
    borderDash?: number[];
    spanGaps?: boolean | number;
}

export interface Bar {
    type: 'bar';
    valueColumn: string;
    label?: string;
    backgroundColor?: Color | Color[];
    borderColor?: Color | Color[];
    borderWidth?: number;
    borderRadius?: number;
    indexAxis?: 'x' | 'y';
    categoryPercentage?: number;
    barPercentage?: number;
    dataLabels?: DataLabelsConfiguration;
}

export interface Pie {
    type: 'pie';
    valueColumn: string;
    label?: string;
    backgroundColor?: Color | Color[];
    dataLabels?: DataLabelsConfiguration;
    indexAxis?: 'x' | 'y';
}

export interface Radar {
    type: 'radar';
    valueColumn: string;
    label?: string;
    backgroundColor?: Color | Color[];
    borderColor?: Color | Color[];
    dataLabels?: DataLabelsConfiguration;
    pointRadius?: number;
    pointBackgroundColor?: Color | Color[];
    borderWidth?: number;
}

export type FillMode = false | number | string | { value: number };

export interface FillConfiguration {
    mode?: FillMode;
    above?: Color | Color[];
    below?: Color | Color[];
}
