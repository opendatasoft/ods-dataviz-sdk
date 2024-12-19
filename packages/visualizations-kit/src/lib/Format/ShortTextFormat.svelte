<script lang="ts">
    import { warn } from './utils';
    import type { ShortTextFormatProps } from './types';

    let { rawValue, display = (v: string) => v }: ShortTextProps = $props();

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

{value}
