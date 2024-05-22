<script lang="ts">
    import { locale } from '../../store';
    import { warn } from './utils';

    export let rawValue: unknown;
    export let display = (v: string) => v;
    export let intl: Intl.NumberFormatOptions;

    function format(v: unknown, loc: string) {
        if (!Number.isFinite(v)) {
            warn(v, 'number');
            return v;
        }
        const intlValue = new Intl.NumberFormat(loc, intl).format(v as number);
        return display(intlValue);
    }

    $: value = format(rawValue, $locale);
</script>

{value}
