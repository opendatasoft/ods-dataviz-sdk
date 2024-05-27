<script lang="ts">
    import { locale } from '../../store';
    import { warn } from './utils';

    export let rawValue: unknown;
    export let display = (v: string) => v;
    export let intl: Intl.NumberFormatOptions;

    $: format = (v: unknown) => {
        if (!Number.isFinite(v)) {
            warn(v, 'number');
            return v;
        }
        const intlValue = new Intl.NumberFormat($locale, intl).format(v as number);
        return display(intlValue);
    };

    $: value = format(rawValue);
</script>

{value}
