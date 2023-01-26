<script lang="ts">
    import { exactMatch, one } from '@opendatasoft/api-client';
    import { createEventDispatcher } from 'svelte';
    import type { DispatchedFilterEvent, SelectOptions } from '../../types';

    export let placeholder: SelectOptions['placeholder'] = null;
    export let fieldName: SelectOptions['fieldName'];
    export let availableValues: SelectOptions['availableValues'];

    const dispatch = createEventDispatcher<DispatchedFilterEvent>();

    let selected: string[] = [];

    function applyFilter(newValue: string[]) {
        dispatch('filter', {
            value: one(...newValue.filter(Boolean).map((v) => exactMatch(fieldName, v))),
        });
    }

    $: applyFilter(selected);
</script>

<select multiple bind:value={selected}>
    <option value>{placeholder || 'Select a value'}</option>
    {#each availableValues as availableValue}
        <option value={availableValue}>{availableValue}</option>
    {/each}
</select>

<style>
    select {
        background-color: var(--filter-select-background-color, #ffffff);
        font-size: var(--filter-select-font-size, 14px);
        color: var(--filter-select-text-color, #565656);

        /* CSS hack to style the select */
        border-radius: var(--filter-select-border-radius, 30px);
        border-color: transparent;
        border-right: var(--filter-select-padding, 13px) solid transparent;
        box-shadow: var(--filter-select-border-color, #d0d0d0) 0px 0px 0px 1px;
        padding: var(--filter-select-padding, 13px);
        padding-right: 0px;
    }
</style>
