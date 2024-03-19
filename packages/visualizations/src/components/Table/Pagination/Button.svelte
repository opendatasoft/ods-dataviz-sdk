<script lang="ts">
    import type { ComponentType, SvelteComponentTyped } from "svelte";

    export let icon: ComponentType<SvelteComponentTyped<{color?: string;}>>;
    export let disabled = false;
    $: color = disabled ? '#C6CBDE' : "#142E7B";
</script>

<button on:click disabled={disabled}>
    <svelte:component this={icon} color={color}/>
</button>

<style>
    button {
        height: 28px;
        width: 28px;
        padding: 6px;
        background: none;
        border: none;
    }

    button:disabled {
        cursor: not-allowed;
    }
</style>