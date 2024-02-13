<script lang="ts">
    import type { DateColumn } from '../../types';
    import { warn } from './utils';

    export let rawValue: unknown;
    export let options: DateColumn['options'];

    function getDisplayValue(v: unknown) {
        if (
            (typeof v === 'string' || typeof v === 'number') &&
            !Number.isNaN(new Date(v).getTime())
        ) {
            return new Intl.DateTimeFormat(navigator.language, options).format(new Date(v));
        }
        warn(v, 'date');
        return v;
    }

    $: value = getDisplayValue(rawValue);
</script>

{value}
