<script lang="ts">
    import sdk from '@opendatasoft/api-client';

    const world = 'world';

    const upperWorld = (world:string): string => {
        return world.toUpperCase();
    }
</script>

<div>
    Hello {upperWorld(world)}! sdk? {sdk()}
</div>