import type { DataFrame, Source } from '../types';

export type TableData = DataFrame;

export type Column = {
    key: string;
    title: string;
};

export type Theme = Partial<{
    textColor: string;
    borderColor: string;
    dataRow: {
        activeBackgroundColor: string;
    };
    header: {
        textColor: string;
        backgroundColor: string;
        borderColor: string;
    };
}>;

export type TableOptions = {
    columns: Column[];
    title?: string;
    subtitle?: string;
    description?: string;
    source?: Source;
    theme?: Theme;
};
