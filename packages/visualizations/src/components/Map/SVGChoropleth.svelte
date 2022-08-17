<script>
    import geojson2svg from 'geojson-to-svg';

    export let data;
    export let options;

    let shapes = {};
    let svg;

    $: ({ shapes } = options);
    $: svg = geojson2svg().data(shapes?.geoJson).render();
    $: console.log(shapes);
</script>

<div>Hello !</div>
{@html svg}

<style>
</style>
