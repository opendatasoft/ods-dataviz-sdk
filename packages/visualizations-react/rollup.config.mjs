import { fileURLToPath } from 'url';
import path from 'path';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
// import visualizer from 'rollup-plugin-visualizer';
import alias from '@rollup/plugin-alias';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { babel } from '@rollup/plugin-babel';
import { defineConfig } from 'rollup';
import pkg from './package.json' with { type: 'json' };

const production = !process.env.ROLLUP_WATCH;
const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);
const projectRootDir = path.resolve(__dirname);

function basePlugins() {
    return [
        alias({
            entries: {
                src: path.resolve(projectRootDir, 'src'),
                reactify: path.resolve(projectRootDir, 'src/reactify'),
                stories: path.resolve(projectRootDir, 'stories'),
            },
        }),
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
        if (warning.ids.includes('node_modules/luxon')) {
            return;
        }
    }
    warn(warning);
}

const esm = defineConfig({
    input: 'src/index.ts',
    // Externalize all dependencies
    external: (id) => {
        // Both peer and regular dependencies can be imported from our files, but we don't want to package them
        return (
            Object.keys(pkg.dependencies).includes(id) ||
            Object.keys(pkg.peerDependencies).includes(id)
        );
    },
    output: {
        dir: 'dist',
        entryFileNames: '[name].es.js',
        format: 'es',
        sourcemap: true,
    },
    plugins: [
        ...basePlugins(),
        // Visualize the generated bundle
        // production &&
        //     visualizer({
        //         filename: `gen/stats-es.html`,
        //         sourcemap: true,
        //     }),
    ],
    onwarn,
});

const cjs = defineConfig({
    input: 'src/index.ts',
    // Externalize all dependencies
    external: (id) => {
        // Both peer and regular dependencies can be imported from our files, but we don't want to package them
        return (
            Object.keys(pkg.dependencies).includes(id) ||
            Object.keys(pkg.peerDependencies).includes(id)
        );
    },
    output: {
        dir: 'dist',
        entryFileNames: '[name].cjs.js',
        format: 'cjs',
        sourcemap: true,
    },
    plugins: [
        ...basePlugins(),
        // Visualize the generated bundle
        // production &&
        //     visualizer({
        //         filename: `gen/stats-cjs.html`,
        //         sourcemap: true,
        //     }),
    ],
    onwarn,
});

// Just compile the ESM version during development
const bundles = production ? [esm, cjs] : [esm];

export default bundles;
