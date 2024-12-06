<script lang="ts">
    import { warn } from './utils';
    import type { BooleanFormatProps } from './types';

    type $$Props = BooleanFormatProps;

    export let rawValue: $$Props['rawValue'];
    export let display: $$Props['display'] | null = null;
    export let debugWarnings = false;

    $: format = (v: unknown) => {
        if (typeof v === 'boolean' && display) {
            return display(v as boolean);
        }
        if (debugWarnings) {
            warn(v, 'boolean');
        }
        return v;
        // Currently we return the raw value until we have alternative renders
    };
</script>

{format(rawValue)}
