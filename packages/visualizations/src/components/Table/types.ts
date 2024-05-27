import type { DataFrame, Source } from '../types';
import type { DATA_FORMAT } from './constants';
import type { Pagination } from '../Pagination/types';
import type { Async } from '../../types';

type DataFormatKey = keyof typeof DATA_FORMAT;
export type DataFormat = typeof DATA_FORMAT[DataFormatKey];

export type TableData = DataFrame;

type BaseColumn = {
    key: string;
    title: string;
};

export type ShortTextColumn = BaseColumn & {
    dataFormat: typeof DATA_FORMAT.shortText;
    options?: {
        display?: (v: string) => string;
    };
};

export type LongTextColumn = BaseColumn & {
    dataFormat: typeof DATA_FORMAT.longText;
    options?: {
        display?: (v: string) => string;
    };
};

export type NumberColumn = BaseColumn & {
    dataFormat: typeof DATA_FORMAT.number;
    options?: {
        /** Function to update the data value. Takes an argument which is the result of Intl.NumberFormat. */
        display?: (v: string) => string;
        /**
         * Configuration options for formatting numbers using Intl.NumberFormat. See:
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options
         */
        intl?: Intl.NumberFormatOptions;
    };
};

export type DateColumn = BaseColumn & {
    dataFormat: typeof DATA_FORMAT.date;
    options?: {
        /** Function to update the data value. Takes an argument which is the result of Intl.DateTimeFormat. */
        display?: (v: string) => string;
        /**
         * Configuration options for formatting dates using Intl.DateTimeFormat. See:
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_options
         */
        intl?: Intl.DateTimeFormatOptions;
    };
};

export type BooleanColumn = BaseColumn & {
    dataFormat: typeof DATA_FORMAT.boolean;
    options?: {
        display?: (v: boolean) => string;
    };
};

/**
 * Render HTML \<a> tag if the record value is a valid URL.
 */
export type URLColumn = BaseColumn & {
    dataFormat: typeof DATA_FORMAT.url;
    options?: {
        display?: (v: string) => string;
        /** Default is `_blank` */
        target?: string;
    };
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
    /** To format date and number with the right locale. Default is from browser language */
    locale?: string;
    /**
     * Removes all the presentational styles.
     * Default is `false`.
     */
    unstyled?: boolean;
    pagination?: Pagination;
};

export type TableProps = {
    data: Async<TableData>;
    options: TableOptions;
};
