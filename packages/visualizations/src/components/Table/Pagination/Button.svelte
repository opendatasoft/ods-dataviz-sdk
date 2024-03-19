<script lang="ts">
    import type { ComponentType, SvelteComponentTyped } from "svelte";

    export let icon: ComponentType<SvelteComponentTyped<{color?: string;}>>;
    export let disabled = false;
</script>

<button on:click disabled={disabled}>
    <svelte:component this={icon}/>
</button>

<style lang="scss">
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

    :global(.ods-dataviz-sdk-table--default) {
        button {
            color: "#142E7B";
        }

        button:disabled {
            color: '#C6CBDE';
        }
    }
</style>