<script lang="ts">
    import { warn } from './utils';

    export let rawValue: unknown;
    export let display = (v: boolean) => v.toString();

    function format(v: unknown) {
        if (typeof v !== 'boolean') {
            warn(v, 'boolean');
        }
        // Currently we return the raw value until we have alternative renders
        return display(v as boolean);
    }

    $: value = format(rawValue);
</script>

{value}
