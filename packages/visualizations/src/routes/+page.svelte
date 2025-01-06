<script lang="ts">
    import Kpi from '$lib/KpiCard/KpiCard.svelte'
	import MarkdownText from '$lib/MarkdownText/MarkdownText.svelte';
</script>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<a href="/table">table</a>
<a href="/choropleth">choropleth</a>
<a href="/chart">chart</a>

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

<MarkdownText 
    data={{ 
        loading: false,
        value:
            '' +
            '## Title\n\n' +
            'This list should appear tight:\n\n' +
            '- Item 1\n' +
            '- Item 2\n\n' +
            '- Item 3\n\n\n\n' +
            '- Item 4\n' +
            '- Item 5'
        }}
/>

