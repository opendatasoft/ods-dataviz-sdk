<script lang="ts">
    import Kpi from '$lib/KpiCard/KpiCard.svelte'
</script>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<Kpi
    data={{ loading: false, value: 120}}
    options={{
        header: 'Header',
        title: 'KPI Card',
        description: 'This is a description',
        prefix: '$',
        footer: 'Footer',
        source: {
            href: 'https://data.opendatasoft.com/explore/dataset/arbresremarquablesparis2011%40public/table/',
        }}
    }
/>