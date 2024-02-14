<script lang="ts">
    import store from '../../store';
    import type { NumberColumn } from '../../types';

    import { warn } from './utils';

    export let rawValue: unknown;
    export let options: NumberColumn['options'];

    function getDisplayValue(v: unknown, locale: string) {
        if (!Number.isFinite(v)) {
            warn(v, 'number');
            return v;
        }
        return new Intl.NumberFormat(locale, options).format(v as number);
    }

    $: value = getDisplayValue(rawValue, $store.locale);
</script>

{value}
