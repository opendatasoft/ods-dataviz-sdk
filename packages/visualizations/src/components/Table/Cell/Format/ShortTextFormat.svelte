<script lang="ts">
    import { warn } from './utils';

    export let rawValue: unknown;
    // svelte-ignore unused-export-let
    export let options = {};

    function getDisplayValue(v: unknown) {
        if (typeof v !== 'string') {
            warn(v, 'text');
        }
        return v;
    }

    $: value = getDisplayValue(rawValue);
</script>

{value}
