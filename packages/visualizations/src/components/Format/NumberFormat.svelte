<script lang="ts">
    import { warn } from './utils';
    import type { NumberFormatProps } from './types';

    type $$Props = NumberFormatProps;

    export let rawValue: $$Props['rawValue'];
    export let display: $$Props['display'] | null = null;
    export let intl: $$Props['intl'] = {};
    export let locale = 'en-EN';
    export let debugWarnings = false;

    $: format = (v: number) => {
        if (Number.isFinite(v)) {
            if (debugWarnings) {
                warn(v, 'number');
            }
            const intlValue = new Intl.NumberFormat(locale, intl).format(v);
            if (display) {
                return display(intlValue);
            }
            return intlValue;
        }
        return v;
    };
</script>

{format(rawValue)}
