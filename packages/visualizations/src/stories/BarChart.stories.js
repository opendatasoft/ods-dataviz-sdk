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
    yAxis: "SUM(nb_habitants)",
    colorConfiguration: {
        type: 'roundrobin',
        colors: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 205, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(201, 203, 207, 0.6)'
        ]
    }
}


Villes.storyName = 'Villes';