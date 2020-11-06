<script lang="ts">
    import sdk from 'ods-api-client';

    const world = 'world';

    const upperWorld = (world:string): string => {
        return world.toUpperCase();
    }
</script>

<div>
    Hello {upperWorld(world)}! sdk? {sdk()}
</div>