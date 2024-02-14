<script lang="ts">
    import store from '../../store';
    import type { DateColumn } from '../../types';

    import { warn } from './utils';

    export let rawValue: unknown;
    export let options: DateColumn['options'];

    function getDisplayValue(v: unknown, locale: string) {
        if (
            (typeof v === 'string' || typeof v === 'number') &&
            !Number.isNaN(new Date(v).getTime())
        ) {
            return new Intl.DateTimeFormat(locale, options).format(new Date(v));
        }
        warn(v, 'date');
        return v;
    }

    $: value = getDisplayValue(rawValue, $store.locale);
</script>

{value}
