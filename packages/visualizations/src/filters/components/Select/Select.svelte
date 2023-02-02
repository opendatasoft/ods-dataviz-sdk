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
        selectOptions.items = options?.availableValues.map(value => ({value, label: value, checked: false}));
        selectOptions.multiple = setDefaultValue(options?.isMulti, false);
        selectOptions.searchable = setDefaultValue(options?.isSearchable, false);
        selectOptions.placeholder = setDefaultValue(options?.placeholder, null);
        selectOptions.listOpen = setDefaultValue(options?.isMenuOpen, null);
    }

    const dispatch = createEventDispatcher<DispatchedFilterEvent>();

    let selected: ValueType = defaultValue;

    function handleChecked(e) {
        let itemIndex = selectOptions.items.findIndex((item) => item.value === e.value);
        selectOptions.items[itemIndex].checked = !selectOptions.items[itemIndex].checked;
    }

    $: computeValue(selectOptions.items);

    function computeValue(items) {
        selected = items.filter((item) => item.checked);
    }

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

<Select multiple showChevron filterSelectedItems={false} clearable={false} class="filter-select" bind:value={selected} {...selectOptions} >
    <div slot="selection" let:selection let:index>
        {#if index == 0 }
            {selection.label}
        {:else if index === 1 }     
            {`, ${selection.label}`}       
        {:else if index === 2 }
            ,<strong>{` +${selected?.length - 2}`}</strong> 
        {/if}
    </div>
    <div class="list" slot="list" let:filteredItems>
        header
        {#each filteredItems as item}
            <div>
                <label for={item.value} on:click|preventDefault|stopPropagation={() => handleChecked(item)}>
                    <input type="checkbox" id={item.value} checked={item.checked} />
                    {item.value}
                </label>
            </div>
        {/each}
        footer
    </div>
</Select>

<style>
    :global(.multi-item:not(:nth-child(-n + 3))) {
        display: none !important;
    }
    :global(.multi-item-clear) {
        display: none !important;
    }
    :global(.value-container) {
        gap: 0 !important;
    }
    :global(.filter-select) {
        --multi-item-bg: transparent;
        --multi-item-outline: none;
        --multi-item-padding: 0;
        --background: var(--filter-select-background-color, #ffffff) !important;
        --border-radius: var(--filter-select-border-radius, 30px) !important;
        box-shadow: var(--filter-select-border-color, #d0d0d0) 0px 0px 0px 1px !important;
    }
</style>
