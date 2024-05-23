<script lang="ts">
    /* I don't know why Component type doesn't work. It works with TS when compiled, or with
    npm run watch, but doesn't pass linting… */
    // import type { ComponentType } from 'svelte';
    import type DoubleLeft from './DoubleLeft.svelte';
    import type SingleLeft from './SingleLeft.svelte';
    import type DoubleRight from './DoubleRight.svelte';
    import type SingleRight from './SingleRight.svelte';

    export let icon:
        | typeof DoubleLeft
        | typeof SingleLeft
        | typeof DoubleRight
        | typeof SingleRight;
    export let disabled = false;
    export let label: string | undefined;
</script>

<button on:click {disabled} aria-label={label} class={$$props.class}>
    <svelte:component this={icon} />
</button>

<style lang="scss">
    button {
        height: 28px;
        width: 28px;
        padding: var(--spacing-50);
        background: none;
        border: none;
        cursor: pointer;
    }

    button:disabled {
        cursor: not-allowed;
    }

    :global(.ods-dataviz--default) {
        button {
            color: '#000';
        }

        button:disabled {
            color: '#DEE5EF';
        }
    }
</style>
