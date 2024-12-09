<script lang="ts">
    import { warn } from './utils';
    import type { TextFormatProps } from './types';

    type $$Props = TextFormatProps;

    export let value: $$Props['value'];
    export let valueToLabel: $$Props['valueToLabel'] | null = null;
    export let debugWarnings = false;

    $: format = (v: unknown) => {
        if (typeof v === 'string' && valueToLabel) {
            return valueToLabel(v as string);
        }
        if (debugWarnings) {
            warn(v, 'text');
        }
        return v;
    };
</script>

<!-- Wrap value to style properly line clamp -->
<span>{format(value)}</span>
