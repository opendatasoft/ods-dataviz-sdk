<script lang="ts">
    import { warn } from './utils';
    import type { ShortTextFormatProps } from './types';

    type $$Props = ShortTextFormatProps;

    export let rawValue: $$Props['rawValue'];
    export let display: $$Props['display'] | null = null;
    export let debugWarnings = false;

    $: format = (v: unknown) => {
        if (typeof v !== 'string') {
            if (debugWarnings) {
                warn(v, 'text');
            }
        }
        if (display) {
            return display(v as string);
        }
        return v;
    };
</script>

{format(rawValue)}
