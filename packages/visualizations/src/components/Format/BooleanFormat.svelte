<script lang="ts">
    import { warn } from './utils';
    import type { BooleanFormatProps } from './types';

    type $$Props = BooleanFormatProps;

    export let value: $$Props['value'];
    export let valueToLabel: $$Props['valueToLabel'] | null = null;
    export let debugWarnings = false;

    $: format = (v: unknown) => {
        if (typeof v === 'boolean' && valueToLabel) {
            return valueToLabel(v as boolean);
        }
        warn(v, 'boolean', debugWarnings);
        return v;
        // Currently we return the raw value until we have alternative renders
    };
</script>

{format(value)}
