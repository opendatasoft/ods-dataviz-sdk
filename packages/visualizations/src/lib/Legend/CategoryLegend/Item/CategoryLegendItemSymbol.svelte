<script lang="ts">
    import type { CategoryItem } from '$lib/Legend/types';
    import { CATEGORY_ITEM_VARIANT } from '../../types';
    import BoxSymbol from '../Symbols/BoxSymbol.svelte';
    import LineSymbol from '../Symbols/LineSymbol.svelte';
    import CircleSymbol from '../Symbols/CircleSymbol.svelte';
    import ImageSymbol from '../Symbols/ImageSymbol.svelte';

    interface Props {
        item: CategoryItem;
    }

    let { item }: Props = $props();
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
