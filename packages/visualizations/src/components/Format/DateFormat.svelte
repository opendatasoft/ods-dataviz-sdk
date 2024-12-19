<script lang="ts">
    import { warn } from './utils';
    import type { DateFormatProps } from './types';

    type $$Props = DateFormatProps;

    export let rawValue: $$Props['rawValue'];
    export let display: $$Props['display'] = (v: string) => v;
    export let intl: $$Props['intl'] = {};
    export let locale = 'en-En';

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
        warn(v, 'date');
        return v;
    };

    $: value = format(rawValue);
</script>

{value}
