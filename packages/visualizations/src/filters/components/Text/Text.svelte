<script lang="ts">
    /*
    This is a minimal implementation of a filter, based on a standard HTML component.
    It mostly exists for demo and documentation purposes, and may be removed at a later time.
    */
    import { textSearch } from '@opendatasoft/api-client';
    import { createEventDispatcher } from 'svelte';
    import type { DispatchedFilterEvent } from '../../types';

    export let options: any;

    const dispatch = createEventDispatcher<DispatchedFilterEvent>();

    let value = '';

    function applyFilter(newValue: string) {
        dispatch("filter", {
            value: newValue ? textSearch(newValue) : null
        });
    }

    $: applyFilter(value);
</script>

<div>
    <input type="text" bind:value={value}>
</div>

<style>

</style>