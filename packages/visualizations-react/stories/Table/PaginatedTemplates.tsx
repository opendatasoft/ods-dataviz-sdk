import React, { useState, useEffect } from 'react';
import type { DataFrame, CursorPagination, Pagination } from '@opendatasoft/visualizations';
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

export const PaginatedTemplate = (pagination: Pagination) => {
    const { current = 1, recordsPerPage = 5, labels } = pagination;
    const { paginatedData, page, pageSize, setPage } = usePaginatedData({
        current,
        recordsPerPage,
    });

    const stateFulOptions = {
        ...options,
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

export const PageSizeTemplate = (pagination: Pagination) => {
    const { current = 1, recordsPerPage = 5 } = pagination;
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
