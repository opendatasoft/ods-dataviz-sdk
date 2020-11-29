<script lang="ts">
    import type { TextParameters } from './types'

    export let data: string = null;
    export let parameters: TextParameters = null;
</script>

<div class="ods-viz__text">
    {#if parameters.tag === "h1"}
        <h1>{data || ''}</h1>
    {:else if parameters.tag === "h2"}
        <h2>{data || ''}</h2>
    {:else if parameters.tag === "h3"}
        <h3>{data || ''}</h3>
    {:else if parameters.tag === "h4"}
        <h4>{data || ''}</h4>
    {:else if parameters.tag === "h5"}
        <h5>{data || ''}</h5>
    {:else}
        <p>{data || ''}</p>
    {/if}
</div>
