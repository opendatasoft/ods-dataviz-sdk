import type { Link, Async, Color } from 'types';

export interface KpiCardOptions {
    title?: string;
    description?: string;
    imgSrc?: string;
    color?: Color;
    prefix?: string;
    suffix?: string;
    header?: string;
    footer?: string;
    /** Links menu */
    links?: Link[];
    /** Custom formatting function to display data value */
    formatCompact?: (value: number) => string;
    /** Custom formatting function for tooltips content */
    format?: (value: number) => string;
}

export type KpiProps = {
    data: Async<number>;
    options: KpiCardOptions;
};
