// eslint-disable-next-line import/no-extraneous-dependencies
import { writable } from 'svelte/store';

const defaultLocale = navigator.language;

// eslint-disable-next-line import/prefer-default-export
export const locale = writable<string>(defaultLocale);
export const debugWarnings = writable<boolean>(false);
