import type {
    BooleanFormatProps,
    DateFormatProps,
    GeoFormatProps,
    ShortTextFormatProps,
    LongTextFormatProps,
    NumberFormatProps,
    URLFormatProps,
} from 'components/Format/types';
import type { Async, DataFrame, Source } from 'types';
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
    sortLabels?: {
        asc: string;
        desc: string;
    };
    onClick?: () => void;
};

// Eliminate rawValue from props to match column options
type ColumnOptions<T> = Omit<T, 'rawValue'>;

type FormatPropsTypeMap = {
    [DATA_FORMAT.boolean]: ColumnOptions<BooleanFormatProps>;
    [DATA_FORMAT.date]: ColumnOptions<DateFormatProps>;
    [DATA_FORMAT.geo]: ColumnOptions<GeoFormatProps>;
    [DATA_FORMAT.shortText]: ColumnOptions<ShortTextFormatProps>;
    [DATA_FORMAT.longText]: ColumnOptions<LongTextFormatProps>;
    [DATA_FORMAT.number]: ColumnOptions<NumberFormatProps>;
    [DATA_FORMAT.url]: ColumnOptions<URLFormatProps>;
};

export type ColumnOfType<F extends DataFormat> = BaseColumn & {
    dataFormat: F;
    options?: FormatPropsTypeMap[F];
};

export type Column = ColumnOfType<DataFormat>;

export type BooleanColumn = ColumnOfType<typeof DATA_FORMAT.boolean>;
export type DateColumn = ColumnOfType<typeof DATA_FORMAT.date>;
export type GeoColumn = ColumnOfType<typeof DATA_FORMAT.geo>;
export type ShortTextColumn = ColumnOfType<typeof DATA_FORMAT.shortText>;
export type LongTextColumn = ColumnOfType<typeof DATA_FORMAT.longText>;
export type NumberColumn = ColumnOfType<typeof DATA_FORMAT.number>;
export type URLColumn = ColumnOfType<typeof DATA_FORMAT.url>;

export type HoverEvent<T extends HTMLElement> = (MouseEvent | FocusEvent) & {
    currentTarget: EventTarget & T;
};

export type RowProps = {
    onClick?: (record?: Record<string, unknown>, e?: HoverEvent<HTMLButtonElement>) => void;
    onMouseEnter?: (record?: Record<string, unknown>, e?: HoverEvent<HTMLTableRowElement>) => void;
    onMouseLeave?: (record?: Record<string, unknown>, e?: HoverEvent<HTMLTableRowElement>) => void;
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
};

export type TableProps = {
    data: Async<TableData>;
    options: TableOptions;
};
