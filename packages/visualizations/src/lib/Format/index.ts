import BooleanFormat from './BooleanFormat.svelte';
import DateFormat from './DateFormat.svelte';
import GeoFormat from './GeoFormat.svelte';
import LongTextFormat from './LongTextFormat.svelte';
import NumberFormat from './NumberFormat.svelte';
import ShortTextFormat from './ShortTextFormat.svelte';
import URLFormat from './URLFormat.svelte';
import { isValidRawValue } from './utils.js';

const Format = {
    boolean: BooleanFormat,
    date: DateFormat,
    'short-text': ShortTextFormat,
    'long-text': LongTextFormat,
    url: URLFormat,
    number: NumberFormat,
    geo: GeoFormat,
};

export {
    isValidRawValue,
    BooleanFormat,
    DateFormat,
    GeoFormat,
    LongTextFormat,
    ShortTextFormat,
    NumberFormat,
    URLFormat,
};
export default Format;
