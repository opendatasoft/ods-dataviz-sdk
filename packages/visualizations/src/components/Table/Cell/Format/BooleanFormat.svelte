<script lang="ts">
    import { warn } from './utils';

    export let rawValue: unknown;

    function getDisplayValue(v: unknown) {
        if (typeof v !== 'boolean') {
            warn(v, 'boolean');
        }
        // Currently we return the raw value until we have alternative renders
        return v;
    }

    $: value = getDisplayValue(rawValue);
</script>

{value}
