import React, { useState, useEffect } from 'react';
import type { DataFrame, Pagination } from '@opendatasoft/visualizations';
import { Table } from '../../src';
import data from './data';
import options from './options';

const fetchData = async ({ size, page }: { size: number; page: number }) => {
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    await setTimeout(() => {}, 300);
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
    const totalRecords = data.values.length;

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
    const { current = 1, recordsPerPage = 5 } = pagination;
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
