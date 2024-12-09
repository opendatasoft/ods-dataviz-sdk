import BooleanFormat from './BooleanFormat.svelte';
import DateFormat from './DateFormat.svelte';
import GeoFormat from './GeoFormat.svelte';
import NumberFormat from './NumberFormat.svelte';
import TextFormat from './TextFormat.svelte';
import URLFormat from './URLFormat.svelte';
import { isValidValue } from './utils';

const Format = {
    boolean: BooleanFormat,
    date: DateFormat,
    'short-text': TextFormat,
    'long-text': TextFormat,
    url: URLFormat,
    number: NumberFormat,
    geo: GeoFormat,
};

export { isValidValue, BooleanFormat, DateFormat, GeoFormat, TextFormat, NumberFormat, URLFormat };
export default Format;
