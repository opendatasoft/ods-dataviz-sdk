import React, { useState, useEffect } from 'react';
import type {
    Column,
    DataFrame,
    CursorPagination,
    NumberedPagination,
    Pagination,
} from '@opendatasoft/visualizations';
import { Table } from '../../src';
import data from './data';
import options from './options';

const delay = (ms: number) =>
    new Promise(resolve => {
        setTimeout(resolve, ms);
    });

const fetchData = async ({ size, page }: { size: number; page: number }) => {
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    await delay(300);
    const dataFrame: DataFrame = data?.slice(startIndex, endIndex);
    return dataFrame;
};

// eslint-disable-next-line import/prefer-default-export
export const usePaginatedData = ({
    current,
    recordsPerPage,
}: {
    current: number;
    recordsPerPage: number;
}) => {
    const [records, setRecords] = useState<DataFrame>();
    const [pageSize, setPageSize] = useState(recordsPerPage);
    const [page, setPage] = useState(current);

    useEffect(() => {
        (async () => {
            const newRecords = await fetchData({
                size: pageSize,
                page,
            });
            setRecords(newRecords);
        })();
    }, [recordsPerPage, page, pageSize, setRecords]);

    const paginatedData = { value: records, isLoading: false };
    const totalRecords = data.length;

    return {
        records,
        setRecords,
        pageSize,
        setPageSize,
        page,
        setPage,
        totalRecords,
        paginatedData,
    };
};

export const PaginatedTemplate = ({
    showRowNumbers,
    showFieldTypeIcons,
    ...pagination
}: Pagination & { showRowNumbers?: boolean; showFieldTypeIcons?: boolean }) => {
    const { current = 1, recordsPerPage = 5, labels } = pagination;
    const { paginatedData, page, pageSize, setPage } = usePaginatedData({
        current,
        recordsPerPage,
    });

    const stateFulOptions = {
        ...options,
        showRowNumbers,
        showFieldTypeIcons,
        pagination: {
            current: page,
            recordsPerPage: pageSize,
            totalRecords: data.length,
            onPageChange: setPage,
            labels,
        },
    };

    return <Table data={paginatedData} options={stateFulOptions} />;
};

export const CursorTemplate = ({
    current: initialPage = 1,
    recordsPerPage: pageSize = 5,
    labels,
}: Pick<CursorPagination, 'current' | 'recordsPerPage' | 'labels'>) => {
    const [page, setPage] = useState(initialPage);
    const [records, setRecords] = useState<DataFrame>();

    useEffect(() => {
        (async () => {
            const startIndex = (page - 1) * pageSize;
            // Sentinel fetch: request 2*pageSize+1 rows to derive pagesAhead in a single request.
            const endIndex = startIndex + pageSize * 2 + 1;
            await delay(300);
            setRecords(data?.slice(startIndex, endIndex));
        })();
    }, [page, pageSize]);

    const rows = records ?? [];
    // Number of pages after the current one proven to exist by the extra rows received.
    const pagesAhead = Math.max(0, Math.floor((rows.length - 1) / pageSize));
    const visibleRows = rows.slice(0, pageSize);
    const paginatedData = {
        value: visibleRows as DataFrame,
        isLoading: false,
    };

    const stateFulOptions = {
        ...options,
        pagination: {
            kind: 'cursor' as const,
            current: page,
            recordsPerPage: pageSize,
            pagesAhead,
            onPageChange: setPage,
            labels,
        },
    };

    return <Table data={paginatedData} options={stateFulOptions} />;
};

// 12 groups, each expanded into a Total row and one row per city (like a segmented
// aggregated table). Pages hold groups, not rows.
const CITIES = ['Paris', 'Lyon', 'Marseille'];
const groupedRecords = Array.from({ length: 12 }, (_, i) => {
    const category = `Category ${i + 1}`;
    const values = CITIES.map((_city, j) => (i * 7 + j * 3) % 10);
    return [
        { category, city: 'Total', count: values.reduce((a, b) => a + b, 0), isTotal: true },
        ...CITIES.map((city, j) => ({ category, city, count: values[j] })),
    ];
});

const groupedColumns: Column[] = [
    { title: 'Category', key: 'category', dataFormat: 'short-text', rowHeader: true },
    { title: 'City', key: 'city', dataFormat: 'short-text', rowHeader: true },
    { title: 'Count', key: 'count', dataFormat: 'number' },
];

/**
 * Cursor pagination over groups expanded into several rows: `displayedRecords` makes the
 * range count groups (`4-6`), not rows (which would read `4-15`).
 */
export const GroupedCursorTemplate = ({
    current: initialPage = 2,
    recordsPerPage: groupsPerPage = 3,
    withDisplayedRecords,
}: Pick<CursorPagination, 'current' | 'recordsPerPage'> & { withDisplayedRecords: boolean }) => {
    const [page, setPage] = useState(initialPage);
    const pageGroups = groupedRecords.slice((page - 1) * groupsPerPage, page * groupsPerPage);
    const pagesAhead = Math.max(0, Math.ceil(groupedRecords.length / groupsPerPage) - page);

    return (
        <>
            <style>{`.grouped-story--total-row td, .grouped-story--total-row th { font-weight: bold; }`}</style>
            <Table
                data={{ value: pageGroups.flat() as DataFrame, isLoading: false }}
                options={{
                    columns: groupedColumns,
                    rowClassName: record =>
                        record.isTotal ? 'grouped-story--total-row' : undefined,
                    pagination: {
                        kind: 'cursor',
                        current: page,
                        recordsPerPage: groupsPerPage,
                        pagesAhead,
                        ...(withDisplayedRecords && { displayedRecords: pageGroups.length }),
                        onPageChange: setPage,
                    },
                }}
            />
        </>
    );
};

export const PageSizeTemplate = (pagination: Pagination) => {
    const { current = 1, recordsPerPage = 5, labels } = pagination;
    const { groupPageControls } = pagination as NumberedPagination;
    const { paginatedData, page, pageSize, setPage, setPageSize } = usePaginatedData({
        current,
        recordsPerPage,
    });

    const stateFulOptions = {
        ...options,
        pagination: {
            current: page,
            recordsPerPage: pageSize,
            totalRecords: data.length,
            onPageChange: setPage, //
            groupPageControls,
            labels,
            pageSizeSelect: {
                options: [
                    { label: '2 / pages', value: 2 },
                    { label: '5 / pages', value: 5 },
                    { label: '10 / pages', value: 10 },
                ],
                onChange: (newSize: number) => {
                    setPageSize(newSize);
                    setPage(1);
                }, // stateful, defined in template
            },
        },
    };

    return <Table data={paginatedData} options={stateFulOptions} />;
};
