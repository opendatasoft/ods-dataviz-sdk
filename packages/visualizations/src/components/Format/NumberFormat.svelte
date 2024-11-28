<script lang="ts">
    import { warn } from './utils';
    import type { NumberFormatProps } from './types';

    type $$Props = NumberFormatProps;

    export let rawValue: $$Props['rawValue'];
    export let display: $$Props['display'] = (v: string) => v;
    export let intl: $$Props['intl'] = {};
    export let locale = 'en-EN';

    $: format = (v: unknown) => {
        if (!Number.isFinite(v)) {
            warn(v, 'number');
            return v;
        }
        const intlValue = new Intl.NumberFormat(locale, intl).format(v as number);
        if (display) {
            return display(intlValue);
        }
        return intlValue;
    };

    $: value = format(rawValue);
</script>

{value}

<style></style>
