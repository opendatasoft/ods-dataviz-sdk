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

<select bind:value on:input={(e) => onChange(toNumber(e.currentTarget.value))}>
    {#each options as option}
        <option label={option.label} value={option.value} />
    {/each}
</select>

<!-- disabling max-len doesn't work in style block, so we turn it off here -->
<!-- eslint-disable max-len -->
<style lang=scss>
    @import 'variables';
    :global(.ods-viz--default-style) select {
        padding: $spacing-50;
        border: solid 1px $border-color;
        border-radius: $border-radius-6;
        width: fit-content;
        /* remove all styles and re-add arrow to fix Safari appearance */
        background: url('data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0Ljk1IDEwIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmZjt9LmNscy0ye2ZpbGw6IzQ0NDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPmFycm93czwvdGl0bGU+PHJlY3QgY2xhc3M9ImNscy0xIiB3aWR0aD0iNC45NSIgaGVpZ2h0PSIxMCIgb3BhY2l0eT0iMCIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIxLjQxIDQuNjcgMi40OCAzLjE4IDMuNTQgNC42NyAxLjQxIDQuNjciLz48cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMy41NCA1LjMzIDIuNDggNi44MiAxLjQxIDUuMzMgMy41NCA1LjMzIi8+PC9zdmc+')
            no-repeat 95% 50%;
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
        padding-inline-end: $spacing-75;
    }

    :global(html[dir='rtl'] .ods-viz--default-style) select {
        background-position: 5%;
    }
</style>
