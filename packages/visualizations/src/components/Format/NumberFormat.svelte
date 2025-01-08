<script lang="ts">
    import { warn } from './utils';
    import type { NumberFormatProps } from './types';

    type $$Props = NumberFormatProps;

    export let value: $$Props['value'];
    export let valueToLabel: $$Props['valueToLabel'] | null = null;
    export let intl: $$Props['intl'] = {};
    export let locale = 'en-EN';
    export let debugWarnings = false;

    $: format = (v: number) => {
        if (Number.isFinite(v)) {
            const intlValue = new Intl.NumberFormat(locale, intl).format(v);
            if (valueToLabel) {
                return valueToLabel(intlValue);
            }
            return intlValue;
        }
        if (debugWarnings) {
            warn(v, 'number');
        }
        return v;
    };
</script>

{format(value)}
