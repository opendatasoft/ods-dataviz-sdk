<script lang="ts">
    // export let filterStore: FilterStore;
    export let options: any;
    export let data = null;
    // onMount(() => {
    //     componentFilterStore = filterStore.register();
    //     console.log('onmount', componentFilterStore);
    // });

    let value: string;
    $: ({ applyFilter } = options);

    // function applyFilter(newValue: string) {
    //     console.log('Filter', newValue);
    //     componentFilterStore.setCurrentFilter({
    //         type: 'text',
    //         value: newValue,
    //     });
    // }

    $: applyFilter(value);
</script>

<div>
    <input type="text" bind:value />
</div>

<style>
</style>
