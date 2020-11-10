import TestImpl from './Test.svelte';

class Test {
    constructor(container, dataProvider, properties) {
        new TestImpl({
            target: container,
            props: {}
        });
    }

    updateProperties(properties) {}
}

export default Test;