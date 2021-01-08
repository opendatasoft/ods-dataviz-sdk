import svelte from 'rollup-plugin-svelte';
import autoPreprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';

import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const preprocess = autoPreprocess({
    scss: {
        includePaths: ['src'],
    },
    postcss: {
        plugins: [autoprefixer],
    },
});

export default {
    input: 'src/index.ts',
    output: {
        dir: 'dist',
        format: 'es',
        sourcemap: true,
    },
    plugins: [
        svelte({
            include: 'src/**/*.svelte',
            preprocess,
        }),
        typescript({ 
            sourceMap: true,
            declaration: true,
            declarationDir: 'dist',
            rootDir: 'src',
        }),
        nodeResolve(),
    ],
};
