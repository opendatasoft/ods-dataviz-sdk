import { writable, get } from 'svelte/store';

/**
 * Creates a Svelte writable store that compares values deeply before updating.
 *
 * @param initialValue - The initial value for the store.
 * @returns An object containing the subscribe and set methods.
 */
const createDeepEqual = <V>(initialValue: V | undefined) => {
    const value = writable<V | undefined>(initialValue);

    return {
        /**
         * Subscribes to changes in the store's value.
         */
        subscribe: value.subscribe,
        /**
         * Sets the new value for the store if it differs from the current value
         * by performing a deep comparison.
         */
        set: (newValue: V | undefined) => {
            if (JSON.stringify(newValue) !== JSON.stringify(get(value))) {
                value.set(newValue);
            }
        },
    };
};

export default createDeepEqual;
