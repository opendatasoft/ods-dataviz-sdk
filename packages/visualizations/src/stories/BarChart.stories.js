import BarChart from '../components/BarChart/BarChart.svelte';
import DataProvider from '../dataprovider';

export default {
    title: 'components/BarChart',
    component: BarChart,
}

const Template = (args) => ({
    Component: BarChart,
    props: args,
});


const dataProvider = new DataProvider('http://builder.ods.localhost:8000', 'villes');
// FIXME: Why doesn't it take the properties directly?
dataProvider.domainId = 'http://builder.ods.localhost:8000';
dataProvider.datasetId = 'villes';
export const Villes = Template.bind({});
console.log('dataProvider', dataProvider)
Villes.args = {
    dataProvider: dataProvider,
    parameters: {
        "xAxis": "departement",
        "yAxis": "SUM(nb_habitants)"
    }
}


Villes.storyName = 'Villes';