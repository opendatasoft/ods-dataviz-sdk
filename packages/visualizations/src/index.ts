import Test from './components/Test';
import BarChart from './components/BarChart';

function log(message: string) {
    console.log(message, typeof(Test));
}

log('Hello');

export default {
    Test,
    BarChart,
}