<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
<script lang="ts">
    const angleQuotationMark = {
        singleLeft: '&lsaquo;',
        singleRight: '&rsaquo;',
        doubleLeft: '&laquo;',
        doubleRight: '&raquo;',
    };
    export let pointingAngle: keyof typeof angleQuotationMark;
    export let disabled = false;
    export let label: string | undefined;
</script>

<button on:click {disabled} aria-label={label} class={$$props.class}>
    {@html angleQuotationMark[pointingAngle]}
</button>

<style lang="scss">
    button {
        height: 28px;
        width: 28px;
        background: none;
        border: none;
        cursor: pointer;
        font-size: 18px;
        display: flex;
        justify-content: center;
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
