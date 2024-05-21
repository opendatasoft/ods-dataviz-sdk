import React from 'react';
import { Table } from 'src';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
