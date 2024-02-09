export const DATA_FORMATS = {
    longText: 'long-text',
    shortText: 'short-text',
    date: 'date',
    integer: 'integer',
    float: 'float',
} as const;

export type SupportedDataKeys = keyof typeof DATA_FORMATS;
export type SupportedDataFormat = typeof DATA_FORMATS[SupportedDataKeys];

export type Size = 'large' | 'medium' | 'small';
export type Order = 'asc' | 'desc' | null;
export type Dir = 'ltr' | 'rtl';
export type Fixed = 'start' | 'end';
export type SortKey = {
    key: string;
    order: Order;
};

export type Column = {
     /** Mandatory */
    title: string;
     /** Mandatory
    /* key name in the data object */
    key: string;
    /** Real functions to be implemented in beta (further stories)
     * how to render the data. Outputs an HTML string */
    dataFormat: SupportedDataFormat;
    /** To be implemented in beta */
    cellStyle?: (datum: unknown) => CSSStyleDeclaration;
    /** To be implemented in beta */
    fixed?: Fixed;
    /** To be implemented in beta (auto or fixed?) */
    width?: number;
    /** To be implemented later */
    dir?: Dir;
    /** To be implemented later */
    footer?: { // To display an information as a footer column
        label: string; // Is a sum, a mean, etc...
        value: SupportedDataFormat;
    }
    /** To be implemented in beta? */
    sort?: {
        onSort: () => void;
        position?: number;
    }
};

export type TableOptions = {
    /** To be implemented in beta */
    fixedHeader?: boolean;
    /** To be implemented later */
    searchable: boolean;
    /** Mandatory */
    columns: Column[];
     /** To be implemented in beta */
    unstyled?: boolean;
    /** To be implemented later */
    dir?: Dir;
    /** To be implemented later */
    size: Size;
    /** To be implemented in beta */
    defaultSortKey?: {
        key: string;
        order: Order;
    };
    /** To be implemented in beta */
    pages?: {
        position: 'top' | 'bottom' | 'both';
        style: 'select' | 'buttons';
        initial: number;
        totalRecords: number;
        recordsPerPage: number;
        setPage: (next: number) => void;
    }
    /** Related to other Props, as fitting */
    descriptions: {
        sort: [{
            asc: string;
            desc: string;
            clear: string;
        }],
        pagination: {
            next: string;
            previous: string;
            goToPage?: string;
        }
    },
};