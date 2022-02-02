export interface ChartOptions {
    /** Specify label column in DataFrame */
    labelColumn: string;
    /** Series to display */
    series: ChartSeries[];
    /** Chart aspect ratio */
    aspectRatio?: number;
    /** Chart padding */
    padding?: number;
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
    /** Configure subtitle */
    subtitle?: TitleConfiguration;
    /** Accessibility */
    ariaLabel: string;
    /** Link button to source */
    source?: Source;
    /** Error setter to send error from svelte to another framework */
    setOnError?: (error: string) => string;
}

export interface Source {
    href: string;
    label?: string;
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
    color?: Color;
    font?: FontConfiguration;
}

export interface RadialAxisConfiguration {
    beginAtZero?: boolean;
    ticks?: TicksConfiguration;
    gridLines?: GridLinesConfiguration;
}

export interface LegendLabelsConfiguration {
    text?: (legendIndex: number) => string;
}

export interface LegendConfiguration {
    display?: boolean;
    position?: 'top' | 'left' | 'bottom' | 'right';
    align?: 'start' | 'center' | 'end';
    labels?: LegendLabelsConfiguration;
}

export interface FontConfiguration {
    size?: number;
    weight?: string;
}

export interface TicksConfiguration {
    display?: boolean | 'single';
    color?: Color;
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
    backgroundColor?: Color;
    color?: Color;
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
    backgroundColor?: Color;
    borderColor?: Color;
    fill?: FillConfiguration;
    dataLabels?: DataLabelsConfiguration;
    tension?: number;
    pointRadius?: number;
    pointBackgroundColor?: Color;
    borderWidth?: number;
    borderDash?: number[];
    spanGaps?: boolean | number;
}

export interface Bar {
    type: 'bar';
    valueColumn: string;
    label?: string;
    backgroundColor?: Color;
    borderColor?: Color;
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
    backgroundColor?: Color;
    dataLabels?: DataLabelsConfiguration;
    indexAxis?: 'x' | 'y';
}

export interface Radar {
    type: 'radar';
    valueColumn: string;
    label?: string;
    backgroundColor?: Color;
    borderColor?: Color;
    dataLabels?: DataLabelsConfiguration;
    pointRadius?: number;
    pointBackgroundColor?: Color;
    borderWidth?: number;
}

export type FillMode = false | number | string | { value: number };

export interface FillConfiguration {
    mode?: FillMode;
    above?: Color;
    below?: Color;
}

export type Color = string | string[];

export type DataFrame = Record<string, any>[];

export interface MarkdownTextOptions {
    align?: 'left' | 'right' | 'center';
}

export interface KpiCardOptions {
    title?: string;
    description?: string;
    imgSrc?: string;
    color?: string;
    prefix?: string;
    suffix?: string;
    header?: string;
    footer?: string;
    /** Link button to source */
    source?: Source;
    /** Custom formatting function to display data value */
    formatCompact?: (value: number) => string;
    /** Custom formatting function for tooltips content */
    format?: (value: number) => string;
}
