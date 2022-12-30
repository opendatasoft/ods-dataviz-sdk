import React, { useEffect, useState, useMemo, useCallback, CSSProperties } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FilterStore } from '@opendatasoft/visualizations';
import { ApiClient, fromCatalog, field as odsField, Query } from '@opendatasoft/api-client';
import { KpiCard, Text as TextFilter } from '../../src';
import { defaultSource } from '../utils';

const kpiOptions =  {
    title: 'France',
    description: 'Total urgences',
    source: defaultSource,
};

const query = fromCatalog()
            .dataset('coronavirus-tranche-age-urgences-sosmedecins-dep-france')
            .query()
            .select(`sum(tot_pass_emgy) as y`)
            .groupBy(odsField('region_min'));

const FilterStory = () => {
    const [filterStores, setFilterStores] = useState<{ [key: string]: FilterStore }>({});
    const [whereClause, setWhereClause] = useState<string>('');
    const [filteredData, setFilteredData] = useState<{loading:boolean, value: number}>({loading:true, value: 0});
    const [dataQuery, setDataQuery] = useState<Query>(query);

    const dataProviders = useMemo(() => ({
        'coronavirus-tranche-age-urgences-sosmedecins-dep-france': {
            uid: 'coronavirus-tranche-age-urgences-sosmedecins-dep-france',
            datasetId: 'coronavirus-tranche-age-urgences-sosmedecins-dep-france',
        }
    }),[]);

    const setData = useCallback(async() => {
        const client = new ApiClient({ domain: 'public' });
        if (dataQuery) {
            const response: {
                results: [{[key: string]: number}]
            } = await client.get(dataQuery.toString());
            const yArray: number[] | never = [];
            response.results.forEach(data=> yArray.push(data.y));
            const sumArray = yArray.reduce((a, b) => a + b, 0);
            setFilteredData({loading:false, value: sumArray});
        }
    }, [dataQuery]);

    // Initialize the stores for each dataprovider
    useEffect(() => {
        const mapping: { [key: string]: FilterStore } = {};
        Object.keys(dataProviders).forEach((dataProviderId) => {
            const filterStore = new FilterStore();
            mapping[dataProviderId] = filterStore;
            filterStore.onFilterChange((clause: string) => {
                setWhereClause(clause);
            });
        });
        setFilterStores(mapping);
    }, [dataProviders]);

    // Set data
    useEffect(() => {
        setData();
    }, [setData]);

    // Update when whereClause changes
    useEffect(() => {
        const filteredQuery = fromCatalog()
            .dataset('coronavirus-tranche-age-urgences-sosmedecins-dep-france')
            .query()
            .where(whereClause ?? null)
            .select(`sum(tot_pass_emgy) as y`)
            .groupBy(odsField('region_min'));
        setDataQuery(filteredQuery);
    }, [whereClause]);

    // Set data provider and options - for now only for one dataProvider and options empty
    const __filterDpId = Object.keys(dataProviders)[0];
    const __options = useMemo(() => ({}), []);

    return (
    <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh',
        }}
    >
        {filterStores[__filterDpId]
        ? (<div>
            Text filter:
            <TextFilter filterStore={filterStores[__filterDpId]} options={__options} style={{margin: '10px'}} />
            <KpiCard data={filteredData} options={kpiOptions} />
        </div>)
        : (<div>Loading</div>)}
    </div>
);
};

const meta: ComponentMeta<typeof FilterStory> = {
    title: 'Filter',
    component: TextFilter,
    decorators: [
        Story => (
                <div
                style={{
                    display: 'grid',
                    maxWidth: '800px',
                    margin: '0 auto',
                    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                    gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
                    gap: '1rem',
                    '--kpi-card-value-color': '#198276',
                } as CSSProperties}
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


