export const DataType = {
    'long-text': 'long-text',
    'short-text': 'short-text',
    date: 'date',
    integer: 'integer',
    float: 'float',
} as const;

export type SupportedDataTypes = keyof typeof DataType;

export type Column = {
    title: string;
    /** key name in the data object */
    key: string;
    /** how to render the data. Outputs an HTML string */
    format?: SupportedDataTypes | ((datum: unknown) => string);
    fixed?: boolean;
    /** To be passed to an Array.sort */
    onSort?: (a: Record<string, unknown>, b: Record<string, unknown>) => number;
};

export type TableOptions = {
    fixedHeader?: boolean;
    columns: Column[];
    unstyled?: boolean;
    defaultSortKey?: string;
    pages?: {
        initial: number;
        total: number;
        setPage: (next: number) => void;
    }
};