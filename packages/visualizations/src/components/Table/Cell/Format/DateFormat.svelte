<script lang="ts">
    import { locale } from '../../store';
    import { warn } from './utils';

    export let rawValue: unknown;
    export let display = (v: string) => v;
    export let intl: Intl.DateTimeFormatOptions;

    $: format = (v: unknown) => {
        if (
            (typeof v === 'string' || typeof v === 'number') &&
            !Number.isNaN(new Date(v).getTime())
        ) {
            const intlValue = Intl.DateTimeFormat($locale, intl).format(new Date(v));
            return display(intlValue);
        }
        warn(v, 'date');
        return v;
    };

    $: value = format(rawValue);
</script>

{value}
