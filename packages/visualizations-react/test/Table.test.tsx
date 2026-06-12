import React, { useState } from 'react';
import { Table } from 'src';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Column, DataFrame } from '@opendatasoft/visualizations';
import data from 'stories/Table/data';
import options from 'stories/Table/options';
import { usePaginatedData } from 'stories/Table/PaginatedTemplates';
/* This template will fail to catch a new page and returns previous  data: {
      value,
      loading: false,
  }, page and pageSize
simulating e.g. an API call fail.
The select should stay on it's previous value, not the clicked one.
*/
const PageSizeFail = () => {
    const { paginatedData, setPage, setPageSize } = usePaginatedData({
        current: 2,
        recordsPerPage: 5,
    });

    const stateFulOptions = {
        ...options,
        pagination: {
            current: 2,
            recordsPerPage: 5,
            totalRecords: data.length,
            onPageChange: () => setPage(2), //
            pageSizeSelect: {
                options: [
                    { label: '2 / pages', value: 2 },
                    { label: '5 / pages', value: 5 },
                    { label: '10 / pages', value: 10 },
                ],
                onChange: () => setPageSize(5), // stateful, defined in template
            },
        },
    };
    return <Table data={paginatedData} options={stateFulOptions} />;
};

test('Page size select stays on the correct component if page change fails', async () => {
    const user = userEvent.setup();
    render(<PageSizeFail />);

    expect(screen.getByRole('combobox')).toHaveValue('5');

    await user.selectOptions(screen.getByRole('combobox'), '10');
    expect(screen.getByRole('combobox')).toHaveValue('5');
});

/** This crashes storybook for some reason and only in some cases.
 * This test is mainly to provide an environment that is not storybook and
 * test locale reactivity;
 */
const LocaleSwitch = ({ locale }: { locale: string }) => {
    const { paginatedData } = usePaginatedData({
        current: 2,
        recordsPerPage: 5,
    });

    const stateFulOptions = {
        ...options,
        locale,
    };
    return <Table data={paginatedData} options={stateFulOptions} />;
};

test('Can update local reactively', async () => {
    const { rerender } = render(<LocaleSwitch locale="en" />);
    expect(await screen.findByText(/sunday/i)).toBeInTheDocument();

    rerender(<LocaleSwitch locale="de" />);
    expect(await screen.findByText(/sonntag/i)).toBeInTheDocument();

    rerender(<LocaleSwitch locale="it" />);
    expect(await screen.findByText(/sonntag/i)).toBeInTheDocument();
});

/** This crashes storybook for some reason and only in some cases.
 * This test is mainly to provide an environment that is not storybook and
 * test locale reactivity;
 */
const ValueToLabelSwitch = ({ valueToLabel = v => v }: { valueToLabel: (v: string) => string }) => {
    const stateFulOptions = {
        ...options,
        columns: options.columns.map((column: Column) => {
            if (column.dataFormat === 'short-text') {
                return { ...column, options: { ...column.options, valueToLabel } };
            }
            return column;
        }),
    };
    return <Table data={{ value: data }} options={stateFulOptions} />;
};

test('Can update column valueToLabel reactively', async () => {
    const { rerender } = render(<ValueToLabelSwitch valueToLabel={v => v} />);
    expect(await screen.findByText(/^LOREM IPSUM BLOG POST$/i)).toBeInTheDocument();

    rerender(<ValueToLabelSwitch valueToLabel={v => `${v} update`} />);
    expect(await screen.findByText(/^LOREM IPSUM BLOG POST update$/i)).toBeInTheDocument();

    rerender(<ValueToLabelSwitch valueToLabel={v => `${v} 📅`} />);
    expect(await screen.findByText(/^LOREM IPSUM BLOG POST 📅$/i)).toBeInTheDocument();
});

// ── Cursor pagination ──────────────────────────────────────────────────────

const PAGE_SIZE = 3;

