<script lang="ts">
    import { warn } from './utils';
    import type { LongTextFormatProps } from './types';

    type $$Props = LongTextFormatProps;

    export let rawValue: $$Props['rawValue'];
    export let display: $$Props['display'] = (v: string) => v;

    $: format = (v: unknown) => {
        if (typeof v !== 'string') {
            warn(v, 'text');
        }
        if (display) {
            return display(v as string);
        }
        return v;
    };

    $: value = format(rawValue);
</script>

<!-- Wrap value to style properly line clamp -->
<span>{value}</span>
