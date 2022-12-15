<script lang="ts">
    import { onMount } from 'svelte';
    import type FilterStore from "../../filterStore";

    export let filterStore: FilterStore;
    export let options: {};

    let componentFilterStore: any;

    onMount(() => {
        componentFilterStore = filterStore.register();
        console.log('onmount', componentFilterStore);
    })

    let value: string;

    function applyFilter(newValue: string) {
        console.log('Filter', newValue);
        componentFilterStore.setCurrentFilter({
            type: 'text',
            value: newValue
        });
    }

    $: componentFilterStore && applyFilter(value);
</script>

<div>
    <input type="text" bind:value={value}>
</div>

<style>

</style>