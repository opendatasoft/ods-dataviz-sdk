<script lang="ts">
    import { warn } from './utils';
    import type { TextFormatProps } from './types';

    type $$Props = TextFormatProps;

    export let value: $$Props['value'];
    export let valueToLabel: $$Props['valueToLabel'] | null = null;
    export let debugWarnings = false;

    $: format = (v: unknown) => {
        warn(v, 'text', debugWarnings);
        if (typeof v === 'string' && valueToLabel) {
            return valueToLabel(v as string);
        }
        return v;
    };
</script>

{format(value)}
