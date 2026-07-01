export type PageSizeOption = { label: string; value: number };

export type PageSizeSelect = {
    options: PageSizeOption[];
    onChange: (size: number) => void;
};

export type NumberedPagination = {
    kind?: 'numbered';
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
        pageSizeAriaLabel: string;
    }>;
};

/**
 * Cursor pagination: navigation by prev/next relative to the current page.
 * Does not require a total record count: the host only reports how many pages
 * after the current one are known to exist (`pagesAhead`).
 *
 * Derive `pagesAhead` from a sentinel fetch: request a few extra rows beyond
 * the displayed page (`recordsPerPage * k + 1` rows at the current offset)
 * and compute `pagesAhead = floor((rowsReceived - 1) / recordsPerPage)`.
 * `k = 2` is enough to drive the UI; `k = 3` also lets the host keep the
 * trailing `…` exact while a forward navigation is loading.
 * The left `…` is derived locally from `current > 2` (no extra fetch needed).
 */
export type CursorPagination = {
    kind: 'cursor';
    current: number;
    /**
     * Number of pages after `current` known to exist (a lower bound).
     * `>= 1` shows the `[current+1]` page number and enables the `›` button,
     * `>= 2` shows the `…` on the right side.
     */
    pagesAhead: number;
    recordsPerPage?: number;
    onPageChange: (next: number) => void;
    labels?: Partial<{
        previousPage: string;
        nextPage: string;
    }>;
};

export type Pagination = NumberedPagination | CursorPagination;
