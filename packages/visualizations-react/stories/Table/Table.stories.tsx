import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import type {
    TableData,
    Async,
    Column,
    GenericRecord,
    TableProps,
    Pagination,
} from '@opendatasoft/visualizations';
import { ColumnSort } from '@opendatasoft/visualizations';

import './custom-style.css';

import { Table } from '../../src';

import value from './data';
import options, { DatasetRecord } from './options';
import { PaginatedTemplate, PageSizeTemplate } from './PaginatedTemplates';

const meta: Meta<typeof Table> = {
    title: 'Table/Table',
    component: Table,
};
export default meta;

const data: Async<TableData> = {
    value,
    loading: false,
};

const fetchingData: Async<TableData> = {
    value: [],
    loading: true,
};

export const Playground: StoryObj<typeof Table> = {
    args: {
        data,
        options,
    },
};

// Pagination is host-sliced: the Table renders whatever rows it is given, so a story that
// wants to paginate must drive it from a stateful template (PaginatedTemplates) rather than
// pass the full dataset with a no-op onPageChange. PageSizeTemplate exercises the numbered
// pager and the page-size select that custom-style.css restyles below.
export const CustomStyle: StoryObj<typeof PageSizeTemplate> = {
    args: {
        current: 1,
        recordsPerPage: 5,
    },
    render: (args: Pagination) => (
        <div className="table-story--custom-style">
            <PageSizeTemplate {...args} />
        </div>
    ),
};

export const Scroll: StoryObj<typeof Table> = {
    args: {
        data,
        options,
    },
    render: (args: TableProps) => (
        <div style={{ maxWidth: '800px' }}>
            <Table {...args} />
        </div>
    ),
};

export const TwoColumns: StoryObj<typeof Table> = {
    args: {
        data,
        options: { ...options, columns: options.columns.slice(0, 2) },
    },
};

export const Unstyled: StoryObj<typeof Table> = {
    args: {
        data,
        options: { ...options, unstyled: true },
    },
};

export const Loading: StoryObj<typeof Table> = {
    args: {
        data: fetchingData,
        options: {
            ...options,
            rowProps: {
                onClick: () => {}, // Just to have column that shouldn't have the loading indicator
            },
        },
    },
};

export const EmptyState: StoryObj<typeof Table> = {
    args: {
        data: { value: [], loading: false },
        options: { ...options, emptyStateLabel: 'Neniuj registroj trovitaj...' },
    },
};

export const RtlDirection: StoryObj<typeof PaginatedTemplate> = {
    parameters: {
        direction: 'rtl',
        chromatic: { disableSnapshot: true },
    },
    args: {
        current: 1,
        recordsPerPage: 5,
        showRowNumbers: true,
    },
    render: args => <PaginatedTemplate {...args} />,
};

const longTitleData: Async<TableData> = {
    value: [
        {
            id: 1,
            category: 'Renewable energy',
            subcategory: 'Solar',
            region: 'Île-de-France',
            value: 4200,
        },
        {
            id: 2,
            category: 'Renewable energy',
            subcategory: 'Wind',
            region: 'Bretagne',
            value: 3800,
        },
        {
            id: 3,
            category: 'Nuclear energy',
            subcategory: 'Fission',
            region: 'Normandie',
            value: 9100,
        },
        {
            id: 4,
            category: 'Fossil fuels',
            subcategory: 'Natural gas',
            region: 'Hauts-de-France',
            value: 5500,
        },
    ],
    loading: false,
};

export const FieldTypeIcons: StoryObj<typeof Table> = {
    args: {
        data,
        options: {
            ...options,
            showRowNumbers: true,
            showFieldTypeIcons: true,
        },
    },
    render: (args: TableProps) => (
        <div style={{ maxWidth: '900px' }}>
            <Table {...args} />
        </div>
    ),
};

