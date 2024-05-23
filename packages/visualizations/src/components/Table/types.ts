import type { DataFrame, Source } from '../types';
import type { DATA_FORMAT } from './constants';
import type { Pagination } from '../Pagination/types';
import type { Async } from '../../types';

type DataFormatKey = keyof typeof DATA_FORMAT;
export type DataFormat = typeof DATA_FORMAT[DataFormatKey];

export type TableData = DataFrame;

export const ColumnSort = {
    asc: 'ASC',
    desc: 'DESC',
} as const;
export type ColumnSortValues = typeof ColumnSort[keyof typeof ColumnSort];

type BaseColumn = {
    key: string;
    title: string;
    /** Wtether the column is sorted ascendimg, descending or not */
    sorted?: ColumnSortValues;
    onClick?: () => void;
};

export type ShortTextColumn = BaseColumn & {
    dataFormat: typeof DATA_FORMAT.shortText;
    options?: never;
};

export type LongTextColumn = BaseColumn & {
    dataFormat: typeof DATA_FORMAT.longText;
    options?: never;
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
    options?: never;
};

/**
 * Render HTML \<a> tag if the record value is a valid URL.
 */
export type URLColumn = BaseColumn & {
    dataFormat: typeof DATA_FORMAT.url;
    options?: {
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
