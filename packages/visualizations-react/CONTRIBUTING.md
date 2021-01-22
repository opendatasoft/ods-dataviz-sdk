# Contributing Guide for `@opendatasoft/visualizations-react`

> Please note we have a [Code of Conduct](../../CODE_OF_CONDUCT.md), please follow it in all your interactions with the project.

Contributions are welcome and are greatly appreciated! Every little bit helps, and credit will always be given.

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

- Specific to this package:
  - [Build](#build)
    - [Storybook](#storybook)
  - [Configuration](#configuration)
  - [Jest](#jest)
  - [Bundle Analysis](#bundle-analysis)
  - [Optimizations](#optimizations)
  - [Module Formats](#module-formats)
  - [Named Exports](#named-exports)
  - [Resources](#resources)
- General rules of contribution:
  - [Reporting a bug](../../CONTRIBUTING.md#reporting-a-bug)
  - [Commit messages](../../CONTRIBUTING.md#commit-messages)
  - [Versioning](../../CONTRIBUTING.md#versioning)
  - [Pull Requests](../../CONTRIBUTING.md#pull-requests)

## Build

This project uses [Rollup](https://rollupjs.org) as a bundler through [TSDX](https://tsdx.io/api-reference).

To watch this package:

```bash
npm run watch # or yarn run watch
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

To do a one-off build, use `npm run build` or `yarn build`.

Then run either Storybook or the example playground:

### Storybook

Run inside another terminal:

```bash
npm run storybook
```

This loads the stories from `./stories`.

## Configuration

Code quality is set up for you with `prettier`, `husky`, and `lint-staged`.

## Jest

Jest tests are set up to run with `npm test` or `yarn test`.

You can also have test coverage with `npm run test:coverage`. And rerun test as you work with `npm run test:watch`.

## Bundle Analysis

[`size-limit`](https://github.com/ai/size-limit) with `npm run size` and visualize the bundle with `npm run analyze`.

## Optimizations

Please see the main `tsdx` [optimizations docs](https://github.com/palmerhq/tsdx#optimizations). In particular, know that you can take advantage of development-only optimizations:

```js
// ./types/index.d.ts
declare var __DEV__: boolean;

// inside your code...
if (__DEV__) {
  console.log('foo');
}
```

## Module Formats

CJS, ESModules, and UMD module formats are supported.

The appropriate paths are configured in `package.json` and `dist/index.js` accordingly. Please report if any issues are found.

## Named Exports

Per Palmer Group guidelines, [always use named exports.](https://github.com/palmerhq/typescript#exports).

## Resources

- [TypeScript cheatsheet](https://devhints.io/typescript)
- [React tutorial](https://fr.reactjs.org/tutorial/tutorial.html)
