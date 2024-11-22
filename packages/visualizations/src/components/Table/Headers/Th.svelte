<script lang="ts">
    import { DataFormat } from "../types";
    import { stickyColumnsWidth, stickyCloumnsOffset } from "../store";

    export let index: number;
    export let sticky = false;
    export let dataFormat: DataFormat;
    export let isHorizontallyScrolled;
    let clientWidth: number;

    $: if (sticky && clientWidth) {
        $stickyColumnsWidth[index] = clientWidth;
    };

    $: console.log(index === $stickyCloumnsOffset.length -1);
</script>

<th 
    style={`--sticky-offset: ${$stickyCloumnsOffset[index]}px`}
    class={`table-header--${dataFormat}`}
    class:sticky
    class:isLastSticky={index === $stickyCloumnsOffset.length -1}
    class:isHorizontallyScrolled
    bind:clientWidth
>
    <slot/>
</th>

<style>
    :global(.ods-dataviz--default th) {
        text-align: left;
        padding: var(--spacing-75);
        background-color: white;
        border-bottom: 1px solid var(--border-color);
    }

    :global(.ods-dataviz--default th.table-header--number) {
        text-align: right;
    }

    .sticky {
        position: sticky;
        left: var(--sticky-offset);
        border-right: 1px solid var(--border-color);
        z-index: 10;
    }

    /* applies shadow only on the left to avoid eating borders */
    .isHorizontallyScrolled.isLastSticky::after {
        content: "";
        position: absolute;
        top: 0;
        right: -6px;
        height: 100%;
        width: 6px;
        background: linear-gradient(90deg, rgba(0,0,0,0.13), transparent);
    }
</style>