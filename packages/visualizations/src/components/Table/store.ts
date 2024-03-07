// eslint-disable-next-line import/no-extraneous-dependencies
import { writable } from 'svelte/store';

type TableStore = {
    locale: string;
};

const defaultLocale = navigator.language;

const store = writable<TableStore>({ locale: defaultLocale });

const updateLocale = (locale: string = defaultLocale) => {
    store.update((previousValue) => ({ ...previousValue, locale }));
};

export { updateLocale };
export default store;
