<script lang="ts">
    import { warn } from './utils';
    import type { ShortTextFormatProps } from './types';

    type $$Props = ShortTextFormatProps;

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

{value}

<style></style>
