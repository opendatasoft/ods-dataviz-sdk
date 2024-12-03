<script lang="ts">
    import { warn } from './utils';
    import type { BooleanFormatProps } from './types';

    type $$Props = BooleanFormatProps;

    export let rawValue: $$Props['rawValue'];
    export let display: $$Props['display'] = (v: boolean) => v.toString();

    $: format = (v: unknown) => {
        if (typeof v !== 'boolean') {
            warn(v, 'boolean');
        }
        // Currently we return the raw value until we have alternative renders
        if (display) {
            return display(v as boolean);
        }
        return v;
    };

    $: value = format(rawValue);
</script>

{value}
