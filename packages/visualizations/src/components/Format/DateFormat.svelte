<script lang="ts">
    import { warn } from './utils';
    import type { DateFormatProps } from './types';

    type $$Props = DateFormatProps;

    export let value: $$Props['value'];
    export let valueToLabel: $$Props['valueToLabel'] | null = null;
    export let intl: $$Props['intl'] = {};
    export let locale = 'en-En';
    export let debugWarnings = false;

    $: format = (v: unknown) => {
        if (
            (typeof v === 'string' || typeof v === 'number') &&
            !Number.isNaN(new Date(v).getTime())
        ) {
            const intlValue = Intl.DateTimeFormat(locale, intl).format(new Date(v));
            if (valueToLabel) {
                return valueToLabel(intlValue);
            }
            return intlValue;
        }
        warn(v, 'date', debugWarnings);
        return v;
    };
</script>

{format(value)}
