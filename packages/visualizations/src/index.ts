import Test from './components/Test';
import BarChart from './components/BarChart';
import DataProvider from './dataprovider';

function log(message: string) {
    console.log(message, typeof(Test));
}

log('Hello');

export default {
    DataProvider,
    Test,
    BarChart,
}