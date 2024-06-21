// eslint-disable-next-line import/no-extraneous-dependencies
import { writable, get } from 'svelte/store';

const defaultLocale = navigator.language;
const defaultDirection = 'ltr';

// eslint-disable-next-line import/prefer-default-export
export const locale = writable<string>(defaultLocale);
export const direction = writable<string>(defaultDirection);
export const isRtl = writable<boolean>(get(direction) === 'rtl');
