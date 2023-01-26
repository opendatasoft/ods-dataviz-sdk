<script lang="ts">
    /*
    This is a minimal implementation of a filter, based on a standard HTML component.
    It mostly exists for demo and documentation purposes, and may be removed at a later time.
    */
    import type { SelectOptions } from '../../types';
    import SingleSelect from './SingleSelect.svelte';
    import MultiSelect from './MultiSelect.svelte';

    export let options: SelectOptions;

    $: ({ multiple = false, ...rest } = options);
    $: component = multiple ? MultiSelect : SingleSelect;
</script>

<div class="filter-select">
    <svelte:component this={component} {...rest} on:filter />
</div>
