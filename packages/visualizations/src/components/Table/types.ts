import type { DataFrame, Source } from '../types';
import type { DATA_FORMAT } from './constants';

type DataFormatKey = keyof typeof DATA_FORMAT;
export type DataFormat = typeof DATA_FORMAT[DataFormatKey];

export type TableData = DataFrame;

type BaseColumn = {
    key: string;
    title: string;
};

export type ShortTextColumn = BaseColumn & {
    dataFormat: typeof DATA_FORMAT.shortText;
};

export type LongTextColumn = BaseColumn & {
    dataFormat: typeof DATA_FORMAT.longText;
};

export type NumberColumn = BaseColumn & {
    dataFormat: typeof DATA_FORMAT.number;
    /**
     * Number formatting options
     *
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options
     */
    options?: Intl.NumberFormatOptions;
};

export type DateColumn = BaseColumn & {
    dataFormat: typeof DATA_FORMAT.date;
    /**
     * Date and time formatting options
     *
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_options
     */
    options?: Intl.DateTimeFormatOptions;
};

export type BooleanColumn = BaseColumn & {
    dataFormat: typeof DATA_FORMAT.boolean;
};

/**
 * Render HTML \<a> tag if the record value is a valid URL.
 */
export type URLColumn = BaseColumn & {
    dataFormat: typeof DATA_FORMAT.url;
    /** Default is `_blank` */
    target?: string;
};

export type Column =
    | ShortTextColumn
    | LongTextColumn
    | NumberColumn
    | DateColumn
    | BooleanColumn
    | URLColumn;

export type TableOptions = {
    columns: Column[];
    title?: string;
    subtitle?: string;
    description?: string;
    source?: Source;
    /**
     * Removes all the presentational styles.
     * Default is `false`.
     */
    unstyled?: boolean;
};
