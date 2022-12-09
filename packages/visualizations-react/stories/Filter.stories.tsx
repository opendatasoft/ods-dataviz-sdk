import React from 'react';
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { createFilteredData } from '@opendatasoft/visualizations';
import { ApiClient, fromCatalog, field as odsField, string, all } from '@opendatasoft/api-client';

import { Filter, KpiCard } from '../src';
import { defaultSource } from './utils';

const kpiOptions =  {
    header: 'Header',
    title: 'Title',
    prefix: '$',
    suffix: ' M',
    description: 'Description',
    footer: 'Footer',
    source: defaultSource,
    // Kpi Card
};

const filterOptions1 = [
    {
        label: 'Auvergne-Rhône-Alpes',
        value: { field: 'region_min', value: 'Auvergne-Rhône-Alpes' },
    },
    {
        label: 'Bourgogne-Franche-Comté',
        value: { field: 'region_min', value: 'Bourgogne-Franche-Comté'}
    }
];

const filterOptions2 = [
    {
        label: '15-44 ans',
        value: { field: 'age_label', value: '15-44 ans' }
    },
    {
        label: '45-64 ans',
        value: { field: 'age_label', value: '45-64 ans' }
    }
];

const FilterStory = () => {
    const client = new ApiClient({ domain: 'public' });

    const exQuery = fromCatalog()
        .dataset('coronavirus-tranche-age-urgences-sosmedecins-dep-france')
        .query()
        .select(`sum(tot_pass_emgy) as y`)
        .groupBy(odsField('region_min'));
    

    const filterField = (query, [field, value]) => query.where(
        filter => all(filter, `${odsField(field)}:${string(value)}`)
    );

    /* This could really be a helper in the api-client package */
    const makeFilter = (baseQuery) => {
        const filterValues: { [field: string]: any} = {};

        const makeQuery = () => {
            const entries = Object.entries(filterValues);
            const filteredQuery = entries.reduce(filterField, baseQuery);
            return filteredQuery;
        };

        const filter = async ({ field, value }: { field: string, value: string }) => {
            filterValues[field] = value;
            const query = makeQuery();
            const filteredData = await client.get(query.toString());
            return filteredData.results[0]?.y;
        };

        const clear = async (field) => {
            delete filterValues[field];
            const query = makeQuery();
            const filteredData = await client.get(query.toString());
            return filteredData.results[0]?.y;
        };
        
        return { filter, clear };
    };

    const { filter, clear } = makeFilter(exQuery);
    const filteredData = createFilteredData({ filter, clear });

    const clearAgeLabel = () => filteredData.clear('age_label');
    return (
        <>
            <Filter data={filteredData} options={filterOptions1} />
            <button type="button" onClick={clearAgeLabel}>Clear Age</button>
            <Filter data={filteredData} options={filterOptions2} />
            <KpiCard data={filteredData} options={kpiOptions} />
        </>
    );
};

const meta: ComponentMeta<typeof FilterStory> = {
    title: 'Filter',
    component: Filter,
    decorators: [
        Story => (
                <div
                    style={{
                    display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '90vh',
                    }}
                >
                    {Story()}
                </div>
        ),
    ],
};
export default meta;

const Template: ComponentStory<typeof FilterStory> = (args: any) => (
    <FilterStory {...args} />
);
export const FilterTestStory = Template.bind({});