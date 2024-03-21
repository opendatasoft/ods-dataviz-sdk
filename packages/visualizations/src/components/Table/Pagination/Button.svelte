<script lang="ts">
    import type { ComponentType } from 'svelte';

    export let icon: ComponentType;
    export let disabled = false;
</script>

<button on:click {disabled}>
    <svelte:component this={icon} />
</button>

<style lang="scss">
    button {
        height: 28px;
        width: 28px;
        padding: var(--spacing-50);
        background: none;
        border: none;
    }

    button:disabled {
        cursor: not-allowed;
    }

    :global(.ods-dataviz--default) {
        button {
            color: '#142E7B';
        }

        button:disabled {
            color: '#C6CBDE';
        }
    }
</style>
