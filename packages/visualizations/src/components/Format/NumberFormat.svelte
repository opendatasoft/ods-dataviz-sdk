<script lang="ts">
    import { warn } from './utils';
    import type { NumberFormatProps } from './types';

    type $$Props = NumberFormatProps;

    interface Props {
        rawValue: $$Props['rawValue'];
        display?: $$Props['display'];
        intl?: $$Props['intl'];
        locale?: string;
    }

    let {
        rawValue,
        display = (v: string) => v,
        intl = {},
        locale = 'en-EN'
    }: Props = $props();

    let format = $derived((v: unknown) => {
        if (!Number.isFinite(v)) {
            warn(v, 'number');
            return v;
        }
        const intlValue = new Intl.NumberFormat(locale, intl).format(v as number);
        if (display) {
            return display(intlValue);
        }
        return intlValue;
    });

    let value = $derived(format(rawValue));
</script>

{value}
