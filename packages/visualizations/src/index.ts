import Test from './Test.svelte';

function log(message: string) {
    console.log(message, typeof(Test));
}

log('Hello');