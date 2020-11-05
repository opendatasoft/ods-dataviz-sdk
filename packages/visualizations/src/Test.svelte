<script lang="ts">
    const world = 'world';

    const upperWorld = (world:string): string => {
        return world.toUpperCase();
    }
</script>

<div>
    Hello {upperWorld(world)}
</div>