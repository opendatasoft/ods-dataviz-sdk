import type { DataFrame, Source } from '../types';

export type TableData = DataFrame;

export type Column = {
    key: string;
    title: string;
};

export type TableOptions = {
    columns: Column[];
    title?: string;
    subtitle?: string;
    description?: string;
    source?: Source;
};
