import { writable } from "svelte/store";
import type { DataFrame } from "../components/types";

export default ({ filter,  clear }) => {
    const { subscribe, update, set } = writable({});

    return {
        subscribe,
        filter: async (value) => {
            update(data => ({ ...data, loading: true }));
            const filteredData = await filter(value);
            set({ loading: false, value: filteredData });
        },
        clear: async (value) => {
            update((data) => ({ ...data, loading: true }));
            const filteredData = await clear(value);
            set({ loading: false, value: filteredData });
        }
    };
};