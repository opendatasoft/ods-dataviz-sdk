<script lang="ts">
    import type { ImageCategoryItem } from 'components/Legend/types';

    export let item: ImageCategoryItem;
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<img src={item.src} />

<style>
    img {
        width: 16px;
        object-fit: contain;
    }
</style>
