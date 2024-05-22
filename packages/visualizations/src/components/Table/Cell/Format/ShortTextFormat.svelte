<script lang="ts">
    import { warn } from './utils';

    export let rawValue: unknown;
    export let display = (v: string) => v;

    function format(v: unknown) {
        if (typeof v !== 'string') {
            warn(v, 'text');
        }
        return display(v as string);
    }

    $: value = format(rawValue);
</script>

{value}
