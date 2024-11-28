<script lang="ts">
    import { warn } from './utils';
    import type { NumberFormatProps } from './types';

    type $$Props = NumberFormatProps;

    export let rawValue: $$Props['rawValue'];
    export let display: $$Props['display'] = (v: unknown) => v as string;
    export let accessor: $$Props['accessor'] = (v: unknown) => v as number;
    export let intl: $$Props['intl'] = {};
    export let locale = 'en-EN';
    export let debugWarnings = false;

    $: format = (v: unknown) => {
        if (!Number.isFinite(v)) {
            if (debugWarnings) {
                warn(v, 'number');
            }
            return v;
        }
        const intlValue = new Intl.NumberFormat(locale, intl).format(v as number);
        if (display) {
            return display(intlValue);
        }
        return intlValue;
    };

    $: value = format(accessor ? accessor(rawValue) : rawValue);
</script>

{value}