const allTypesColumns: Column[] = [
    { title: 'Short text', key: 'shortText', dataFormat: 'short-text' },
    { title: 'Long text', key: 'longText', dataFormat: 'long-text' },
    { title: 'Number', key: 'num', dataFormat: 'number' },
    { title: 'Date', key: 'date', dataFormat: 'date' },
    { title: 'Boolean', key: 'bool', dataFormat: 'boolean' },
    {
        title: 'URL',
        key: 'url',
        dataFormat: 'url',
        options: { valueToLabel: () => 'opendatasoft.com' },
    },
    {
        title: 'Geo',
        key: 'geo',
        dataFormat: 'geo',
        accessor: () => ({
            sources: {
                geo: {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: [
                            {
                                id: 1,
                                type: 'Feature',
                                geometry: { type: 'Point', coordinates: [2.35, 48.85] },
                            },
                        ],
                    },
                },
            },
            layers: [
                {
                    id: 'geo-layer',
                    source: 'geo',
                    type: 'circle',
                    color: 'black',
                    borderColor: 'white',
                },
            ],
        }),
        options: {
            mapOptions: { style: 'https://demotiles.maplibre.org/style.json', interactive: false },
            valueToLabel: () => '48.85°N, 2.35°E',
        },
    },
    { title: 'JSON', key: 'json', dataFormat: 'json' },
    {
        title: 'File',
        key: 'file',
        dataFormat: 'file',
        options: { valueToLabel: () => 'report.pdf' },
    },
    {
        title: 'Image',
        key: 'img',
        dataFormat: 'image',
        options: { valueToLabel: () => 'photo.jpg' },
    },
    { title: 'IP address', key: 'ip', dataFormat: 'ip-address' },
    { title: 'ID', key: 'id', dataFormat: 'id' },
    // Column['dataFormat'] is a closed union; an unrecognized value can only reach
    // FieldTypeIcon from an untyped/JS consumer, hence the cast — demoes the fallback icon.
    { title: 'Unknown', key: 'unknown', dataFormat: 'unknown' } as unknown as Column,
];

const allTypesData: Async<TableData> = {
    value: [
        {
            shortText: 'Hello world',
            longText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            num: 1234,
            date: '2024-01-15T00:00:00Z',
            bool: true,
            url: 'https://opendatasoft.com',
            geo: [2.35, 48.85],
            json: { active: true, score: 98 },
            file: 'https://example.com/report.pdf',
            img: 'https://example.com/photo.jpg',
            ip: '192.168.1.42',
            id: 'usr_abc123',
            unknown: 'raw value, unformatted',
        },
    ],
    loading: false,
};

export const AllColumnTypes: StoryObj<typeof Table> = {
    render: () => (
        <Table
            data={allTypesData}
            options={{ columns: allTypesColumns, locale: 'en', showFieldTypeIcons: true }}
        />
    ),
};

function LongColumnTitlesDemo() {
    const [sort, setSort] = useState<[string, 'ASC' | 'DESC']>(['category', ColumnSort.asc]);

    const sortedData: Async<TableData> = {
        ...longTitleData,
        value: [...longTitleData.value].sort((a, b) => {
            const key = sort[0] as keyof typeof longTitleData.value[0];
            const dir = sort[1] === 'ASC' ? 1 : -1;
            if (a[key] < b[key]) return -dir;
            if (a[key] > b[key]) return dir;
            return 0;
        }),
    };

    const columns = [
        {
            title: 'Annual energy production category by primary source type and method',
            key: 'category',
            dataFormat: 'short-text' as const,
            sorted: sort[0] === 'category' ? sort[1] : undefined,
            onClick: () =>
                setSort(['category', sort[0] === 'category' && sort[1] === 'ASC' ? 'DESC' : 'ASC']),
        },
        {
            title: 'Annual energy production subcategory by technology and method',
            key: 'subcategory',
            dataFormat: 'short-text' as const,
            sorted: sort[0] === 'subcategory' ? sort[1] : undefined,
            onClick: () =>
                setSort([
                    'subcategory',
                    sort[0] === 'subcategory' && sort[1] === 'ASC' ? 'DESC' : 'ASC',
                ]),
        },
        {
            title: 'Administrative and geographic region of production and distribution',
            key: 'region',
            dataFormat: 'short-text' as const,
            // No onClick — plain header, tests the non-SortButton branch
        },
        {
            title: 'Total annual production volume measured in megawatt-hours (MWh)',
            key: 'value',
            dataFormat: 'number' as const,
            // No onClick — plain header, tests the non-SortButton branch
        },
    ];

    return (
        <>
            <style>{`.long-column-titles-story th { max-width: 500px; }`}</style>
            <div className="long-column-titles-story" style={{ maxWidth: '600px' }}>
                <Table
                    data={sortedData}
                    options={{ columns, title: 'Long column title tooltip' }}
                />
            </div>
        </>
    );
}

/**
 * Column headers truncate when the table is too narrow, and reveal the full title via tooltip on hover.
 * Includes both plain headers and sortable headers (with SortButton) to cover both code paths.
 */
