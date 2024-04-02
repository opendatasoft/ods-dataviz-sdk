export type PageSizeOption = { label: string; value: number };

export type PageSizeSelect = {
    options: PageSizeOption[];
    onChange: (size: number) => void;
};

export type Pagination = {
    // position: 'top' | 'bottom' | 'both';
    // style: 'select' | 'buttons';
    initial: number;
    totalRecords: number;
    recordsPerPage: number;
    onChangePage: (next: number) => void;
    pageSizeSelect?: PageSizeSelect;
};
