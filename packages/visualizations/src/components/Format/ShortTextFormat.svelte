<script lang="ts">
    import { warn } from './utils';
    import type { ShortTextFormatProps } from './types';

    type $$Props = ShortTextFormatProps;

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

{value}
