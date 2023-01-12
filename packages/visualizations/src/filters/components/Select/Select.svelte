<script lang="ts">
    /*
    This is a minimal implementation of a filter, based on a standard HTML component.
    It mostly exists for demo and documentation purposes, and may be removed at a later time.
    */
    import { exactMatch } from '@opendatasoft/api-client';
    import { createEventDispatcher } from 'svelte';
    import type { DispatchedFilterEvent, SelectOptions } from '../../types';

    export let options: SelectOptions;

    const dispatch = createEventDispatcher<DispatchedFilterEvent>();

    $: ({ fieldName, availableValues } = options);

    function applyFilter(newValue: string) {
        dispatch('filter', {
            value: newValue ? exactMatch(fieldName, newValue) : null,
        });
    }
</script>

<div class="filter-select">
    <select on:change={(e) => applyFilter(e.currentTarget.value)}>
        <option value>Select a value</option>
        {#each availableValues as availableValue}
            <option value={availableValue}>{availableValue}</option>
        {/each}
    </select>
</div>

<style>
    .filter-select select {
        background-color: var(--filter-select-background-color, #FFFFFF);
        font-size: var(--filter-select-font-size, 14px);
        color: var(--filter-select-text-color, #565656);

        /* CSS hack to style the select */
        border-radius: var(--filter-select-border-radius, 30px);
        border-color: transparent;
        border-right: var(--filter-select-padding, 13px) solid transparent;
        box-shadow: var(--filter-select-border-color, #D0D0D0) 0px 0px 0px 1px;
        padding: var(--filter-select-padding, 13px);
        padding-right: 0px;
    }
</style>