const CursorPaginatedTable = ({ initialPage = 1 }: { initialPage?: number }) => {
    const [page, setPage] = useState(initialPage);

    // Double-sentinel: request 2*pageSize+1 rows to detect both hasNextPage and hasNextNextPage.
    const startIndex = (page - 1) * PAGE_SIZE;
    const sliced = (data as unknown as unknown[]).slice(startIndex, startIndex + PAGE_SIZE * 2 + 1);
    const hasNextPage = sliced.length > PAGE_SIZE;
    const hasNextNextPage = sliced.length > PAGE_SIZE * 2;
    const visibleRows = sliced.slice(0, PAGE_SIZE);

    const tableData = { value: visibleRows as DataFrame, isLoading: false };

    return (
        <Table
            data={tableData}
            options={{
                ...options,
                pagination: {
                    kind: 'cursor',
                    current: page,
                    recordsPerPage: PAGE_SIZE,
                    hasNextPage,
                    hasNextNextPage,
                    onPageChange: setPage,
                    labels: { previousPage: 'Previous', nextPage: 'Next' },
                },
            }}
        />
    );
};

test('Cursor pagination: only prev/next arrows, no first/last buttons', () => {
    render(<CursorPaginatedTable initialPage={2} />);

    // ‹ and › arrows present
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument();

    // No first/last-page buttons (cursor mode: start/end unknown)
    expect(screen.queryByRole('button', { name: /first/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /last/i })).not.toBeInTheDocument();

    // Numbering shows X-Y range without a /total
    const boldNumbering = screen.getAllByText(/\d+-\d+/);
    expect(boldNumbering.length).toBeGreaterThan(0);
    boldNumbering.forEach(el => {
        expect(el.textContent).not.toMatch(/\//);
    });
});

test('Cursor pagination: [current+1] absent when hasNextPage is false', () => {
    // When hasNextPage=false the [current+1] page number button must not appear.
    // The ‹/› arrow state is handled by the Svelte disabled attribute (verified by
    // manual browser testing; jsdom / svelte-jester does not reflect boolean attrs).
    render(
        <Table
            data={{ value: data, isLoading: false }}
            options={{
                ...options,
                pagination: {
                    kind: 'cursor',
                    current: 3,
                    recordsPerPage: 5,
                    hasNextPage: false,
                    hasNextNextPage: false,
                    onPageChange: () => {},
                    labels: { previousPage: 'Previous', nextPage: 'Next' },
                },
            }}
        />
    );

    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '4' })).not.toBeInTheDocument();
});

test('Cursor pagination: right ellipsis present only when hasNextNextPage is true', () => {
    const { rerender } = render(
        <Table
            data={{ value: data, isLoading: false }}
            options={{
                ...options,
                pagination: {
                    kind: 'cursor',
                    current: 2,
                    recordsPerPage: 5,
                    hasNextPage: true,
                    hasNextNextPage: true,
                    onPageChange: () => {},
                },
            }}
        />
    );
    expect(screen.getByText('…')).toBeInTheDocument();

    rerender(
        <Table
            data={{ value: data, isLoading: false }}
            options={{
                ...options,
                pagination: {
                    kind: 'cursor',
                    current: 2,
                    recordsPerPage: 5,
                    hasNextPage: true,
                    hasNextNextPage: false,
                    onPageChange: () => {},
                },
            }}
        />
    );
    expect(screen.queryByText('…')).not.toBeInTheDocument();
});

test('Cursor pagination: page navigation calls onPageChange', async () => {
    const user = userEvent.setup();
    const onPageChange = jest.fn();

    render(
        <Table
            data={{ value: data, isLoading: false }}
            options={{
                ...options,
                pagination: {
                    kind: 'cursor',
                    current: 2,
                    recordsPerPage: 5,
                    hasNextPage: true,
                    hasNextNextPage: false,
                    onPageChange,
                    labels: { previousPage: 'Previous', nextPage: 'Next' },
                },
            }}
        />
    );

    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(onPageChange).toHaveBeenCalledWith(3);

    await user.click(screen.getByRole('button', { name: 'Previous' }));
    expect(onPageChange).toHaveBeenCalledWith(1);
});
