<script lang="ts">
    import { warn } from './utils';
    import type { BooleanFormatProps } from './types';

    let { rawValue, display = (v: boolean) => v.toString() }: BooleanFormatProps = $props();

    let format = $derived((v: unknown) => {
        if (typeof v !== 'boolean') {
            warn(v, 'boolean');
        }
        // Currently we return the raw value until we have alternative renders
        if (display) {
            return display(v as boolean);
        }
        return v;
    });

    let value = $derived(format(rawValue));
</script>

{value}
