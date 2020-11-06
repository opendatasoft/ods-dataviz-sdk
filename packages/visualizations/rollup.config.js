import typescript from '@rollup/plugin-typescript';
import svelte from 'rollup-plugin-svelte';
import autoPreprocess from 'svelte-preprocess';

export default {
    input: 'src/index.ts',
    output: {
        dir: 'dist',
        format: 'es',
        sourcemap: true,
    },
    plugins: [
        svelte({
            preprocess: autoPreprocess()
        }),
        typescript({sourceMap: true}),
    ],
};