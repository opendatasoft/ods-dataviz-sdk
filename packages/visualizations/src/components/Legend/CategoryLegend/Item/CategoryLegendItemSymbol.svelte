<script lang="ts">
    import BoxSymbol from '../Symbols/BoxSymbol.svelte';
    import LineSymbol from '../Symbols/LineSymbol.svelte';
    import CircleSymbol from '../Symbols/CircleSymbol.svelte';
    import ImageSymbol from '../Symbols/ImageSymbol.svelte';
    import type { CategoryItem } from '../../types';
    import { CATEGORY_ITEM_VARIANT } from '../../types';

    export let item: CategoryItem;
</script>

{#if item.variant === CATEGORY_ITEM_VARIANT.Circle}
    <CircleSymbol {item} />
{:else if item.variant === CATEGORY_ITEM_VARIANT.Box}
    <BoxSymbol {item} />
{:else if item.variant === CATEGORY_ITEM_VARIANT.Line}
    <LineSymbol {item} />
{:else if item.variant === CATEGORY_ITEM_VARIANT.Image}
    <ImageSymbol {item} />
{/if}
