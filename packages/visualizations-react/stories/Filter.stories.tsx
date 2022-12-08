import React from 'react';
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { createFilteredData } from '@opendatasoft/visualizations';
import { ApiClient, fromCatalog, field, string } from '@opendatasoft/api-client';

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

const FilterStory = () => {
    const client = new ApiClient({ domain: 'public' });

    const query = fromCatalog()
        .dataset('coronavirus-tranche-age-urgences-sosmedecins-dep-france')
        .query()
        .select(`sum(tot_pass_emgy) as y`)
        .groupBy(field('region_min'));

    const fetcher = async (value: string) => {
        const filterQuery = query.where(`${field('region_min')}:${string(value)}`);
        const filteredData = await client.get(filterQuery.toString());
        console.log(filteredData);
        return filteredData.results[0]?.y;
    };

    const filteredData = createFilteredData(fetcher);

    return (
        <>
            <Filter data={filteredData} options="hello" />
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