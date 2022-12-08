import { writable } from "svelte/store";
import { ApiClient, fromCatalog, field } from '@opendatasoft/api-client';
import type { DataFrame } from "../components/types";

const client = new ApiClient({ domain: 'public' });
const query = fromCatalog()
    .dataset('coronavirus-tranche-age-urgences-sosmedecins-dep-france')
    .query()
    .select(`sum(tot_pass_emgy) as y`);

export default () => {
    const { subscribe, update, set } = writable({});

    return {
        subscribe,
        filter: async (value: string) => {            
            const filterQuery = query.where(`'${value}'`);
            update(data => ({ ...data, loading: true }));
            const filteredData = await client.get(filterQuery.toString());
            console.log(filteredData)
            set({ loading: false, value: filteredData.results[0]?.y });
        },
    };
};