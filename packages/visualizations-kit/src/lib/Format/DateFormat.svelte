<script lang="ts">
    import { warn } from './utils';
    import type { DateFormatProps } from './types';

    let {
        rawValue,
        display = (v: string) => v,
        intl = {},
        locale = 'en-En'
    }: DateFormatProps = $props();

    let format = $derived((v: unknown) => {
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
    });

    let value = $derived(format(rawValue));
</script>

{value}
