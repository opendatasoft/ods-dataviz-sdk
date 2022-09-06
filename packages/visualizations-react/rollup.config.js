import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import visualizer from 'rollup-plugin-visualizer';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { babel } from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import { defineConfig } from 'rollup';
import pkg from './package.json';

const production = !process.env.ROLLUP_WATCH;

function basePlugins() {
    return [
        typescript({
            sourceMap: true,
            declaration: true,
            declarationDir: 'dist',
            rootDirs: ['src', 'test', 'stories'],
        }),
        nodeResolve(),
        commonjs(),
        json(),
        postcss({
            extract: 'index.css',
            plugins: [autoprefixer()],
        }),
        // Transpile to ES5 when running a production build
        production &&
            babel({
                babelHelpers: 'bundled',
                extensions: ['.ts', '.mjs', '.js', '.tsx', 'jsx'],
                include: ['src/**'],
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

const esm = defineConfig({
    input: 'src/index.tsx',
    // Externalize all dependencies
    external: (id) => Object.keys(pkg.dependencies).includes(id),
    output: {
        dir: 'dist',
        entryFileNames: '[name].es.js',
        format: 'es',
        sourcemap: true,
    },
    plugins: [
        ...basePlugins(),
        // Visualize the generated bundle
        production &&
            visualizer({
                filename: `gen/stats-es.html`,
                sourcemap: true,
            }),
    ],
    onwarn,
});

const umd = defineConfig({
    input: 'src/index.tsx',
    output: {
        dir: 'dist',
        entryFileNames: '[name].umd.js',
        format: 'umd',
        sourcemap: true,
        name: 'opendatasoft.visualizations',
        plugins: [],
    },
    plugins: [
        ...basePlugins(),
        // Minify umd bundle
        terser(),
        // Replace process.env.NODE_ENV with 'production'
        production &&
            replace({
                values: { 'process.env.NODE_ENV': JSON.stringify('production') },
                preventAssignment: true,
            }),
        // Visualize the generated bundle
        production &&
            visualizer({
                filename: 'gen/stats-umd.html',
                sourcemap: true,
            }),
    ],
    onwarn,
});

// Just compile the ESM version during development
const bundles = production ? [esm, umd] : [esm];

export default bundles;
