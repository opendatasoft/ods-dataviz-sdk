<script lang="ts">
    import Select, {SelectProps} from 'svelte-select';
    import { exactMatch, one } from '@opendatasoft/api-client';
    import { createEventDispatcher } from 'svelte';
    import setDefaultValue from './utils';
    import type { DispatchedFilterEvent, SelectOptions, ValueType } from '../../types';

    export let options: SelectOptions;

    let fieldName: string;

    $: ({ fieldName, defaultValue } = options);

    const selectOptions: SelectProps  = {};

    $: {
        selectOptions.items = options?.availableValues;
        selectOptions.multiple = setDefaultValue(options?.isMulti, false);
        selectOptions.searchable = setDefaultValue(options?.isSearchable, false);
        selectOptions.placeholder = setDefaultValue(options?.placeholder, null);
        selectOptions.listOpen = setDefaultValue(options?.isMenuOpen, null);
    }

    const dispatch = createEventDispatcher<DispatchedFilterEvent>();

    let selected: ValueType = defaultValue;

    function applyFilter(newValue: ValueType): void {
        if (Array.isArray(newValue))
            dispatch('filter', {
                value: one(
                    ...newValue.map((v) => exactMatch(fieldName, v?.value))
                ),
            });
        else {
            dispatch('filter', {
                value: newValue?.value ? exactMatch(fieldName, newValue?.value) : null,
            });
        };
    };

    $: applyFilter(selected);
</script>

<Select class="filter-select" bind:value={selected} {...selectOptions} />

<style>
    :global(.filter-select) {
        --background: var(--filter-select-background-color, #ffffff) !important;
        --border-radius: var(--filter-select-border-radius, 30px) !important;
        box-shadow: var(--filter-select-border-color, #d0d0d0) 0px 0px 0px 1px !important;
    }
</style>
