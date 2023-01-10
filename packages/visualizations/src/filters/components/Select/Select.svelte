<script lang="ts">
    /*
    This is a minimal implementation of a filter, based on a standard HTML component.
    It mostly exists for demo and documentation purposes, and may be removed at a later time.
    */
    import { exactMatch } from '@opendatasoft/api-client';
    import { createEventDispatcher } from 'svelte';
    import type { DispatchedFilterEvent } from '../../types';

    export let options: any;

    const dispatch = createEventDispatcher<DispatchedFilterEvent>();

    $: ({ fieldName, availableValues } = options);

    function applyFilter(newValue: string) {
        dispatch('filter', {
            value: newValue ? exactMatch(fieldName, newValue) : null,
        });
    }
</script>

<div>
    <select on:change={(e) => applyFilter(e.currentTarget.value)}>
        <option value={null}>Select a value</option>
        {#each availableValues as availableValue}
            <option value={availableValue}>{availableValue}</option>
        {/each}
    </select>
</div>

<style>
</style>
