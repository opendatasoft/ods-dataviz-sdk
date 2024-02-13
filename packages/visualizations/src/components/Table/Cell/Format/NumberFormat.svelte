<script lang="ts">
    import type { NumberColumn } from '../../types';
    import { warn } from './utils';

    export let rawValue: unknown;
    export let options: NumberColumn['options'];

    function getDisplayValue(v: unknown) {
        if (!Number.isFinite(v)) {
            warn(v, 'number');
            return v;
        }
        return new Intl.NumberFormat(navigator.language, options).format(v as number);
    }

    $: value = getDisplayValue(rawValue);
</script>

{value}
