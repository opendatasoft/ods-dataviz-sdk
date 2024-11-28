<script lang="ts">
    import { warn } from './utils';
    import type { LongTextFormatProps } from './types';

    type $$Props = LongTextFormatProps;

    export let rawValue: $$Props['rawValue'];
    export let display: $$Props['display'] = (v: unknown) => v as string;
    export let accessor: $$Props['accessor'] = (v: unknown) => v as string;
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

    $: value = format(accessor ? accessor(rawValue) : rawValue);
</script>

<!-- Wrap value to style properly line clamp -->
<span>{value}</span>

<style></style>
