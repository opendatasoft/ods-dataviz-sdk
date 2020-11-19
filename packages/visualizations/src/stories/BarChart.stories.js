import BarChart from '../components/BarChart/BarChart.svelte';
import DataProvider from '../dataprovider';

export default {
    title: 'components/BarChart',
    component: BarChart,
}

const Template = (args) => ({
    Component: BarChart,
    props: {
        parameters: args,
        dataProvider: args.dataProvider
    }
});

const dataProvider = new DataProvider('http://builder.ods.localhost:8000', 'villes');

export const Villes = Template.bind({});

Villes.args = {
    dataProvider: dataProvider,
    xAxis: "departement",
    yAxis: "SUM(nb_habitants)"
}


Villes.storyName = 'Villes';