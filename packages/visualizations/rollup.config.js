import svelte from 'rollup-plugin-svelte';
import autoPreprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';
import visualizer from 'rollup-plugin-visualizer';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { babel } from '@rollup/plugin-babel';

const production = !process.env.ROLLUP_WATCH;

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
        format: 'umd',
        name: 'opendatasoft.visualizations',
        sourcemap: true,
    },
    plugins: [
        svelte({
            // enable run-time checks when not in production
            dev: !production,
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
        commonjs(),
        json(),
        // Transpile to ES5 when running a production build
        production &&
            babel({
                babelHelpers: 'bundled',
                extensions: ['.ts', '.mjs', '.js', '.svelte'],
                include: ['src/**', 'node_modules/chart.js/**', 'node_modules/svelte/**'],
                presets: ['@babel/preset-env'],
            }),
        // Minify when running a production build
        production && terser(),
        // Visualize size when  running a production build
        production &&
            visualizer({
                filename: 'gen/stats.html',
                sourcemap: true,
            }),
    ],
    onwarn(warning, warn) {
        // https://github.com/moment/luxon/issues/193
        if (warning.code === 'CIRCULAR_DEPENDENCY') {
            if (warning.importer.includes('node_modules/luxon')) {
                return;
            }
        }
        warn(warning);
    },
};
