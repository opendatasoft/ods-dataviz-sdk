import Test from './components/Test';
import BarChart from './components/BarChart';
import Text from './components/Text';
import DataProvider from './dataprovider';

function log(message: string) {
    console.log(message, typeof(Test));
}

export default {
    DataProvider,
    Test,
    BarChart,
    Text,
}
