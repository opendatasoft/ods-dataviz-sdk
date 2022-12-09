import { writable } from "svelte/store";
import type { DataFrame } from "../components/types";

export default (fetcher: any) => {
    const { subscribe, update, set } = writable({});

    return {
        subscribe,
        filter: async (value) => {
            update(data => ({ ...data, loading: true }));
            const filteredData = await fetcher(value);
            set({ loading: false, value: filteredData });
        },
    };
};