<script lang="ts">
    import { toNumber } from 'lodash';
    import type { PageSizeOption } from './types';

    export let options: PageSizeOption[];
    export let onChange: (size: number) => void;
    export let selected: number;

    let value: number;

    /* This ensure a "controlled" behavior
    e.g. if the onChange fails it will take the value of selected, not the one the user clicked.
    I tried $: value = selected and bind:value={selected}, but they don't override user selection
    */
    $: if (value !== selected) {
        value = selected;
    }
</script>

<select bind:value on:change={(e) => onChange(toNumber(e.currentTarget.value))}>
    {#each options as option}
        <option label={option.label} value={option.value} />
    {/each}
</select>

<style>
    :global(.ods-dataviz--default) select {
        background-color: white;
        padding: var(--spacing-50);
        border: solid 1px var(--border-color);
        border-radius: var(--border-radius-2);
        width: fit-content;
    }
</style>
