import type { Async, DataFrame, Source } from 'types';
import type {
    BooleanFormatProps,
    DateFormatProps,
    GeoFormatProps,
    TextFormatProps,
    NumberFormatProps,
    URLFormatProps,
    ImageFormatProps,
} from '../Format/types';
import type { Pagination } from '../Pagination/types';
import type { DATA_FORMAT } from './constants';

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
    sticky?: boolean;
    sortLabels?: {
        asc: string;
        desc: string;
    };
    onClick?: () => void;
};

export type ValueOrAccessor<T, R> = T | ((r: R) => T);

export type FormatPropsTypeMap = {
    [DATA_FORMAT.boolean]: BooleanFormatProps;
    [DATA_FORMAT.date]: DateFormatProps;
    [DATA_FORMAT.geo]: GeoFormatProps;
    [DATA_FORMAT.shortText]: TextFormatProps;
    [DATA_FORMAT.longText]: TextFormatProps;
    [DATA_FORMAT.number]: NumberFormatProps;
    [DATA_FORMAT.url]: URLFormatProps;
    [DATA_FORMAT.image]: ImageFormatProps;
};

/** Columns have to be typed with the record type if using an accessor.
 * They can also be used without a record, nor accessor
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ColumnOfType<F extends DataFormat, R = any> = BaseColumn & {
    dataFormat: F;
    accessor?: (r: R) => FormatPropsTypeMap[F]['value'];
    options?: ValueOrAccessor<Omit<FormatPropsTypeMap[F], 'value'>, R>;
};

export type BooleanColumn<R> = ColumnOfType<typeof DATA_FORMAT.boolean, R>;
export type DateColumn<R> = ColumnOfType<typeof DATA_FORMAT.date, R>;
export type GeoColumn<R> = ColumnOfType<typeof DATA_FORMAT.geo, R>;
export type ShortTextColumn<R> = ColumnOfType<typeof DATA_FORMAT.shortText, R>;
export type LongTextColumn<R> = ColumnOfType<typeof DATA_FORMAT.longText, R>;
export type NumberColumn<R> = ColumnOfType<typeof DATA_FORMAT.number, R>;
export type URLColumn<R> = ColumnOfType<typeof DATA_FORMAT.url, R>;
export type ImageColumn<R> = ColumnOfType<typeof DATA_FORMAT.image, R>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Column<R = any> =
    | BooleanColumn<R>
    | DateColumn<R>
    | GeoColumn<R>
    | ShortTextColumn<R>
    | LongTextColumn<R>
    | NumberColumn<R>
    | URLColumn<R>
    | ImageColumn<R>;

export type HoverEvent<T extends HTMLElement> = (MouseEvent | FocusEvent) & {
    currentTarget: EventTarget & T;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RowProps<R = any> = {
    onClick?: (record?: R, e?: HoverEvent<HTMLButtonElement>) => void;
    onMouseEnter?: (record?: R, e?: HoverEvent<HTMLTableRowElement>) => void;
    onMouseLeave?: (record?: R, e?: HoverEvent<HTMLTableRowElement>) => void;
    actionAriaLabel?: string;
};

export type TableOptions = {
    columns: Column[];
    rowProps?: RowProps;
    title?: string;
    subtitle?: string;
    description?: string;
    emptyStateLabel?: string;
    source?: Source;
    /** To format date and number with the right locale. Default is from browser language */
    locale?: string;
    /**
     * Removes all the presentational styles.
     * Default is `false`.
     */
    unstyled?: boolean;
    pagination?: Pagination;
    debugWarnings?: boolean;
};

export type TableProps = {
    data: Async<TableData>;
    options: TableOptions;
};
