<script lang="ts">
    export let title: string | undefined;
    export let subtitle: string | undefined;
</script>

{#if title || subtitle}
    <div>
        {#if title}
            <h3>{title}</h3>
        {/if}
        {#if subtitle}
            <p>{subtitle}</p>
        {/if}
    </div>
{/if}

<style lang="scss">
    @import 'variables';
    h3,
    p {
        margin: 0;
    }

    div {
        margin-bottom: $spacing-100;
    }
</style>
