# Contributing Guide for `@opendatasoft/api-client`

Contributions are welcome and are greatly appreciated! Every little bit helps, and credit will always be given.

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [Code of Conduct](../../CODE_OF_CONDUCT.md), please follow it in all your interactions with the project.

## Workflow

> If you’re new to TypeScript, checkout [this handy cheatsheet](https://devhints.io/typescript)

```bash
npm run watch # or yarn run watch
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

To do a one-off build, use `npm run build` or `yarn build`.

To run tests, use `npm test` or `yarn test`.

Code quality is set up with `prettier`, `husky`, and `lint-staged`.

### Jest

Jest tests are set up to run with `npm test` or `yarn test`.

You can also have test coverage with `npm run test:coverage`. And rerun test as you work with `npm run test:watch`.

### Bundling

This project uses [Rollup](https://rollupjs.org) as a bundler through [TSDX](https://tsdx.io/api-reference).

### Bundle Analysis

[`size-limit`](https://github.com/ai/size-limit) with `npm run size` and visualize the bundle with `npm run analyze`.

### Optimizations

Please see the main `tsdx` [optimizations docs](https://github.com/palmerhq/tsdx#optimizations). In particular, know that you can take advantage of development-only optimizations:

```js
// ./types/index.d.ts
declare var __DEV__: boolean;

// inside your code...
if (__DEV__) {
  console.log('foo');
}
```

### Module Formats

CJS, ESModules, and UMD module formats are supported.

The appropriate paths are configured in `package.json` and `dist/index.js` accordingly. Please report if any issues are found.

### Named Exports

Per Palmer Group guidelines, [always use named exports.](https://github.com/palmerhq/typescript#exports).
