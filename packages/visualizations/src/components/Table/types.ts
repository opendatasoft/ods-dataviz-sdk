import type { Async, DataFrame, Source } from 'types';
// eslint-disable-next-line import/no-extraneous-dependencies
import type { Readable, Writable } from 'svelte/store';
import type {
    BooleanFormatProps,
    DateFormatProps,
    GeoFormatProps,
    TextFormatProps,
    NumberFormatProps,
    URLFormatProps,
} from '../Format/types';
import type { Pagination } from '../Pagination/types';
import type { DATA_FORMAT, HOVER_COLUMN_KEY } from './constants';

export type GenericRecord = Record<string, unknown>; // avoid {} with no key from object;

type DataFormatKey = keyof typeof DATA_FORMAT;
export type DataFormat = typeof DATA_FORMAT[DataFormatKey];

export type TableData = DataFrame;

export const ColumnSort = {
    asc: 'ASC',
    desc: 'DESC',
} as const;
export type ColumnSortValues = typeof ColumnSort[keyof typeof ColumnSort];

export type BaseColumn = {
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

export type ValueOrAccessor<T, R = GenericRecord> = T | ((r: R) => T);

export type FormatPropsTypeMap = {
    [DATA_FORMAT.boolean]: BooleanFormatProps;
    [DATA_FORMAT.date]: DateFormatProps;
    [DATA_FORMAT.geo]: GeoFormatProps;
    [DATA_FORMAT.shortText]: TextFormatProps;
    [DATA_FORMAT.longText]: TextFormatProps;
    [DATA_FORMAT.number]: NumberFormatProps;
    [DATA_FORMAT.url]: URLFormatProps;
};

/** Columns have to be typed with the record type if using an accessor.
 * They can also be used without a record, nor accessor
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ColumnOfType<F extends DataFormat> = BaseColumn & {
    dataFormat: F;
    accessor?: (r: GenericRecord) => FormatPropsTypeMap[F]['value'];
    options?: ValueOrAccessor<Omit<FormatPropsTypeMap[F], 'value'>>;
};

export type BooleanColumn = ColumnOfType<typeof DATA_FORMAT.boolean>;
export type DateColumn = ColumnOfType<typeof DATA_FORMAT.date>;
export type GeoColumn = ColumnOfType<typeof DATA_FORMAT.geo>;
export type ShortTextColumn = ColumnOfType<typeof DATA_FORMAT.shortText>;
export type LongTextColumn = ColumnOfType<typeof DATA_FORMAT.longText>;
export type NumberColumn = ColumnOfType<typeof DATA_FORMAT.number>;
export type URLColumn = ColumnOfType<typeof DATA_FORMAT.url>;

export type Column =
    | BooleanColumn
    | DateColumn
    | GeoColumn
    | ShortTextColumn
    | LongTextColumn
    | NumberColumn
    | URLColumn;

export type HoverEvent<T extends HTMLElement> = (MouseEvent | FocusEvent) & {
    currentTarget: EventTarget & T;
};

export type RowProps = {
    onClick?: (record?: GenericRecord, e?: HoverEvent<HTMLButtonElement>) => void;
    onMouseEnter?: (record?: GenericRecord, e?: HoverEvent<HTMLTableRowElement>) => void;
    onMouseLeave?: (record?: GenericRecord, e?: HoverEvent<HTMLTableRowElement>) => void;
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

export type ColumnKey = string | typeof HOVER_COLUMN_KEY;
export type StickyStores = {
    stickyColumnsWidth: Writable<Map<ColumnKey, number>> & {
        updateColumn: (key: ColumnKey, width: number) => void;
        reset: () => void;
    };
    stickyColumnsOffset: Readable<Map<ColumnKey, number>>;
    lastStickyColumn: Readable<ColumnKey | undefined>;
    isHorizontallyScrolled: Writable<boolean>;
};
