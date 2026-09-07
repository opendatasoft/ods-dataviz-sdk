import React, { useState } from 'react';
import { Table } from 'src';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
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
    expect(await screen.findByText(/^GETTING STARTED WITH OPEN DATA$/i)).toBeInTheDocument();

    rerender(<ValueToLabelSwitch valueToLabel={v => `${v} update`} />);
    expect(await screen.findByText(/^GETTING STARTED WITH OPEN DATA update$/i)).toBeInTheDocument();

    rerender(<ValueToLabelSwitch valueToLabel={v => `${v} 📅`} />);
    expect(await screen.findByText(/^GETTING STARTED WITH OPEN DATA 📅$/i)).toBeInTheDocument();
});

// ── Cursor pagination ──────────────────────────────────────────────────────

const PAGE_SIZE = 3;

const CursorPaginatedTable = ({ initialPage }: { initialPage: number }) => {
    const [page, setPage] = useState(initialPage);

    // Sentinel fetch: request 2*pageSize+1 rows to derive pagesAhead in a single request.
    const startIndex = (page - 1) * PAGE_SIZE;
    const sliced = (data as unknown as unknown[]).slice(startIndex, startIndex + PAGE_SIZE * 2 + 1);
    const pagesAhead = Math.max(0, Math.floor((sliced.length - 1) / PAGE_SIZE));
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
                    pagesAhead,
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

test('Cursor pagination: [current+1] absent when no page ahead is known', () => {
    // When pagesAhead=0 the [current+1] page number button must not appear.
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
                    pagesAhead: 0,
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

test('Cursor pagination: right ellipsis present only when at least 2 pages ahead are known', async () => {
    const { rerender } = render(
        <Table
            data={{ value: data, isLoading: false }}
            options={{
                ...options,
                pagination: {
                    kind: 'cursor',
                    current: 2,
                    recordsPerPage: 5,
                    pagesAhead: 2,
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
                    pagesAhead: 1,
                    onPageChange: () => {},
                },
            }}
        />
    );
    // Svelte flushes prop updates asynchronously after the React re-render.
    await waitFor(() => {
        expect(screen.queryByText('…')).not.toBeInTheDocument();
    });
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
                    pagesAhead: 1,
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

test('Cursor pagination: X-Y range reflects the rows actually displayed on a partial page', () => {
    // Page 5 with 10 records per page but only 3 displayed rows: the range
    // must end at 43, not assume a full page (41-50).
    render(
        <Table
            data={{ value: data.slice(0, 3), isLoading: false }}
            options={{
                ...options,
                pagination: {
                    kind: 'cursor',
                    current: 5,
                    recordsPerPage: 10,
                    pagesAhead: 0,
                    onPageChange: () => {},
                },
            }}
        />
    );

    expect(screen.getByText('41-43')).toBeInTheDocument();
});

// Field type icons & tooltip formats

test('Field type icon respects showFieldTypeIcons on non-sortable columns', () => {
    render(
        <Table
            data={{ value: [{ title: 'a' }] }}
            options={{
                columns: [{ title: 'Title', key: 'title', dataFormat: 'short-text' }],
                showFieldTypeIcons: false,
            }}
        />
    );

    const header = screen.getByRole('columnheader', { name: 'Title' });
    expect(header.querySelector('svg')).not.toBeInTheDocument();
});

test.each(['file', 'image', 'ip-address', 'id'] as const)(
    'Tooltip-on-overflow is wired for the %s column type (kept in sync with CellContent truncation CSS)',
    dataFormat => {
        const { container } = render(
            <Table
                data={{ value: [{ v: 'some value' }] }}
                options={{ columns: [{ title: 'Col', key: 'v', dataFormat }] }}
            />
        );

        // tippy.js attaches the instance to the reference node synchronously on creation;
        // no need to simulate hover/overflow (jsdom has no real layout).
        const cellContent = container.querySelector('.cell-content') as
            | (HTMLElement & { _tippy?: unknown })
            | null;
        expect(cellContent?._tippy).toBeTruthy();
    }
);

test('Unmapped dataFormat falls back to the dedicated "unknown" icon, not the text icon', () => {
    // Column['dataFormat'] is a closed union; an unrecognized value can only reach
    // FieldTypeIcon from an untyped/JS consumer, hence the cast.
    const unknownColumn = {
        title: 'Mystery',
        key: 'v',
        dataFormat: 'mystery-format',
    } as unknown as Column;
    const textColumn: Column = { title: 'Text', key: 'v', dataFormat: 'short-text' };

    const { container: unknownContainer } = render(
        <Table
            data={{ value: [{ v: 'a' }] }}
            options={{ columns: [unknownColumn], showFieldTypeIcons: true }}
        />
    );
    const { container: textContainer } = render(
        <Table
            data={{ value: [{ v: 'a' }] }}
            options={{ columns: [textColumn], showFieldTypeIcons: true }}
        />
    );

    const unknownIcon = unknownContainer.querySelector('svg')?.innerHTML;
    const textIcon = textContainer.querySelector('svg')?.innerHTML;
    expect(unknownIcon).toBeTruthy();
    expect(unknownIcon).not.toEqual(textIcon);
});

test('Unmapped dataFormat still renders the raw value in the cell body', () => {
    const unknownColumn = {
        title: 'Mystery',
        key: 'v',
        dataFormat: 'mystery-format',
    } as unknown as Column;

    render(
        <Table data={{ value: [{ v: 'some raw value' }] }} options={{ columns: [unknownColumn] }} />
    );

    expect(screen.getByText('some raw value')).toBeInTheDocument();
});

test('Row-number sticky classes only apply once the table has scrolled horizontally', async () => {
    const { container } = render(
        <Table
            data={{ value: [{ v: 'a' }] }}
            options={{
                columns: [{ title: 'Col', key: 'v', dataFormat: 'short-text' }],
                showRowNumbers: true,
            }}
        />
    );

    const scrollbox = container.querySelector('.scrollbox') as HTMLElement;
    const rowNumberHeader = container.querySelector('.row-number-header') as HTMLElement;

    // Structurally the only sticky column, so it's always "last sticky"; only the
    // scroll-dependent class should be missing before scrolling.
    expect(rowNumberHeader).toHaveClass('isLastSticky');
    expect(rowNumberHeader).not.toHaveClass('isHorizontallyScrolled');

    scrollbox.scrollLeft = 10;
    fireEvent.scroll(scrollbox);

    // Svelte flushes reactive class bindings on the next microtask, not synchronously.
    await waitFor(() => {
        expect(rowNumberHeader).toHaveClass('isHorizontallyScrolled');
    });
});

test('The action column renders before the row-number column, matching the design order', () => {
    const { container } = render(
        <Table
            data={{ value: [{ v: 'a' }] }}
            options={{
                columns: [{ title: 'Col', key: 'v', dataFormat: 'short-text' }],
                showRowNumbers: true,
                rowProps: { onClick: () => {} },
            }}
        />
    );

    const headerCells = container.querySelectorAll('thead th');
    expect(headerCells[0]).toHaveClass('button-cell');
    expect(headerCells[1]).toHaveClass('row-number-header');

    const bodyCells = container.querySelectorAll('tbody tr:first-child td');
    expect(bodyCells[0]).toHaveClass('button-cell');
    expect(bodyCells[1]).toHaveClass('row-number-cell');
});

test('The loading skeleton keeps the action and row-number placeholders sticky, matching loaded rows', () => {
    const { container } = render(
        <Table
            data={{ value: [], loading: true }}
            options={{
                columns: [{ title: 'Col', key: 'v', dataFormat: 'short-text' }],
                showRowNumbers: true,
                rowProps: { onClick: () => {} },
            }}
        />
    );

    const bodyCells = container.querySelectorAll('tbody tr:first-child td');
    expect(bodyCells[0]).toHaveClass('sticky');
    expect(bodyCells[1]).toHaveClass('sticky');

    // The row-number placeholder must offset by the action column's width, not sit at the
    // table's own left edge like the (now sticky) action placeholder does.
    const actionOffset = (bodyCells[0] as HTMLElement).style.getPropertyValue('--sticky-offset');
    const rowNumberOffset = (bodyCells[1] as HTMLElement).style.getPropertyValue('--sticky-offset');
    expect(rowNumberOffset).not.toEqual(actionOffset);
});

test('A sticky data column stays sticky in the loading skeleton', () => {
    const { container } = render(
        <Table
            data={{ value: [], loading: true }}
            options={{
                columns: [{ title: 'Col', key: 'v', dataFormat: 'short-text', sticky: true }],
            }}
        />
    );

    const loadingDataCell = container.querySelector('tbody tr:first-child td:last-child');
    expect(loadingDataCell).toHaveClass('sticky');
});

test('A CSS length maxHeight caps the scrollbox and leaves the card content-sized', () => {
    const { container } = render(
        <Table
            data={{ value: [{ v: 'a' }] }}
            options={{
                columns: [{ title: 'Col', key: 'v', dataFormat: 'short-text' }],
                maxHeight: '16rem',
            }}
        />
    );

    const scrollbox = container.querySelector('.scrollbox') as HTMLElement;
    expect(scrollbox).toHaveStyle({ maxHeight: '16rem' });
    expect(scrollbox).not.toHaveClass('fill');
    expect(container.querySelector('.card')).not.toHaveClass('ods-dataviz--fill');
});

test('fillHeight fills the parent instead of applying a percentage cap', () => {
    const { container } = render(
        <Table
            data={{ value: [{ v: 'a' }] }}
            options={{
                columns: [{ title: 'Col', key: 'v', dataFormat: 'short-text' }],
                fillHeight: true,
            }}
        />
    );

    const scrollbox = container.querySelector('.scrollbox') as HTMLElement;
    expect(scrollbox).toHaveClass('fill');
    expect(scrollbox.getAttribute('style') ?? '').not.toContain('max-height');
    expect(container.querySelector('.card')).toHaveClass('ods-dataviz--fill');
    expect(container.querySelector('.table-container')).toHaveClass('fill');
});

test('fillHeight wins over maxHeight so the length cap cannot leave a gap above pagination', () => {
    const { container } = render(
        <Table
            data={{ value: [{ v: 'a' }] }}
            options={{
                columns: [{ title: 'Col', key: 'v', dataFormat: 'short-text' }],
                fillHeight: true,
                maxHeight: '16rem',
            }}
        />
    );

    const scrollbox = container.querySelector('.scrollbox') as HTMLElement;
    expect(scrollbox).toHaveClass('fill');
    expect(scrollbox.getAttribute('style') ?? '').not.toContain('max-height');
});
