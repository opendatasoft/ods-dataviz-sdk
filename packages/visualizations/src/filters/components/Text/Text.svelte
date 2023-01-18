<script lang="ts">
    /*
    This is a minimal implementation of a filter, based on a standard HTML component.
    It mostly exists for demo and documentation purposes, and may be removed at a later time.
    */
    import { textSearch } from '@opendatasoft/api-client';
    import { createEventDispatcher } from 'svelte';
    import type { DispatchedFilterEvent } from '../../types';

    const dispatch = createEventDispatcher<DispatchedFilterEvent>();

    function applyFilter(newValue: string) {
        dispatch('filter', {
            value: newValue ? textSearch(newValue) : null,
        });
    }
</script>

<div>
    <input type="text" on:input={(e) => applyFilter(e.currentTarget.value)} />
</div>

<style>
</style>
