import { isEqual } from 'lodash';
// eslint-disable-next-line import/no-extraneous-dependencies
import { writable } from 'svelte/store';

/**
 * Creates a Svelte writable store that compares values deeply before updating.
 *
 * @param initialValue - The initial value for the store.
 * @returns An object containing the subscribe and set methods.
 */
const createDeepEqual = <V>(initialValue: V | undefined) => {
    const { subscribe, update: internalUpdate } = writable<V | undefined>(initialValue);

    return {
        /**
         * Subscribes to changes in the store's value.
         */
        subscribe,
        /**
         * Update the store value if the new value differs from the store current value
         * by performing a deep comparison.
         */
        update: (newValue?: V | undefined) => {
            internalUpdate((storeValue: V | undefined) => {
                // Won't trigger subcribers
                if (isEqual(storeValue, newValue)) return storeValue;
                return newValue;
            });
        },
    };
};

export default createDeepEqual;
