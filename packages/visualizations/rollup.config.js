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

function plugins(outDir) {
    return [
        svelte({
            // enable run-time checks when not in production
            dev: !production,
            include: 'src/**/*.svelte',
            preprocess: autoPreprocess({
                scss: {
                    includePaths: ['src'],
                },
                postcss: {
                    plugins: [autoprefixer],
                },
            }),
        }),
        typescript({
            sourceMap: true,
            declaration: true,
            declarationDir: outDir,
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
    ];
}

function onwarn(warning, warn) {
    // https://github.com/moment/luxon/issues/193
    if (warning.code === 'CIRCULAR_DEPENDENCY') {
        if (warning.importer.includes('node_modules/luxon')) {
            return;
        }
    }
    warn(warning);
}

const esm = {
    input: 'src/index.ts',
    // Externalize all dependencies
    external: (id) => !/^[./]/.test(id),
    output: {
        dir: 'dist/esm',
        format: 'es',
        sourcemap: true,
        plugins: [
            // Visualize size when  running a production build
            production &&
                visualizer({
                    filename: 'gen/stats-es.html',
                    sourcemap: true,
                }),
        ],
    },
    plugins: plugins('dist/esm'),
    onwarn,
};

const umd = {
    input: 'src/index.ts',
    output: {
        dir: 'dist/umd',
        format: 'umd',
        sourcemap: true,
        name: 'opendatasoft.visualizations',
        plugins: [
            visualizer({
                filename: 'gen/stats-umd.html',
                sourcemap: true,
            }),
            terser(),
        ],
    },
    plugins: plugins('dist/umd'),
    onwarn,
};

// Just compile the ESM version during development
const bundles = production ? [esm, umd] : [esm];

export default bundles;
