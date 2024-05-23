export type PageSizeOption = { label: string; value: number };

export type PageSizeSelect = {
    options: PageSizeOption[];
    onChange: (size: number) => void;
};

export type Pagination = {
    // position: 'top' | 'bottom' | 'both';
    // style: 'select' | 'buttons';
    current: number;
    totalRecords: number;
    recordsPerPage: number;
    onPageChange: (next: number) => void;
    pageSizeSelect?: PageSizeSelect;
    labels?: Partial<{
        previousPage: string;
        nextPage: string;
        firstPage: string;
        lastPage: string;
        records: string;
    }>;
};
