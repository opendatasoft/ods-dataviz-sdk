<script lang="ts">
    import { warn } from './utils';
    import type { LongTextFormatProps } from './types';

    type $$Props = LongTextFormatProps;

    interface Props {
        rawValue: $$Props['rawValue'];
        display?: $$Props['display'];
    }

    let { rawValue, display = (v: string) => v }: Props = $props();

    let format = $derived((v: unknown) => {
        if (typeof v !== 'string') {
            warn(v, 'text');
        }
        if (display) {
            return display(v as string);
        }
        return v;
    });

    let value = $derived(format(rawValue));
</script>

<!-- Wrap value to style properly line clamp -->
<span>{value}</span>
