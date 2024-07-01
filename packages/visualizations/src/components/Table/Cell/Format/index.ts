import BooleanFormat from './BooleanFormat.svelte';
import DateFormat from './DateFormat.svelte';
import NumberFormat from './NumberFormat.svelte';
import URLFormat from './URLFormat.svelte';
import ShortTextFormat from './ShortTextFormat.svelte';
import LongTextFormat from './LongTextFormat.svelte';
import MediaFormat from './MediaFormat.svelte';
import { isValidRawValue } from './utils';

const Format = {
    boolean: BooleanFormat,
    date: DateFormat,
    'short-text': ShortTextFormat,
    'long-text': LongTextFormat,
    url: URLFormat,
    number: NumberFormat,
    media: MediaFormat,
};

export { isValidRawValue };
export default Format;