export const LongColumnTitles: StoryObj<typeof Table> = {
    render: () => <LongColumnTitlesDemo />,
};

export const RowHoverAndClick: StoryObj<typeof Table> = {
    args: {
        data,
        options,
    },
    render: (args: TableProps) => {
        const { options: argOptions, data: argData } = args;
        const [hoveredRecord, setHovered] = useState<DatasetRecord | undefined | null>(null);
        const [lastClicked, setLastClicked] = useState<DatasetRecord | undefined | null>(null);

        const onMouseEnter = (record?: GenericRecord) => {
            setHovered(record as DatasetRecord);
        };
        const onMouseLeave = () => {
            setHovered(null);
        };
        const onClick = (record?: GenericRecord) => {
            setLastClicked(record as DatasetRecord);
        };

        return (
            <>
                <h3>Hovered</h3>
                <pre>{JSON.stringify(hoveredRecord)}</pre>
                <h3>Clicked</h3>
                <pre>{JSON.stringify(lastClicked)}</pre>
                <div style={{ maxWidth: '800px' }} className="design-system">
                    <Table
                        data={argData}
                        options={{
                            ...argOptions,
                            rowProps: { onClick, onMouseEnter, onMouseLeave },
                        }}
                    />
                </div>
                ;
            </>
        );
    },
};

const totalRowsData: Async<TableData> = {
    value: [
        { region: 'North', year: 2023, amount: 1200 },
        { region: 'North', year: 2024, amount: 1350 },
        { region: 'North', amount: 2550, isTotal: true },
        { region: 'South', year: 2023, amount: 800 },
        { region: 'South', year: 2024, amount: null },
        { region: 'South', amount: 800, isTotal: true },
    ],
    loading: false,
};

/**
 * `rowClassName` returns a class name for each row's `<tr>`. Here, records flagged
 * `isTotal: true` get a class that renders them bold.
 */
export const RowClassName: StoryObj<typeof Table> = {
    args: {
        data: totalRowsData,
        options: {
            columns: [
                { title: 'Region', key: 'region', dataFormat: 'short-text' },
                { title: 'Year', key: 'year', dataFormat: 'number' },
                { title: 'Amount', key: 'amount', dataFormat: 'number' },
            ],
            rowClassName: (record: GenericRecord) =>
                record.isTotal ? 'table-story--total-row' : undefined,
        },
    },
    render: (args: TableProps) => (
        <>
            <style>{`.table-story--total-row td { font-weight: bold; }`}</style>
            <Table {...args} />
        </>
    ),
};

const emptyValuesData: Async<TableData> = {
    value: [
        { name: 'Paris', population: 2102650, website: 'https://www.paris.fr' },
        { name: 'Lyon', population: null, website: 'https://www.lyon.fr' },
        { name: 'Marseille', population: 873076, website: null },
        { name: null, population: 0, website: undefined },
    ],
    loading: false,
};

/**
 * `emptyValueLabel` is displayed in cells whose value is `null` or `undefined`.
 * Other falsy values such as `0` are still rendered normally.
 */
export const EmptyValueLabel: StoryObj<typeof Table> = {
    args: {
        data: emptyValuesData,
        options: {
            columns: [
                { title: 'Name', key: 'name', dataFormat: 'short-text' },
                { title: 'Population', key: 'population', dataFormat: 'number' },
                { title: 'Website', key: 'website', dataFormat: 'url' },
            ],
            emptyValueLabel: '–',
        },
    },
};

const rowHeadersData = {
    value: [
        { category: 'Arts and culture', city: 'Total', count: 5, isTotal: true },
        { category: 'Arts and culture', city: 'Paris', count: 5 },
        { category: 'Arts and culture', city: 'Serris', count: null },
        { category: 'Food and drinks', city: 'Total', count: 3, isTotal: true },
        { category: 'Food and drinks', city: 'Paris', count: 3 },
        { category: 'Food and drinks', city: 'Serris', count: null },
    ],
    loading: false,
};

/** Grouping columns as row headers (`<th scope="row">`), as in an aggregated table. */
export const RowHeaders: StoryObj<typeof Table> = {
    args: {
        data: rowHeadersData,
        options: {
            columns: [
                { title: 'Category', key: 'category', dataFormat: 'short-text', rowHeader: true },
                { title: 'City', key: 'city', dataFormat: 'short-text', rowHeader: true },
                { title: 'Count records', key: 'count', dataFormat: 'number' },
            ],
            emptyValueLabel: '–',
        },
    },
};
