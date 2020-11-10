import TestImpl from './Test.svelte';

class Test {
    constructor(container, properties) {
        new TestImpl({
            target: container,
            props: {}
        });
    }

    updateProperties(properties) {}
}

export default Test;