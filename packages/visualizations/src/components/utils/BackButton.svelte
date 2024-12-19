<script>
    import { createBubbler } from 'svelte/legacy';

    const bubble = createBubbler();
</script>

<button class="back-button" type="button" onclick={bubble('click')}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
        ><path fill="none" d="M0 0h24v24H0z" /><path
            d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"
        /></svg
    >
</button>

<style>
    button {
        cursor: pointer;
        position: absolute;
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
