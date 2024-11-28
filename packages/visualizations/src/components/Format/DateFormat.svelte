<script lang="ts">
    import { warn } from './utils';
    import type { DateFormatProps } from './types';

    type $$Props = DateFormatProps;

    export let rawValue: $$Props['rawValue'];
    export let display: $$Props['display'] = (v: unknown) => v as string;
    export let accessor: $$Props['accessor'] = (v: unknown) => v as string;
    export let intl: $$Props['intl'] = {};
    export let locale = 'en-En';
    export let debugWarnings = false;

    $: format = (v: unknown) => {
        if (
            (typeof v === 'string' || typeof v === 'number') &&
            !Number.isNaN(new Date(v).getTime())
        ) {
            const intlValue = Intl.DateTimeFormat(locale, intl).format(new Date(v));
            if (display) {
                return display(intlValue);
            }
            return v;
        }
        if (debugWarnings) {
            warn(v, 'date');
        }
        return v;
    };

    $: value = format(accessor ? accessor(rawValue) : rawValue);
</script>

{value}

<style></style>
